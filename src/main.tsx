import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Some embedded media/browser integrations reject with an opaque plain object.
// Ignore only that non-actionable shape; real Error and DOMException failures
// remain visible in DevTools with their original stack traces.
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const isOpaqueObjectRejection =
    reason !== null &&
    typeof reason === 'object' &&
    !(reason instanceof Error) &&
    !(reason instanceof DOMException) &&
    !('message' in reason) &&
    !('stack' in reason);

  const isEmbeddedMediaPermissionRejection =
    reason !== null &&
    typeof reason === 'object' &&
    'code' in reason &&
    reason.code === 403 &&
    'httpError' in reason &&
    reason.httpError === false;

  if (isOpaqueObjectRejection || isEmbeddedMediaPermissionRejection) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
