const menuLoaded = (newMenu) => {
  return {
    type: "MENU_LOADED",
    payload: newMenu
  }
};

const menuRequested = () => ({type: "MENU_REQUESTED"});
const menuError = () => ({type: "MENU_ERROR"});
const addedToCart = (id) => ({type: "ITEM_ADD_TO_CARD", payload: id});
const deleteFromCart = (id) => ({type: "DELETE_FROM_CARD", payload: id});
const clearItems = () => ({type: "CLEAR_ITEMS"});

export  {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCart,
  deleteFromCart,
  clearItems
}