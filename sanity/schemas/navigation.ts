export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Use relative URL like "#services" for same-page sections',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the navigation item',
    },
  ],
}
