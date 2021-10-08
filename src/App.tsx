import React from "react";
import logo from "./logo.svg";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
const history = createBrowserHistory();
const HomeScreen = React.lazy(() => import("pages/Homescreen"));

function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      const isMobileCurrent = window.innerWidth <= 768;
      if (isMobileCurrent !== isMobile) {
        setIsMobile(isMobileCurrent);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          {!isMobile ? (
            <React.Fragment>
              <Switch>
                <Route exact path="/" component={HomeScreen} />
              </Switch>
            </React.Fragment>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
