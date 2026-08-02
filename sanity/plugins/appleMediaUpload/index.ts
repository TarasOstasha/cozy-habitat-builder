import {definePlugin} from 'sanity'
import {createAppleMediaUploaderClass} from './createUploader'
export {MultiUploadImageArrayInput} from './MultiUploadImageArrayInput'
export {withMultiImageUpload} from './withMultiImageUpload'

const DEFAULT_IMAGE_SOURCE = 'sanity-default'

type AssetSourceContext = {
  getClient: (options: {apiVersion: string}) => import('@sanity/client').SanityClient
}

/** Converts HEIC photos and .MOV videos to JPEG before uploading to Sanity. */
export const appleMediaUploadPlugin = definePlugin({
  name: 'apple-media-upload',
  form: {
    image: {
      assetSources: (prev, context) => {
        const {getClient} = context as AssetSourceContext
        const client = getClient({apiVersion: '2025-02-19'})
        const Uploader = createAppleMediaUploaderClass({client})

        return prev.map((source) =>
          source.name === DEFAULT_IMAGE_SOURCE
            ? {
                ...source,
                Uploader: Uploader as unknown as NonNullable<(typeof source)['Uploader']>,
              }
            : source,
        )
      },
    },
  },
})
