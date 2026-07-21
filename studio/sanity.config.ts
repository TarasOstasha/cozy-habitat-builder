import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'SEMTA',

  projectId: '43r4kll9',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
