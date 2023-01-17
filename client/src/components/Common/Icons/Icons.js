import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const icons = {
   search: SearchIcon,
   person: PermIdentityIcon,
   love: FavoriteBorderIcon,
   shopingCart: AddShoppingCartIcon,
   menu: MenuIcon,
   cross: CloseIcon,
   login: LoginIcon,
   logout: LogoutIcon,
   signup: AppRegistrationIcon,
   account: ManageAccountsIcon,
   check: CheckCircleOutlineIcon


}

const Icons = React.forwardRef((props, ref) => {
   const { name, size, color, ...others } = props;
   const Icon = icons[name];
   return <Icon ref={ref} sx={{ fontSize: size, color: color }} {...others} />
})

export default Icons;