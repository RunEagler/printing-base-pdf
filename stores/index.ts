import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import { settingPersistModule, SettingState } from '@/stores/modules/SettingPersistModule';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

const rootPersistConfig = {
  key: 'pdf-document',
  storage: sessionStorage,
};

export const reducer = combineReducers<IState>({
  settingPersistModule: persistReducer(rootPersistConfig, settingPersistModule.reducer),
});

export interface IState {
  settingPersistModule: any;
}

const makeConfigureStore = (reducer) => createStore(reducer, undefined, applyMiddleware(...[thunk]));

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfigureStore(reducer);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['fromClient'], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = makeConfigureStore(persistedReducer);

    // @ts-ignore
    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
