import { TEST } from "./types";
export const registerfunc = (data) => (dispatch) => {
  dispatch({
    type: TEST,
    payload: data,
  });
};
