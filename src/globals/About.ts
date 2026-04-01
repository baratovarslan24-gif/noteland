import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'О нас',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO описание',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
