import PropTypes from 'prop-types';
import styles from "../styles/TabPanel.module.scss";


const TabPanel = (props) => {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && (
            <div className={styles.tab_pannel_wrapper}>
               {children}
            </div>
         )}
      </div>
   );
}
TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

export default TabPanel;