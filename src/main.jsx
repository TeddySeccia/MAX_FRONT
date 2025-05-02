import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Modal from 'react-modal';

import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import {createSyncStoragePersister,} from '@tanstack/query-sync-storage-persister';

import { ModalProvider } from './context/ModalContext.jsx';
import { UserProvider } from './context/UserProvider.jsx';

const sessionPersister = createSyncStoragePersister({
  storage: window.sessionStorage,
});

const queryClient = new QueryClient();
persistQueryClient({
  queryClient,
  persister: sessionPersister,
  maxAge: 1000 * 60 * 60, // 1 heure (ajustable)
});

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
