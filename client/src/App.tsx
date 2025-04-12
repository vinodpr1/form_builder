import { RouterProvider } from "react-router-dom"
import appRouter from "./appRouter"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
      <ToastContainer />
    </div>
  )
}

export default App