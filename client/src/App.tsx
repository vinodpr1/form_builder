import { RouterProvider } from "react-router-dom"
import appRouter from "./appRouter"

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}

export default App