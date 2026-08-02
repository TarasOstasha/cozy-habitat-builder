import type {SanityClient} from '@sanity/client'
import {from, switchMap, map, catchError, of, type Subscription} from 'rxjs'
import {set} from 'sanity'
import type {SchemaType} from 'sanity'
import {convertMediaFile} from './convertMediaFile'

const UPLOAD_STATUS_KEY = '_upload'

type UploadFileState = {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error' | 'aborted'
  error?: Error
}

type UploadEvent =
  | {type: 'progress'; file: UploadFileState; progress: number}
  | {type: 'status'; file: UploadFileState; status: UploadFileState['status']}
  | {type: 'error'; files: UploadFileState[]}
  | {type: 'all-complete'; files: UploadFileState[]}
  | {type: 'abort'; files: UploadFileState[]}

type UploadOptions = {
  schemaType?: SchemaType
  onChange?: (patches: ReturnType<typeof set>[]) => void
}

function getUploadMetadata(schemaType?: SchemaType) {
  const metadata = schemaType?.options?.metadata
  return Array.isArray(metadata) ? metadata : undefined
}

function progressPatches(percent: number) {
  const now = new Date().toISOString()
  return [
    set(percent, [UPLOAD_STATUS_KEY, 'progress']),
    set(now, [UPLOAD_STATUS_KEY, 'updatedAt']),
  ]
}

function completePatches(assetId: string) {
  const now = new Date().toISOString()
  return [
    set({_type: 'reference', _ref: assetId}, ['asset']),
    set(100, [UPLOAD_STATUS_KEY, 'progress']),
    set(now, [UPLOAD_STATUS_KEY, 'updatedAt']),
  ]
}

export function createAppleMediaUploaderClass({client}: {client: SanityClient}) {
  return class AppleMediaUploader {
    private files: UploadFileState[] = []
    private subscribers = new Set<(event: UploadEvent) => void>()
    private subscriptions = new Map<string, Subscription>()

    private emit(event: UploadEvent) {
      this.subscribers.forEach((subscriber) => subscriber(event))
    }

    private checkAllComplete() {
      if (
        this.files.length > 0 &&
        this.files.every((file) => ['complete', 'error', 'aborted'].includes(file.status))
      ) {
        this.emit({type: 'all-complete', files: this.files})
        this.reset()
      }
    }

    private updateFile(fileId: string, data: Partial<UploadFileState>) {
      const target = this.files.find((file) => file.id === fileId)
      if (!target) return

      if (data.error) target.error = data.error
      if (typeof data.progress === 'number' && data.progress !== target.progress) {
        target.progress = data.progress
        this.emit({type: 'progress', file: target, progress: target.progress * 100})
      }
      if (data.status && data.status !== target.status) {
        target.status = data.status
        this.emit({type: 'status', file: target, status: target.status})
      }

      this.checkAllComplete()
    }

    private teardown(fileId: string) {
      this.subscriptions.get(fileId)?.unsubscribe()
      this.subscriptions.delete(fileId)
    }

    private startUpload(file: File, fileState: UploadFileState, options: UploadOptions) {
      const {schemaType, onChange} = options
      if (!schemaType || !onChange) {
        throw new Error('Missing schema type or onChange for upload')
      }

      const subscription = from(convertMediaFile(file))
        .pipe(
          switchMap((converted) =>
            client.observable.assets.upload('image', converted, {
              tag: 'asset.upload',
              extract: getUploadMetadata(schemaType),
              preserveFilename: schemaType.options?.storeOriginalFilename,
              filename: converted.name,
            }),
          ),
          map((event) => {
            if (event.type === 'progress' && typeof event.percent === 'number') {
              const percent = 2 + (event.percent / 100) * 98
              onChange(progressPatches(percent))
              this.updateFile(fileState.id, {progress: percent / 100, status: 'uploading'})
              return null
            }

            if (event.type === 'response') {
              onChange(completePatches(event.body.document._id))
              this.updateFile(fileState.id, {progress: 1, status: 'complete'})
            }

            return null
          }),
          catchError((error: unknown) => {
            const err = error instanceof Error ? error : new Error('Upload failed')
            this.updateFile(fileState.id, {status: 'error', error: err})
            this.emit({
              type: 'error',
              files: this.files.filter((entry) => entry.status === 'error'),
            })
            throw err
          }),
        )
        .subscribe({
          complete: () => this.teardown(fileState.id),
          error: () => this.teardown(fileState.id),
        })

      this.subscriptions.set(fileState.id, subscription)
    }

    upload(files: File[], options?: UploadOptions) {
      if (!options?.schemaType || !options.onChange) {
        throw new Error('No schema type or onChange provided for file upload')
      }

      for (const file of files) {
        const fileState: UploadFileState = {
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: 'pending',
        }
        this.files.push(fileState)
        this.startUpload(file, fileState, options)
      }

      return this.files
    }

    abort(file?: UploadFileState) {
      const targets = file
        ? this.files.filter((entry) => entry.id === file.id)
        : this.files.filter((entry) => ['pending', 'uploading'].includes(entry.status))

      for (const target of targets) {
        this.teardown(target.id)
        this.updateFile(target.id, {status: 'aborted'})
      }

      this.emit({
        type: 'abort',
        files: this.files.filter((entry) => entry.status === 'aborted'),
      })
      this.checkAllComplete()
    }

    subscribe(subscriber: (event: UploadEvent) => void) {
      this.subscribers.add(subscriber)
      return () => {
        this.subscribers.delete(subscriber)
      }
    }

    getFiles() {
      return this.files
    }

    reset() {
      for (const subscription of this.subscriptions.values()) {
        subscription.unsubscribe()
      }
      this.subscriptions.clear()
      this.files = []
    }
  }
}
