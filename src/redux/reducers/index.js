const initialState = {
  saved: {
    cities: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_SAVED":
      return {
        ...state,
        saved: {
          ...state.saved,
          companies: [...state.saved.cities, action.payload],
        },
      };
    default:
      return state;
  }
};

export default mainReducer;