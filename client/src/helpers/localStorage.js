const dataArray = [];
export const saveWishListToLocalStorage = (data) => {
   const existingData = dataArray.find((item) => item.id === data.id);
   if (!existingData) {
      dataArray.push({
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
      localStorage.setItem("wishList", JSON.stringify(dataArray))
   };
};