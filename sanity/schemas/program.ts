export default {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Coming Soon', value: 'coming soon' },
          { title: 'On Progress', value: 'on progress' },
          { title: 'Available', value: 'available' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the program',
    },
  ],
}
