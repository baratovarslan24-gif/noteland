import { GlobalConfig } from 'payload'

const urlValidator = (value: string | null | undefined): true | string => {
  if (!value) return true

  try {
    const url = new URL(value.trim())

    if (!['http:', 'https:'].includes(url.protocol)) {
      return 'Ссылка должна начинаться с http:// или https://'
    }

    return true
  } catch {
    return 'Введите корректную ссылку'
  }
}

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
      admin: {
        rows: 5,
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Логотип',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'home_banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Изображение для главной страницы',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Адрес',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Телефон',
      admin: {
        position: 'sidebar',
      },
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
          validate: urlValidator,
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram ссылка',
          validate: urlValidator,
        },
        {
          name: 'telegram',
          type: 'text',
          label: 'Telegram ссылка',
          validate: urlValidator,
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp ссылка',
          validate: urlValidator,
        },
      ],
    },
  ],
}
