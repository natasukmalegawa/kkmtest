import { SanityRule } from '../schemaTypes'

export default {
  name: 'contactCard',
  title: 'Contact Card',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for this contact card (e.g., "Instagram", "Email")',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Description or subtitle (e.g., "Follow us for more content")',
      rows: 2,
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Card Icon',
      type: 'image',
      description: 'Small icon to display on the card (Optional)',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'memojiImage',
      title: 'Memoji Image',
      type: 'image',
      description: 'Your memoji or avatar image',
      options: {
        hotspot: true,
      },
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'personalName',
      title: 'Personal Name',
      type: 'string',
      description: 'Personal name or account type to display',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'string',
      description: 'Email, username, or other contact information',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the button (e.g., "Follow", "Email Us")',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'URL for the button (e.g., Instagram profile, mailto link)'
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Background color for the card (in HEX or rgba format)',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'cardBackgroundColor',
      title: 'Personal Card Background Color',
      type: 'string',
      description: 'Background color for the personal card (in HEX or rgba format)',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      validation: (Rule: SanityRule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'contactInfo',
      media: 'memojiImage'
    }
  }
}
