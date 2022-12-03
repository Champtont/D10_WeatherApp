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
          cities: [...state.saved.cities, action.payload],
        },
      };
    case "REMOVE_FROM_SAVED":
      return {
        ...state,
        saved: {
          ...state.saved,
          cities: state.saved.cities.filter((city) => {
            return city.lat !== action.payload;
          }),
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
