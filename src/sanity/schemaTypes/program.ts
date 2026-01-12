export const program = {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intensity',
      title: 'Intensity',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'Low' },
          { title: 'Medium', value: 'Medium' },
          { title: 'High', value: 'High' },
          { title: 'Elite', value: 'Elite' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
