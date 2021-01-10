import Stripe from 'stripe'

const secret = process.env.SECRET_KEY
const stripe = new Stripe(
  'sk_test_51I5HSaAJpz0S6tifAuVSi95QJbBc8D288cWllgJq0FSKPsmDkrBF7jPOfHYCRhVrfiatb8rIWzsRC8HlBP0xpsg500gQiOaEBn'
)

const createCharge = async (req, res) => {
  const { id, amount, description } = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description,
      payment_method: id,
      confirm: true,
    })

    console.log(payment)

    return res.status(200).json({
      confirm: 'successfull',
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error.message,
    })
  }
}

export default createCharge
