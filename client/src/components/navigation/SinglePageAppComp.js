import NavigationRouteComp from "./NavigationRouteComp";
import NavigationBarComp from "./NavigationBarComp";
import { BrowserRouter as Router } from "react-router-dom";
function SinglePageAppComp({ set, user }) {
  return (
    // adding the router for the nav and the switch
    <Router>
      <NavigationBarComp set={set} user={user}></NavigationBarComp>
      <NavigationRouteComp set={set} user={user}></NavigationRouteComp>
    </Router>
  );
}
export default SinglePageAppComp;
