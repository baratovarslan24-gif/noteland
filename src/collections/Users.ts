import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      return {
        id: { equals: user.id }, // только свой профиль
      }
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Роль',
      type: 'select',
      defaultValue: 'user',
      options: [
        {
          label: 'Администратор',
          value: 'admin',
        },
        {
          label: 'Пользователь',
          value: 'user',
        },
      ],
    },
  ],
}
