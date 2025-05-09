export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
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
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description: 'Instagram profile URL',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email address',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'LinkedIn profile URL',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order of the team member',
    },
  ],
}
