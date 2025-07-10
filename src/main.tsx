import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import { persistedStore, store } from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Provide the Redux store to the entire app */}
      {/* PersistGate is used to delay the rendering of the app until the persisted state has been retrieved and saved to redux store. This is useful to avoid rendering the app with an empty state before the persisted state is loaded. */}
      {/* The loading prop can be used to show a loading indicator while the persisted state is being loaded. In this case, it is set to null, meaning no loading indicator will be shown. You can replace it with a spinner or any other loading component if you want to show a loading indicator. */}
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
