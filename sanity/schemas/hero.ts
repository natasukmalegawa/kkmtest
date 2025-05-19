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
      name: 'ctaSecondaryText',
      title: 'Default Secondary CTA Text',
      type: 'string',
      description: 'Optional secondary text that appears next to the CTA button'
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
              description: 'Main headline text (H1)'
            },
            {
              name: 'subtitle',
              title: 'Slide Subtitle',
              type: 'text',
              description: 'Secondary headline text (H2)'
            },
            {
              name: 'ctaText',
              title: 'Call to Action Text',
              type: 'string',
              description: 'Primary button text'
            },
            {
              name: 'ctaSecondaryText',
              title: 'Secondary CTA Text',
              type: 'string',
              description: 'Optional secondary text that appears next to the CTA button'
            },
            {
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'High-quality background image (recommended resolution: 1920x1080 or higher)'
            },
          ],
        },
      ],
      description: 'Multiple slides for the hero carousel'
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : 'No subtitle',
        media: media
      }
    }
  }
}
