const rd = (state, action) => {
  switch (action.type) {
    case 'Login': {
      return {
        data: action.payload,
      };
    }
    case 'LogOut': {
      return {
        data: null,
      };
    }
    default:
      return state;
  }
};

export default rd;
