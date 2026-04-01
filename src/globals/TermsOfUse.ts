import type { GlobalConfig } from 'payload'

export const TermsOfUse: GlobalConfig = {
  slug: 'terms-of-use',
  label: 'Условия использования',
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
