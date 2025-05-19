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
      title: 'Primary Button Text',
      type: 'string',
      description: 'Text for the primary button (e.g., "Learn more")'
    },
    {
      name: 'ctaSecondaryText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text for the outline button (e.g., "Contact us")'
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
              title: 'Primary Button Text',
              type: 'string',
              description: 'Text for the primary button'
            },
            {
              name: 'ctaSecondaryText',
              title: 'Secondary Button Text',
              type: 'string',
              description: 'Text for the outline button'
            },
            {
              name: 'additionalText',
              title: 'Additional Text (Purple)',
              type: 'string', 
              description: 'Optional text that appears below the buttons (in purple)'
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
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? subtitle.slice(0, 50) + '...' : 'No subtitle',
        media: media
      }
    }
  }
}
