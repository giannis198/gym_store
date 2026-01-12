import { type SchemaTypeDefinition } from 'sanity'
import { program } from './program'
import { coach } from './coach'
import { scheduleItem } from './scheduleItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [program, coach, scheduleItem],
}
