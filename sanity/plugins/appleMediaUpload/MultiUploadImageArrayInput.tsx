import {UploadIcon} from '@sanity/icons/Upload'
import {Button, Grid} from '@sanity/ui'
import {useMemo, type ComponentProps} from 'react'
import {
  ArrayOfObjectsFunctions,
  ArrayOfObjectsInput,
  type ArrayOfObjectsInputProps,
  type AssetSource,
  type SchemaType,
  _isType,
  useFormBuilder,
} from 'sanity'
import {IMAGE_FIELD_ACCEPT} from '../../schemaTypes/objects/sectionFields'
import {openFilePicker} from './openFilePicker'

const DEFAULT_IMAGE_SOURCE = 'sanity-default'

function isImageMemberType(type: SchemaType) {
  return _isType(type, 'image')
}

function isImageOnlyArray(schemaType: ArrayOfObjectsInputProps['schemaType']) {
  return schemaType.of.length > 0 && schemaType.of.every(isImageMemberType)
}

function resolveImageAssetSource(assetSources: AssetSource[]) {
  const withUploader = assetSources.filter((source) => source.Uploader)
  return (
    withUploader.find((source) => source.name === DEFAULT_IMAGE_SOURCE) ?? withUploader[0]
  )
}

type UploadMultipleImagesButtonProps = {
  onSelectFile: ArrayOfObjectsInputProps['onSelectFile']
  readOnly?: boolean
  schemaType: ArrayOfObjectsInputProps['schemaType']
}

function UploadMultipleImagesButton({
  onSelectFile,
  readOnly,
  schemaType,
}: UploadMultipleImagesButtonProps) {
  const formBuilder = useFormBuilder()
  const imageMemberType = schemaType.of.find(isImageMemberType)
  const accept =
    (typeof imageMemberType?.options?.accept === 'string'
      ? imageMemberType.options.accept
      : undefined) ?? IMAGE_FIELD_ACCEPT

  const assetSource = useMemo(
    () => resolveImageAssetSource(formBuilder.__internal.image.assetSources),
    [formBuilder],
  )

  if (readOnly || !onSelectFile || !imageMemberType || !assetSource) {
    return null
  }

  return (
    <Button
      icon={UploadIcon}
      mode="ghost"
      text="Upload images"
      title="Select multiple files at once (Shift or Ctrl+click)"
      onClick={() => {
        openFilePicker({
          accept,
          multiple: true,
          onSelect: (files) => {
            for (const file of files) {
              onSelectFile({
                file,
                schemaType: imageMemberType,
                assetSource,
              })
            }
          },
        })
      }}
    />
  )
}

function createImageArrayFunctions(
  inputProps: Pick<ArrayOfObjectsInputProps, 'onSelectFile' | 'readOnly' | 'schemaType'>,
) {
  return function ImageArrayFunctions(
    props: ComponentProps<typeof ArrayOfObjectsFunctions>,
  ) {
    return (
      <Grid gap={1} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
        <UploadMultipleImagesButton
          onSelectFile={inputProps.onSelectFile}
          readOnly={inputProps.readOnly || props.readOnly}
          schemaType={inputProps.schemaType}
        />
        <ArrayOfObjectsFunctions {...props} />
      </Grid>
    )
  }
}

/** Array input with an extra "Upload images" button that opens a multi-select file picker. */
export function MultiUploadImageArrayInput(props: ArrayOfObjectsInputProps) {
  if (!isImageOnlyArray(props.schemaType)) {
    return <ArrayOfObjectsInput {...props} />
  }

  const arrayFunctions = useMemo(
    () =>
      createImageArrayFunctions({
        onSelectFile: props.onSelectFile,
        readOnly: props.readOnly,
        schemaType: props.schemaType,
      }),
    [props.onSelectFile, props.readOnly, props.schemaType],
  )

  return <ArrayOfObjectsInput {...props} arrayFunctions={arrayFunctions} />
}
