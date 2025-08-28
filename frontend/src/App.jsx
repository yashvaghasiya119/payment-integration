import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { UserRegistration } from './pages/signup'
import { CarList } from './pages/carlist'
import { CarDetail } from './pages/CarDetail'

function App() {
    const route = createBrowserRouter([
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/signup",
          element:<UserRegistration/>
        },
        {
          path:"/carlist",
          element:<CarList/>  
        },
        {
          path:"/carlist/:id",
          element:<CarDetail/>  
        },
    ])

  return <>
     <RouterProvider router={route} />
    </>
}

export default App
