import Stripe from 'stripe'
import { getPayloadClient } from '@/lib/payloadClient'
import type { Order } from '@/payload-types'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
}

export default async function handler(req: Request) {
  try {
    const payload = await getPayloadClient()
    const body = await req.json()

    const {
      items,
      shippingAddress,
      phone,
      userId,
    }: {
      items: CartItem[]
      shippingAddress: string
      phone: string
      userId?: number
    } = body

    // Валидация
    //
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User required' }), { status: 400 })
    }

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Нет товаров' }), { status: 400 })
    }

    if (!shippingAddress || !phone) {
      return new Response(JSON.stringify({ error: 'shippingAddress and phone are required' }), {
        status: 400,
      })
    }

    const data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
      user: userId,
      status: 'pending',
      paymentMethod: 'card',
      shippingAddress,
      phone,
      items: items.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    }

    // Проверка существования продуктов
    for (const item of items) {
      try {
        await payload.findByID({
          collection: 'products',
          id: item.id,
        })
      } catch {
        console.error('❌ PRODUCT NOT FOUND:', item.id)

        return new Response(JSON.stringify({ error: `Invalid product id: ${item.id}` }), {
          status: 400,
        })
      }
    }

    // Создание заказа
    const order = await payload.create({
      collection: 'orders',
      data,
      overrideAccess: true,
    })

    // 💳 Create Stripe checkout session

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      mode: 'payment',

      metadata: {
        orderId: String(order.id),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    })

    // сохранение Stripe session ID
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        stripeSessionId: session.id,
      },
      overrideAccess: true,
    })

    return new Response(JSON.stringify({ url: session.url }), { status: 200 })
  } catch (err: any) {
    console.error('ERROR:', err)

    return new Response(
      JSON.stringify({
        error: err.message || 'Internal server error',
      }),
      { status: 500 },
    )
  }
}
