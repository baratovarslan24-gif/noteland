import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Бренд',
    plural: 'Бренды',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Название бренда',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'ЧПУ',
      type: 'text',
      admin: {
        readOnly: true, // чтобы руками не правили
      },
      hooks: {
        beforeValidate: [
          ({ data, originalDoc }) => {
            // если slug уже есть (например при обновлении) — не трогаем
            if (originalDoc?.slug) return originalDoc.slug

            if (data?.name) {
              return slugify(data.name, {
                lower: true,
                strict: true, // убирает спецсимволы
                locale: 'ru',
              })
            }
          },
        ],
      },
    },
    {
      name: 'logo',
      label: 'Логотип',
      hasMany: false,
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
