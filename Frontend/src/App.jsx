import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Layout } from "./layout/Layout.jsx"
import { Home } from "./pages/Home/Home.jsx"
import { Error } from "./pages/Error/Error.jsx"
import {Register} from "./pages/Auth/Register.jsx"
import { Login } from "./pages/Auth/Login.jsx"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Error />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
