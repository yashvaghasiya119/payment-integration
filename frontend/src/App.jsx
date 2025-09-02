import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { UserRegistration } from './pages/signup'
import { CarList } from './pages/carlist'
import { CarDetail } from './pages/CarDetail'
import { Login } from './pages/login'
import { Success } from './pages/stripe/succes'
import { Cancel } from './pages/stripe/cancel'
import { Crud } from './pages/crud/crud'


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
          path:"/login",
          element:<Login/>
        },
        {
          path:"/carlist",
          element:<CarList/>  
        },
        {
          path:"/carlist/:id",
          element:<CarDetail/>  
        },
        {
          path:"/stripe/success",
          element:<Success/>
        },{
          path:"/stripe/cancel",
          element:<Cancel/>
        },{
          path:"/crud",
          element:<Crud/>
        }
    ])

  return <>
     <RouterProvider router={route} />
    </>
}

export default App
