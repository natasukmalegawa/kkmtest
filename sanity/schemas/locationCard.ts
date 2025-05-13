import { SanityRule } from '../schemaTypes'

export default {
  name: 'locationCard',
  title: 'Location Card',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Judul untuk location card (contoh: "My Current Location")',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Alamat lengkap lokasi',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'Kota lokasi',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'mapImage',
      title: 'Map Image',
      type: 'image',
      description: 'Gambar peta lokasi',
      options: {
        hotspot: true,
      },
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Warna latar belakang card (format rgba atau hex)',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'shareButtonText',
      title: 'Share Button Text',
      type: 'string',
      description: 'Teks untuk tombol share',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'saveButtonText',
      title: 'Save Button Text',
      type: 'string',
      description: 'Teks untuk tombol save',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'callButtonText',
      title: 'Call Button Text',
      type: 'string',
      description: 'Teks untuk tombol call',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      description: 'URL untuk membuka peta di Google Maps atau aplikasi peta lainnya',
      validation: (Rule: SanityRule) => Rule.required()
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Nomor telepon untuk tombol call (opsional)',
    }
  ]
}
