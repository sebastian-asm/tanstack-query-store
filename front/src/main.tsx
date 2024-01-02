import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'

import { router } from './router/router.tsx'
import { TanstackProvider } from './plugins/TanstackProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanstackProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </NextUIProvider>
    </TanstackProvider>
  </React.StrictMode>
)
