/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('')
  const { totalAmount } = useSelector(state => state.cart)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/create-payment-intent`,
          {
            totalAmount
          }
        )
        setClientSecret(result?.data?.clientSecret)
      } catch (err) {
        console.log(err)
      }
    }
    fetchClientSecret()
  }, [totalAmount])

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default Payment
