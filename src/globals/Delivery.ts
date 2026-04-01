import type { GlobalConfig } from 'payload'

export const Delivery: GlobalConfig = {
  slug: 'delivery',
  label: 'Политика доставки',
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
      label: 'SEO Описание',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      label: 'Содержание',
      type: 'richText',
      required: true,
    },
  ],
}
