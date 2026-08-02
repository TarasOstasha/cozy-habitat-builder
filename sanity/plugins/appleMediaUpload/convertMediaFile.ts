const HEIC_PATTERN = /\.(heic|heif)$/i
const VIDEO_PATTERN = /\.(mov|mp4|m4v|qt)$/i

export function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase()
  return HEIC_PATTERN.test(file.name) || type.includes('heic') || type.includes('heif')
}

export function isVideoFile(file: File): boolean {
  const type = file.type.toLowerCase()
  return type.startsWith('video/') || VIDEO_PATTERN.test(file.name)
}

export function needsConversion(file: File): boolean {
  return isHeicFile(file) || isVideoFile(file)
}

function jpegFileName(originalName: string, fallback: string): string {
  const base = originalName.replace(HEIC_PATTERN, '').replace(VIDEO_PATTERN, '') || fallback
  return `${base}.jpg`
}

async function convertHeicToJpeg(file: File): Promise<File> {
  const heic2any = (await import('heic2any')).default
  const result = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.92,
  })
  const blob = Array.isArray(result) ? result[0] : result
  if (!(blob instanceof Blob)) {
    throw new Error(`Could not convert "${file.name}" from HEIC to JPEG`)
  }
  return new File([blob], jpegFileName(file.name, 'photo'), {type: 'image/jpeg'})
}

async function extractVideoPoster(file: File): Promise<File> {
  const url = URL.createObjectURL(file)
  try {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    video.src = url

    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve()
      video.onerror = () => reject(new Error(`Could not read video "${file.name}"`))
    })

    const seekTo = Number.isFinite(video.duration) && video.duration > 0
      ? Math.min(1, video.duration / 2)
      : 0
    video.currentTime = seekTo

    await new Promise<void>((resolve, reject) => {
      video.onseeked = () => resolve()
      video.onerror = () => reject(new Error(`Could not seek in video "${file.name}"`))
    })

    if (!video.videoWidth || !video.videoHeight) {
      throw new Error(`Video "${file.name}" has no readable frame`)
    }

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Could not prepare a canvas for video conversion')
    }
    context.drawImage(video, 0, 0)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => (result ? resolve(result) : reject(new Error('Failed to export video frame'))),
        'image/jpeg',
        0.92,
      )
    })

    return new File([blob], jpegFileName(file.name, 'video-frame'), {type: 'image/jpeg'})
  } finally {
    URL.revokeObjectURL(url)
  }
}

/** Normalize iPhone HEIC photos and .MOV videos into JPEG files Sanity can store. */
export async function convertMediaFile(file: File): Promise<File> {
  if (isHeicFile(file)) return convertHeicToJpeg(file)
  if (isVideoFile(file)) return extractVideoPoster(file)
  return file
}
