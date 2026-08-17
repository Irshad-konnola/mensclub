import { type SchemaTypeDefinition } from 'sanity'
import { collectionType } from './collectionType'
import { posterType } from './posterType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, posterType],
}
