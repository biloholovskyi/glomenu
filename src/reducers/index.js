const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  total: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_LOADED":
      return {
        ...state,
        menu: action.payload,
        loading: false,
        error: false
      };
    case "MENU_REQUESTED":
      return {
        ...state,
        menu: state.menu,
        loading: true,
        error: false
      };
    case "ITEM_ADD_TO_CARD":
      const id = action.payload;
      if (state.items.find(item => item.id === id)) {
        const mainIntem = state.menu.find(item => item.id === id);
        const itemIndex = state.items.findIndex(item => item.id === id);
        const item = state.items[itemIndex];
        const newItem = {
          title: item.title,
          price: +item.price + +mainIntem.price,
          url: item.url,
          id: item.id,
          count: item.count + 1
        };
        return {
          ...state,
          total: state.total + +mainIntem.price,
          items: [
            ...state.items.slice(0, itemIndex),
            newItem,
            ...state.items.slice(itemIndex + 1)
          ]
        };
      }

      const item = state.menu.find(item => item.id === id);
      const newItem = {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id,
        count: 1
      };
      return {
        ...state,
        total: state.total + +item.price,
        items: [
          ...state.items,
          newItem
        ]
      };
    case "MENU_ERROR":
      return {
        ...state,
        menu: state.menu,
        loading: false,
        error: true
      };
    case "DELETE_FROM_CARD":
      const idx = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === idx);
      return {
        ...state,
        total: state.total - +state.items[itemIndex].price,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1)
        ]
      };
    case "CLEAR_ITEMS":
      return {
        ...state,
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export default reducer;