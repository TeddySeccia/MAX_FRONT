import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Modal from 'react-modal';
import { ModalProvider } from './context/ModalContext.jsx';
import { UserProvider } from './context/UserProvider.jsx';


Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </StrictMode>
);
