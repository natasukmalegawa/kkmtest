export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    // About Section
    {
      name: 'aboutSmallTitle',
      title: 'About Section Small Title',
      type: 'string',
      description: 'Small title displayed above the main About title',
    },
    {
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
    },
    {
      name: 'aboutSubtitle',
      title: 'About Section Subtitle',
      type: 'text',
    },
    // Programs Section
    {
      name: 'programsSmallTitle',
      title: 'Programs Section Small Title',
      type: 'string',
      description: 'Small title displayed above the main Programs title',
    },
    {
      name: 'programsTitle',
      title: 'Programs Section Title',
      type: 'string',
    },
    {
      name: 'programsSubtitle',
      title: 'Programs Section Subtitle',
      type: 'text',
    },
    // Team Section
    {
      name: 'teamSmallTitle',
      title: 'Team Section Small Title',
      type: 'string',
      description: 'Small title displayed above the main Team title',
    },
    {
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
    },
    {
      name: 'teamSubtitle',
      title: 'Team Section Subtitle',
      type: 'text',
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright text that appears in the footer',
    },
  ],
}
