import { Switch, Route } from "react-router-dom";
import { tabs } from "../../helpers/tabs";
function NavigationRouteComp({ set, user }) {
  // creating the routes for all the tabs (pages)
  return (
    // <Switch>
    //   {tabs.map((tab, index) => (
    //     <Route key={index} path={tab.href}>
    //       {<tab.page set={set} user={user}></tab.page>}
    //     </Route>
    //   ))}
    // </Switch>

    <Switch>
      {tabs.map((tab, index) => {
        if (tab.href === "/") {
          return (
            <Route exact key={index} path={tab.href}>
              {<tab.page set={set} user={user}></tab.page>}
            </Route>
          );
        } else {
          return (
            <Route key={index} path={tab.href}>
              {<tab.page set={set} user={user}></tab.page>}
            </Route>
          );
        }
      })}
    </Switch>
  );
}

export default NavigationRouteComp;
