import { createTheme } from '@mui/material/styles'
import { palette } from './palette'

export const theme = createTheme({
  palette: {
    ...palette
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  inputLabel: {
    MuiInputLabel: {
      root: {
        color: '#212529',
        fontSize: '0.9rem'
      }
    }
  }
})
