import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { StoreProvider } from './app/context/StoreContext.tsx';
import { configureStore } from './app/store/configureStore.ts';
import { Provider } from 'react-redux';

const store = configureStore(); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Store Provider provides a React Context to the application. */}
    <StoreProvider>
      {/* Passing store to Provider (From React-Redux) */}
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </StoreProvider>
  </React.StrictMode>,
)
