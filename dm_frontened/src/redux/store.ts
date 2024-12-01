import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga/rootsaga";
import rootSlice from "./features/rootslice";
import logger  from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
  key: 'ss', 
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootSlice);

const sagaMiddleware=createSagaMiddleware();

export const store = configureStore({
  reducer:persistedReducer,
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware,logger),
});


sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);

