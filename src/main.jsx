import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Modal from 'react-modal';

import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ModalProvider } from './context/ModalContext.jsx';
import { UserProvider } from './context/UserProvider.jsx';

const queryClient = new QueryClient();


Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </UserProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
