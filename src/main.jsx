import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from '@primereact/core'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Aura from '@primeuix/themes/aura'
import App from './components/App.jsx'
import './styles.css'
import { PRIMEUI_LICENSE } from './utils/chaves.js'

const primereact = {
  theme: {
    preset: Aura
  },
  license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
