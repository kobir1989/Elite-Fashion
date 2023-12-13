import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '../Typography/Typography'
import Button from '../Button/Button'
import styles from './styles/CategoryCard.module.scss'

const CategoryCard = ({ imgUrl, title, linkTo }) => {
  return (
    <div className={styles.category_card_wrapper}>
      <div className={styles.image_wrapper}>
        <img
          loading='lazy'
          placeholder='/assets/product-placeholder.webp'
          src={imgUrl}
          alt='category.png'
        />
      </div>
      <div className={styles.card_text_wrapper}>
        <Typography variant={'h4'} color={'white'}>
          {title}
        </Typography>
        <Link to={linkTo}>
          <Button variant={'white'}>Shop now</Button>
        </Link>
      </div>
    </div>
  )
}

export default CategoryCard
