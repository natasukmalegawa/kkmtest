import { SanityRule } from '../schemaTypes'

export default {
  name: 'upcomingProgram',
  title: 'Upcoming Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: SanityRule) => Rule.required().max(200)
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'status',
      title: 'Program Status',
      type: 'string',
      options: {
        list: [
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Registration Open', value: 'registration-open' },
          { title: 'In Progress', value: 'in-progress' },
        ],
        layout: 'radio'
      },
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'registrationDate',
      title: 'Registration Date',
      type: 'date',
      description: 'When registration opens',
    },
    {
      name: 'programDate',
      title: 'Program Date',
      type: 'date',
      description: 'When the program starts',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical location or "Online"'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in IDR or 0 for free programs'
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'features',
      title: 'Program Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or benefits of this program'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in the upcoming programs list (lower numbers appear first)',
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'External link for registration (optional)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      status: 'status'
    },
    prepare({
      title,
      media,
      status
    }: {
      title: string
      media: any
      status: string
    }) {
      return {
        title,
        media,
        subtitle: `Status: ${status}`
      }
    }
  }
}
