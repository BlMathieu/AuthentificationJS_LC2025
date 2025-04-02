import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import { Provider } from 'react-redux'
import AuthenticationStore from "./stores/AuthenticationStore.ts"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={AuthenticationStore}>
      <App />
    </Provider>
  </StrictMode>,
)
