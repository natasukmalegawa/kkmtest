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
      options: {
        list: [
          {title: 'Blue', value: 'bg-blue-100'},
          {title: 'Orange', value: 'bg-orange-100'},
          {title: 'Green', value: 'bg-green-100'},
          {title: 'Purple', value: 'bg-purple-100'},
          {title: 'Yellow', value: 'bg-yellow-100'},
          {title: 'Pink', value: 'bg-pink-100'},
        ]
      }
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the card',
    },
  ],
}
