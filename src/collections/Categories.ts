import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Категория',
    plural: 'Категории',
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
      label: 'Название',
      type: 'text',
      required: true,
      unique: true,
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
      name: 'icon',
      label: 'Иконка',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'parent',
      label: 'Родительская категория',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
  ],
}
