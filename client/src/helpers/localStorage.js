//TODO: CHECK IF IT'S POSIBLE TO USE ONLY ONE FUNCTION 

export const saveWishListToLocalStorage = (data) => {
   const getLocalStorageData = localStorage.getItem("wishList") !== null ? JSON.parse(localStorage.getItem("wishList")) : [];
   const existingData = getLocalStorageData.find((item) => item.id === data.id);
   if (!existingData) {
      getLocalStorageData.push({
         title: data.title,
         price: data.price,
         imageUrl: data.imageUrl,
         id: data.id,
      });
   } else {
      return
   };
   if (window !== "undefined") {
      localStorage.setItem("wishList", JSON.stringify(getLocalStorageData))
   };
}

export const saveCartToLocalStorage = (cart) => {
   const initialValue = {
      cartItem: [],
      quantity: 0,
      totalAmount: 0
   };

   const getCartItem = localStorage.getItem("cartData") !== null ? JSON.parse(localStorage.getItem("cartData")) : initialValue;
   const findExistingItem = getCartItem.cartItem.find((item) => item.id === cart.id);
   if (!findExistingItem) {
      getCartItem.cartItem.push({
         title: cart.title,
         imageUrl: cart.imageUrl,
         price: cart.price,
         id: cart.id,
         quantity: cart.quantity
      })
      getCartItem.quantity++;
      getCartItem.totalAmount = getCartItem.totalAmount + cart.price
   } else {
      getCartItem.quantity++;
      getCartItem.totalAmount = getCartItem.totalAmount + cart.price
   }
   if (window !== "undefined") {
      localStorage.setItem("cartData", JSON.stringify(getCartItem));
   }
}

export const deleteFromLocalStorage = (id, key) => {
   const getWishList = JSON.parse(localStorage.getItem(key));
   const updateWishListArr = getWishList.filter((item) => item.id !== id);
   localStorage.setItem(key, JSON.stringify(updateWishListArr))
}