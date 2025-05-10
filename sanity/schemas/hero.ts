export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Default Title',
      type: 'string',
      description: 'Default title if no slides are defined'
    },
    {
      name: 'subtitle',
      title: 'Default Subtitle',
      type: 'text',
      description: 'Default subtitle if no slides are defined'
    },
    {
      name: 'ctaText',
      title: 'Default Call to Action Text',
      type: 'string',
      description: 'Default button text if no slides are defined'
    },
    {
      name: 'backgroundImage',
      title: 'Default Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Default background image if no slides are defined'
    },
    {
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Slide Title',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Slide Subtitle',
              type: 'text',
            },
            {
              name: 'ctaText',
              title: 'Call to Action Text',
              type: 'string',
            },
            {
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
      description: 'Multiple slides for the hero carousel'
    },
  ],
}
