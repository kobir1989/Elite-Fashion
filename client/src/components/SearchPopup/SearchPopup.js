import React, { useState } from 'react';
import Button from '../Common/Button/Button';
import Input from "../Common/Input/Input";
import Modal from "../Common/Modal/Modal";
import styles from "./SearchPopup.module.scss";
import Icons from '../Common/Icons/Icons';
import Chip from '@mui/material/Chip';
import { setOpenSearchBox } from "../../redux/features/search/searchSlice";
import { useDispatch } from "react-redux";
import Typography from "../Common/Typography/Typography";
import { Link } from "react-router-dom";
import { useGetSearchResultQuery } from '../../redux/features/search/searchApi'

const SearchPopup = () => {
   const [searchValue, setSearchValue] = useState("")
   const [skipSearch, setSkipSearch] = useState(true)
   const dispatch = useDispatch();
   const { data: searchResult, isError } = useGetSearchResultQuery(
      searchValue,
      {
         skip: skipSearch
      }
   )

   //search Handler
   const searchHandler = (e) => {
      setSearchValue(e.target.value)
      if (e.target.value !== "") {
         setSkipSearch(false)
      } else {
         setSkipSearch(true)
      }
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
               {!isError && searchResult?.length ? searchResult.map((result) => (
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
               )) : <div className={styles.chip_wrapper}>
                  <Link to='/product-details/63c0552572476f87875a928b'>
                     <Chip
                        icon={<Icons name='search' size='1rem' />}
                        label="WOMEN'S 'BASIC CREW NECK T-SHIRT'"
                        clickable={true}
                     />
                  </Link>
                  <Link to='/product-details/63cec974c949f634c5874638'>
                     <Chip
                        icon={<Icons name='search' size='1rem' />}
                        label="Leather Tote Bag"
                        clickable={true}
                     />
                  </Link>
                  <Link to='/product-details/63cd8eed846e9f3d3b1ca32f'>
                     <Chip
                        icon={<Icons name='search' size='1rem' />}
                        label="Sunglass 'Retro Round Sunglasses'"
                        clickable={true}
                     />
                  </Link>
                  <Link to='/product-details/63cec846c949f634c5874622'>
                     <Chip
                        icon={<Icons name='search' size='1rem' />}
                        label="Perfume 'TOM FORD NOIR' "
                        clickable={true} />
                  </Link>
                  <Link to='/product-details/63bee4339335b0eb619b0bc2'>
                     <Chip
                        icon={<Icons name='search' size='1rem' />}
                        label="Denim Jacket"
                        clickable={true}
                     />
                  </Link>

               </div>}
               {isError &&
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