import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { VIEWS } from "./utils";
import DashboardWarden from "./pages/DashboardWarden";
import Home from "./pages/Home";
import DashboardSubWarden from "./pages/DashboardSubWarden";
import DashboardStudent from "./pages/DashboardStudent";
import PrivateRoute from "./components/Routing/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={VIEWS.HOME} element={<Home />} />
          <Route path={VIEWS.WARDENDASHBOARD} element={<DashboardWarden />} />
          <Route
            path={VIEWS.SUBWARDENDASHBOARD}
            element={<DashboardSubWarden />}
          />
          <Route path={VIEWS.STUDENTDASHBOARD} element={<DashboardStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
