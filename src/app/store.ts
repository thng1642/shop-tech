
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import filterReducers from '../redux/Filter/FilterSlice';
import rootSaga from './rootSaga';
import popupReducers from '../redux/PopUp/PopupSlice';
import cartReducers from '../redux/Cart/CartSlice';
import authReducers from '../redux/Auth/AuthSlice';


const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    filter: filterReducers,
    popup: popupReducers,
    cart: cartReducers,
    auth: authReducers,
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: true
    }
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
