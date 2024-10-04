import express from "express"
import exampleRoute from "./example.route"
const router = express.Router();

const defaultRoutes = [
  {
    path: "/example",
    route: exampleRoute
  },
  // add your route here, for the content of route, please refer to example.route
  // for example
  // {
  //   path: "/auth",
  //   route: authRoute
  // }
]


// Below code will loop through all items in defaultRoutes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router