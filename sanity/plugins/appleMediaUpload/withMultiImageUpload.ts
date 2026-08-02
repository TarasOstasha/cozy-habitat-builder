import type {SchemaTypeDefinition} from 'sanity'
import {MultiUploadImageArrayInput} from './MultiUploadImageArrayInput'

type SchemaField = {
  type: string
  of?: Array<{type?: string; name?: string; fields?: SchemaField[]}>
  fields?: SchemaField[]
  options?: Record<string, unknown>
  components?: {input?: unknown}
}

function isImageOnlyArrayDefinition(field: SchemaField) {
  const members = field.of ?? []
  return members.length > 0 && members.every((member) => member.type === 'image')
}

function augmentFields(fields: SchemaField[] | undefined): SchemaField[] | undefined {
  if (!fields) return fields

  return fields.map((field) => {
    if (field.type === 'array' && isImageOnlyArrayDefinition(field)) {
      const {fields: _ignored, ...arrayField} = field
      return {
        ...arrayField,
        options: {
          ...arrayField.options,
          layout: arrayField.options?.layout ?? 'grid',
        },
        components: {
          ...arrayField.components,
          input: MultiUploadImageArrayInput,
        },
      }
    }

    if (field.type === 'object' || field.type === 'document') {
      return {
        ...field,
        fields: augmentFields(field.fields),
      }
    }

    if (field.type === 'array') {
      return {
        ...field,
        of: field.of?.map((member) =>
          member.type === 'object'
            ? {
                ...member,
                fields: augmentFields(member.fields),
              }
            : member,
        ),
      }
    }

    return field
  })
}

/** Adds multi-select upload UI to every image-only array field in the schema. */
export function withMultiImageUpload<T extends SchemaTypeDefinition>(definition: T): T {
  if (definition.type !== 'document' && definition.type !== 'object') {
    return definition
  }

  const withFields = definition as T & {fields?: SchemaField[]}

  return {
    ...withFields,
    fields: augmentFields(withFields.fields),
  } as T
}
