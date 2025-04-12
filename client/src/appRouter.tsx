import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LanfingPage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";


const appRouter = createBrowserRouter([
   {
    path: "/",
    element: <Navbar/>,
    children: [
        {
            path: "/",
            element: <LandingPage/>,
            children: []
        },
        {
            path: "/signin",
            element: <Signin/>,
            children: []
        },
        {
            path: "/signup",
            element: <Signup/>,
            children: []
        }
    ]
   }
])


export default appRouter