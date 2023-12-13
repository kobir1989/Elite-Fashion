import React from 'react'
import Skeleton from '@mui/material/Skeleton'

const CardSkeleton = ({
  width,
  height,
  variant,
  col = 1,
  animation,
  text = false,
  ...otherProps
}) => {
  const colArr = Array(col)
    .fill()
    .map((_, index) => index)
  // console.log(colArr)
  return (
    <>
      {colArr.map((_col, i) => (
        <div key={i} {...otherProps}>
          <Skeleton
            variant={variant || 'rectangular'}
            width={width || 210}
            height={height || 60}
            animation={animation || 'pulse'}
          />
          {text && (
            <>
              <Skeleton
                variant={'rectangular'}
                width={'95%'}
                height={16}
                animation={'wave'}
                sx={{ mt: '0.8rem' }}
              />
              <Skeleton
                variant={'rectangular'}
                width={'70%'}
                height={12}
                animation={'wave'}
                sx={{ mt: '0.8rem' }}
              />
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default CardSkeleton
