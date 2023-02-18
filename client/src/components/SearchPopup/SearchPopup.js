import React, { useState } from 'react';
import Button from '../Common/Button/Button';
import Input from "../Common/Input/Input";
import Modal from "../Common/Modal/Modal";
import styles from "./SearchPopup.module.scss";
import Icons from '../Common/Icons/Icons';
import { setOpenSearchBox } from "../../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResult } from "../../redux/actions/searchAction";
import Typography from "../Common/Typography/Typography";
import { Link } from "react-router-dom";

const SearchPopup = () => {
   const [searchValue, setSearchValue] = useState("")
   const dispatch = useDispatch();
   const { searchResult, error } = useSelector(state => state.search);
   // console.log(searchResult, "RESULT")
   const searchHandler = (e) => {
      dispatch(fetchSearchResult(e.target.value))
      setSearchValue(e.target.value)
   }
   return (
      <Modal onClose={() => dispatch(setOpenSearchBox(false))}>
         <div className={styles.search_popup_wrapper}>
            <div className={styles.search_input}>
               <Input
                  full={true}
                  required={false}
                  label={"Search..."}
                  size={"small"}
                  autoComplete="off"
                  onChange={searchHandler}
                  value={searchValue}
               />
               <Icons name={"search"} color={"#e5e5e5"} />
            </div>
            <div className={styles.search_result_wrapper}>
               {searchResult && searchResult.length ? searchResult.map((result) => (
                  <Link to={`/product-details/${result?._id}`}
                     key={result?._id}
                     onClick={() => dispatch(setOpenSearchBox(false))}>
                     <div className={styles.search_result_row}>
                        <img src={result?.image} alt="result.png" />
                        <Typography variant={"body"}>{result?.title}</Typography>
                        <Typography variant={"body"}>
                           TK. {result?.price}.00
                        </Typography>
                     </div>
                  </Link>
               )) : null}
               {error &&
                  <div className={styles.error_message}>
                     <Typography
                        variant={"body"}
                        color={"red"}>
                        Something went wrong!
                     </Typography>
                  </div>
               }
            </div>
            <div className={styles.close_btn}>
               <Button variant={"icon-btn-white "}
                  onClick={() => dispatch(setOpenSearchBox(false))}>
                  Cancel
               </Button>
            </div>
         </div>
      </Modal>
   )
}

export default SearchPopup;