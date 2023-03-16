import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/styles/index.scss'
import Home from './layout/Home/Home'
import Episode from './layout/Episode/Episode'
import Podcast from './layout/Podcast/Podcast'
import reportWebVitals from './reportWebVitals'
import store from './store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <p>Error</p>,
  },
  {
    path: 'podcast/:podcastId',
    element: <Podcast />,
  },
  {
    path: 'podcast/:podcastId/episode/:episodeId',
    element: <Episode />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
