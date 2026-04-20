import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export default async function handler(req) {
  try {
    const body = await req.json()
    const { items } = body

    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Нет товаров' }), { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      mode: 'payment',

      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cart',
    })

    return new Response(JSON.stringify({ url: session.url }), { status: 200 })
  } catch (err) {
    console.error(err)

    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
