import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

import globalError from '../reducers/globalErrors';

const rootReducer = combineReducers({
    globalError,
});

export { rootReducer };

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
