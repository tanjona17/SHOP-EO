'use client'

// na actualisena ary de stocke fona le donnner anaty reducers

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user_redux from "./user_redux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
//   const root_reducer = combineReducers({cart: cart_redux, user: user_redux})
  
  const persistedReducer = persistReducer(persistConfig, user_redux)


export const store =  configureStore({
    reducer: persistedReducer,
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
 
});

export let persistor = persistStore(store);