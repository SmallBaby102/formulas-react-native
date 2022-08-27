import { TEST } from "../actions/types";
const initialState = {
  user: "",
  username: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        username: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
