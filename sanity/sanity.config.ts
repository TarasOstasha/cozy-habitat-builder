import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {appleMediaUploadPlugin, withMultiImageUpload} from './plugins/appleMediaUpload'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'SEMTA',
  basePath: '/studio',

  projectId: '43r4kll9',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), appleMediaUploadPlugin()],

  schema: {
    types: schemaTypes.map(withMultiImageUpload),
  },
})
