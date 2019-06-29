const menuLoaded = (newMenu) => {
  return {
    type: "MENU_LOADED",
    payload: newMenu
  }
};

const menuRequested = () => ({type: "MENU_REQUESTED"});
const menuError = () => ({type: "MENU_ERROR"});

export  {
  menuLoaded,
  menuRequested,
  menuError
}