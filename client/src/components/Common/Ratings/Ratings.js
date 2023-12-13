import React from 'react'
import { Rating, useMediaQuery, useTheme } from '@mui/material'

const Ratings = ({ value = 4, size }) => {
  const theme = useTheme()
  const screens = useMediaQuery(theme.breakpoints.down('lg'))
  return (
    <div>
      <Rating
        size={size || screens ? 'small' : 'medium'}
        name='read-only'
        sx={{ color: '#cc2121' }}
        value={value}
        readOnly
      />
    </div>
  )
}

export default Ratings
