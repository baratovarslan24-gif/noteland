import { GlobalConfig } from 'payload'

// const urlValidator = (value: string | null | undefined): true | string => {
//   if (!value) return true

//   try {
//     const url = new URL(value.trim())

//     if (!['http:', 'https:'].includes(url.protocol)) {
//       return 'Ссылка должна начинаться с http:// или https://'
//     }

//     return true
//   } catch {
//     return 'Введите корректную ссылку'
//   }
// }

export const StoreInfo: GlobalConfig = {
  slug: 'website',
  access: {
    read: () => true,
  },
  label: 'Информация о сайте',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Описание',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Адрес',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Телефон',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email',
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      label: 'Социальные сети',

      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook ссылка',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram ссылка',
        },
        {
          name: 'telegram',
          type: 'text',
          label: 'Telegram ссылка',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp ссылка',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Логотип',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      hasMany: false,
      required: true,
      label: 'Изображение для главной страницы',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
