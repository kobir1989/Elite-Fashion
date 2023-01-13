const wishListArr = [];
export const saveWishListToLocalStorage = (data) => {
   const existingData = wishListArr.find((item) => item.id === data.id);
   if (!existingData) {
      wishListArr.push({
         title: data.title,
         price: data.price,
         imageUrl: data.imageUrl,
         id: data.id
      });
      console.log(existingData)
   } else {
      return
   };
   if (window !== "undefined") {
      localStorage.setItem("wishList", JSON.stringify(wishListArr))
   };
};

export const deleteFromLocalStorage = (id) => {
   const getWishList = JSON.parse(localStorage.getItem("wishList"));
   const updateWishListArr = getWishList.filter((item) => item.id !== id);
   localStorage.setItem("wishList", JSON.stringify(updateWishListArr))
}