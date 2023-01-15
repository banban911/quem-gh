import {RouteObject} from "react-router-dom";
import Home from "../pages/Home";

const routesConfig: RouteObject[] = [
    {
        path: "/home",
        element: <Home/>,
    },
];

export {routesConfig};
