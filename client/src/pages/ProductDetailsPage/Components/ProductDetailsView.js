import React, { useState } from 'react'
import Icons from '../../../components/Common/Icons/Icons'
import Typography from '../../../components/Common/Typography/Typography'
import Button from '../../../components/Common/Button/Button'
import SelectOptions from '../../../components/Common/SelectOptions/SelectOptions'
import CardSkeleton from '../../../components/Common/Skeleton/CardSkeleton'
import TextSkeleton from '../../../components/Common/Skeleton/TextSkeleton'
import ErrorMessage from '../../../components/Common/Error/ErrorMessage'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../styles/ProductDetails.module.scss'
import {
  addToCart,
  removeOneFromCart
} from '../../../redux/features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import Ratings from '../../../components/Common/Ratings/Ratings'
import toast from 'react-hot-toast'
import ButtonGroup from '../../../components/Common/Button/ButtonGroup'

const ProductDetailsView = ({ product, isError, isLoading }) => {
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  const { token } = useSelector(state => state.auth)
  const { cartItem } = useSelector(state => state.cart)
  const findQntt = cartItem.find(qntt => qntt?.id === product?._id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //Cart Handler
  const cartHandler = item => {
    if (!token) {
      //send user back to login page if not logged in
      toast.dismiss()
      toast.error('Please log in to add items to your cart')
      navigate('/login')
    }
    if (!color || !size) {
      setIsEmpty(true) // if color or size not selected there will be a error message
      return
    }

    //if product is not in stock user can't add product to cart
    if (
      product?.stock <= 0 ||
      (findQntt && findQntt.quantity >= product.stock)
    ) {
      toast.dismiss()
      return toast.error('This product is currently out of stock')
    }
    dispatch(addToCart(item))
  }
  //Remove product form cart
  const removeHandler = id => {
    dispatch(removeOneFromCart(id))
  }

  //Checkout handler
  const checkoutHandler = () => {
    if (findQntt.quantity > 0) {
      //if product length is less then 0 user can not navigate to checkout page.
      navigate('/cart')
    }
  }
  return (
    <div className={styles.product_page_details_wrapper}>
      {isError && <ErrorMessage />}
      <div className={styles.img_wrapper}>
        <img src={product?.image} alt='' />
        {isLoading && <CardSkeleton width={'100%'} height={'36rem'} col={1} />}
      </div>
      {isLoading ? (
        <div className={styles.skeleton_wrapper}>
          <TextSkeleton row={10} height={12} />
        </div>
      ) : (
        <div className={styles.product_info}>
          <div className={styles.text_wrapper}>
            <Typography variant={'h3'}>{product?.title}</Typography>
            <Ratings />
            <Typography variant={'h3'}>&#2547; {product?.price}</Typography>
            <Typography variant={'body'}>{product?.description}</Typography>
          </div>
          <div className={styles.options}>
            <SelectOptions
              label={'SIZE'}
              error={isEmpty ? true : false}
              errorMessage={'Color and Size are Required'}
              onChange={e => {
                setSize(e.target.value)
              }}
              value={size}
              options={['SMALL', 'MEDIUM', 'LARGE', 'XL', 'XXL']}
            />
            <SelectOptions
              onChange={e => {
                setColor(e.target.value)
              }}
              label={'COLOR'}
              error={isEmpty ? true : false}
              errorMessage={'Color and Size are Required'}
              value={color}
              options={['BLUE', 'RED']}
            />
          </div>
          <div className={styles.stock}>
            <Typography
              variant={'h5'}
              color={product?.stock > 0 ? 'success' : 'red'}
            >
              Availability:
            </Typography>
            <Typography
              variant={'h5'}
              color={product?.stock > 0 ? 'success' : 'red'}
            >
              {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
            {product?.stock > 0 ? (
              <Icons name={'check'} color={'#116954'} />
            ) : (
              <Icons name={'delete'} color={'#cc2121'} />
            )}
          </div>
          <div className={styles.buttons_wrapper}>
            <ButtonGroup
              onRemove={() => {
                removeHandler(product?._id)
              }}
              onAdd={() => {
                cartHandler({
                  title: product?.title,
                  imageUrl: product?.image,
                  price: product?.price,
                  id: product?._id,
                  quantity: 1,
                  color: color,
                  size: size
                })
              }}
              quantity={findQntt?.quantity}
            />
            <div className={styles.checkout_btn_wrapper}>
              {findQntt && findQntt.quantity > 0 ? (
                <Button variant={'primary'} onClick={checkoutHandler}>
                  Checkout
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailsView
