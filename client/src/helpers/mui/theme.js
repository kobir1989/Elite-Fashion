import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#212529',
         light: '#3b3841'
      },
      secondary: {
         main: '#727272',
         light: "#e5e5e5"
      },
      error: {
         main: "#cc2121",
         light: "#ff7979"
      }

   },
   inputLabel: {
      MuiInputLabel: {
         root: {
            color: '#212529',
            fontSize: "0.9rem",
         },

      },
   }
});
