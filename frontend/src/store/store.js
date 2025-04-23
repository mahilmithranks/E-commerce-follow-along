import { createStore } from "redux";

// Initial state
const initialState = {
  email: "",
};

// Reducer function to handle email state
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(userReducer);

export default store;
