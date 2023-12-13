import React from 'react'
import Typography from '../Common/Typography/Typography'
import styles from './styles/TotalAmountView.module.scss'

const TotalAmountView = ({ totalAmount }) => {
  return (
    <div className={styles.cart_total}>
      <Typography variant={'h4'}>Cart Totals</Typography>
      <div className={styles.amount_description}>
        <Typography variant={'body'}>
          Sub Total:
          <span>TK. {totalAmount}</span>
        </Typography>
        <Typography variant={'body'}>
          Shipping Charge:
          <span>TK. 0</span>
        </Typography>
        <Typography variant={'body'} color={'red'}>
          Total Amount:
          <span className={styles.text_red}>TK. {totalAmount + 0}</span>
        </Typography>
      </div>
    </div>
  )
}

export default TotalAmountView
