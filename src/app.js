import React from "react";
import indexRoutes from "./routes/";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./routes/PrivateRoutes";
import BlankLayout from "./layouts/BlankLayout";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const App = () => {
  //const [currentUser, SetcurrentUser] = useState(null);
  return (
    <DndProvider backend={HTML5Backend}>
        <Provider store={configureStore()}>
            <Router history={History}>
                <Switch>
                    <Route exact path="/authentication/Login" component={BlankLayout} />;
                    {indexRoutes.map((prop, key) => {
                        return (
                            <PrivateRoute
                                path={prop.path}
                                key={key}
                                component={prop.component}
                            />
                        );
                    })}
                </Switch>
            </Router>
        </Provider>
    </DndProvider>
  );
};

export default App;
