import React from 'react'
import styles from '../styles/TopCategoriesSection.module.scss'
import Typography from '../../../components/Common/Typography/Typography'
import GridViewLayout from '../../../layouts/GridViewLayout'
import CategoryCard from '../../../components/Common/Card/CategoryCard'

const TopCategoriesSection = () => {
  return (
    <div className={styles.top_category_wrapper}>
      <Typography variant={'h3'}>Top Categories</Typography>
      <GridViewLayout page='category'>
        <CategoryCard
          title={"Men's Jacket"}
          imgUrl={
            'https://res.cloudinary.com/dhkdpjwjm/image/upload/v1673021384/products/z0usfm8cwscnnyjzsmwu.png'
          }
          linkTo={'products/63b98f8c4548043f8e798bcc'}
        />
        <CategoryCard
          title={"Women's Tops"}
          imgUrl={
            'https://res.cloudinary.com/dhkdpjwjm/image/upload/v1674331816/products/dresss_mglfq9.jpg'
          }
          linkTo={'products/63b994104548043f8e798be7'}
        />
        <CategoryCard
          title={'Fashionable Accessories'}
          imgUrl={
            'https://res.cloudinary.com/dhkdpjwjm/image/upload/v1673105268/products/gxy13acqxvcunqok7kql.jpg'
          }
          linkTo={'products/63c9a2447a0abbfb3ac0687a'}
        />
      </GridViewLayout>
    </div>
  )
}

export default TopCategoriesSection
