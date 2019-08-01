const initialState = {
  isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG IN":
      console.log("hello");
      return {
        ...state,
        isLoggedIn: true
      };
    case "LOG OUT":
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
