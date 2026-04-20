import { Product } from '@/payload-types'
import { CollectionConfig } from 'payload'

type OrderItem = {
  product: string | number
  quantity: number
  price: number
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.items?.length) {
          const items = await Promise.all(
            data.items.map(async (item: { product: string; quantity: number; price: number }) => {
              const product = (await req.payload.findByID({
                collection: 'products',
                id: item.product,
              })) as Product

              return {
                ...item,
                price: product.price,
              }
            }),
          )
          data.items = items
          data.total = items.reduce((sum, item) => sum + item.price * item.quantity)
        }
        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { user: { equals: user?.id } }
    },
    create: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'id',
  },
  labels: {
    singular: 'Заказ',
    plural: 'Заказы',
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
          required: true,
          label: 'Пользователь',
        },
        {
          name: 'status',
          label: 'Статус',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'В ожидании', value: 'pending' },
            { label: 'В обработке', value: 'processing' },
            { label: 'Отправлен', value: 'shipped' },
            { label: 'Доставлен', value: 'delivered' },
            { label: 'Отменен', value: 'cancelled' },
          ],
        },
        {
          name: 'paymentMethod',
          label: 'Способ оплаты',
          type: 'select',
          required: true,
          defaultValue: 'cash',
          options: [
            { label: 'Наличные', value: 'cash' },
            { label: 'Карта', value: 'card' },
          ],
        },
        {
          name: 'total',
          type: 'number',
          label: 'Сумма заказа',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'shippingAddress',
          type: 'text',
          label: 'Адрес доставки',
          required: true,
          admin: {
            width: '75%',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Контактный телефон',
        },
      ],
    },
    {
      name: 'stripeSessionId',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      label: 'Товары',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
              label: 'Товар',
            },
            {
              name: 'quantity',
              type: 'number',
              required: true,
              label: 'Количество',
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              label: 'Цена',
            },
          ],
        },
      ],
    },
  ],
}
