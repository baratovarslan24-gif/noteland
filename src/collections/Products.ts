import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Товар',
    plural: 'Товары',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название товара',
    },

    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Краткое описание',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'mainPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Главная Фото',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'photos',
      type: 'upload',
      label: 'Дополнительные Фото',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Категория',
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      label: 'Бренд',
      hasMany: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена',
    },
    {
      name: 'salePrice',
      type: 'number',
      label: 'Цена со скидкой',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 0,
      label: 'Количество на складе',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: 'Опубликован',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
