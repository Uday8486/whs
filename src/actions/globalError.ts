import { RESET_GLOBAL_ERROR, HANDLE_GLOBAL_ERROR } from './actionTypes';

export const handleGlobalError = (message = '') => ({ type: HANDLE_GLOBAL_ERROR, errorMessage: message } as const);
export type HandleGlobalErrorAction = ReturnType<typeof handleGlobalError>;

export const resetGlobalError = () => ({ type: RESET_GLOBAL_ERROR } as const);
export type ResetGlobalErrorAction = ReturnType<typeof resetGlobalError>;

export type GlobalErrorActions = HandleGlobalErrorAction | ResetGlobalErrorAction;
