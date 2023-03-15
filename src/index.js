import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.scss'
import App from './App'
import Episode from './layout/Episode'
import Podcast from './layout/Podcast'
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <p>Error</p>,
  },
  {
    path: 'podcast/:podcastId',
    element: <Podcast />,
  },
  {
    path: 'podcast/:podcastId/chapter/:chapterId',
    element: <Episode />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
