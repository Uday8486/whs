import {
  HANDLE_GLOBAL_ERROR,
  RESET_GLOBAL_ERROR,
} from "../actions/actionTypes";
import { GlobalErrorActions } from "../actions/globalError";

interface ErrorState {
  errorMessage?: string;
  error: boolean;
}

export const initialState = {
  error: false,
};

const globalErrorHandler = (
  state: ErrorState = initialState,
  action: GlobalErrorActions
): ErrorState => {
  switch (action.type) {
    case HANDLE_GLOBAL_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        error: true,
      };
    case RESET_GLOBAL_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default globalErrorHandler;
