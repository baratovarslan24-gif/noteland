import type { GlobalConfig } from 'payload'

export const FeaturedProductList: GlobalConfig = {
  slug: 'featured-product-list',
  label: 'Список избранных товаров',
  fields: [
    {
      name: 'products',
      label: 'Товары',
      type: 'array',
      fields: [
        {
          name: 'product',
          label: 'Товар',
          type: 'relationship',
          relationTo: 'products',
        },
      ],
    },
  ],
}
