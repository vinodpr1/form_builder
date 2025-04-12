import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./components/LanfingPage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import FormBuilder from "./components/form/FormBuilder";
import FormPreview from "./components/form/FormPreview";

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
        },
        {
            path: "/dashboard",
            element: <Dashboard/>,
            children: []
        },
        {
            path: "/formbuilder",
            element: <FormBuilder/>,
            children: []
        },
        {
            path: "/forms/:formId",
            element: <FormPreview />,
            children: []
        }
    ]
   }
])


export default appRouter