import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'f9idxxox',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'MensClub Admin',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
})
