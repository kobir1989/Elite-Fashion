import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const NextArrow = (props) => {
   const { className, style, onClick, mr } = props;
   return (
      <div style={
         {
            position: "absolute",
            top: "50%",
            right: mr || "-2%"
         }} onClick={onClick}>
         <button style={{ border: "unset", background: "unset" }}>
            <ArrowForwardIosIcon sx={{ fontSize: "2rem", color: "#3b3841" }} />
         </button>
      </div>
   );
}

export const PrevArrow = (props) => {
   const { className, style, onClick, ml } = props;
   return (
      <div style={{
         position: "absolute",
         top: "50%",
         left: ml || "-2%"
      }} onClick={onClick}>
         <button style={{ border: "unset", background: "unset" }}>
            <ArrowBackIosIcon sx={{ fontSize: "2rem", color: "#3b3841" }} />
         </button>
      </div>
   );
}
