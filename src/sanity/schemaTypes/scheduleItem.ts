export const scheduleItem = {
  name: 'scheduleItem',
  title: 'Schedule Item',
  type: 'document',
  fields: [
    {
      name: 'className',
      title: 'Class Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'Monday' },
          { title: 'Tuesday', value: 'Tuesday' },
          { title: 'Wednesday', value: 'Wednesday' },
          { title: 'Thursday', value: 'Thursday' },
          { title: 'Friday', value: 'Friday' },
          { title: 'Saturday', value: 'Saturday' },
          { title: 'Sunday', value: 'Sunday' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: [{ type: 'coach' }],
    },
  ],
}
