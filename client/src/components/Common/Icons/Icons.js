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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ErrorIcon from '@mui/icons-material/Error';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';

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
   check: CheckCircleOutlineIcon,
   truck: LocalShippingOutlinedIcon,
   bag: ShoppingBagOutlinedIcon,
   settings: SettingsOutlinedIcon,
   delete: DeleteForeverIcon,
   edit: EditIcon,
   subtract: RemoveIcon,
   add: AddIcon,
   card: CreditScoreOutlinedIcon,
   return: AssignmentReturnOutlinedIcon,
   facebook: FacebookIcon,
   twitter: TwitterIcon,
   youtube: YouTubeIcon,
   email: EmailIcon,
   phone: LocalPhoneIcon,
   instagram: InstagramIcon,
   backArrow: ArrowBackIosNewIcon,
   forwardArrow: ArrowForwardIosIcon,
   error: ErrorIcon,
   off: ToggleOffIcon,
   on: ToggleOnIcon,
   arrowBack: ArrowBackIosIcon,
   eyeOpen: RemoveRedEyeIcon,
   eyeClosed: VisibilityOffIcon,
   loveFilled: FavoriteIcon,
   camera: CameraAltIcon,
   uploadIcon: DriveFolderUploadIcon,
   moreOptions: MoreVertIcon,
   chatIcon: ChatIcon,
   sendIcon: SendIcon
}

const Icons = React.forwardRef((props, ref) => {
   const { name, size, color, ...others } = props;
   const Icon = icons[name];
   return <Icon ref={ref} sx={{ fontSize: size, color: color }} {...others} />
})

export default Icons;