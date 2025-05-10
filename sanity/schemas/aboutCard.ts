export default {
  name: 'aboutCard',
  title: 'About Card',
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
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'iconBgColor',
      title: 'Icon Background Color',
      type: 'string',
      description: 'Color code for icon background (e.g. #f0f9ff for light blue)',
      initialValue: '#f0f9ff', // default light blue
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the card',
    },
  ],
}
