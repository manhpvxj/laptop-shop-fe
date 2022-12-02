import { Fragment } from 'react';

import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { publicRouter } from "./routes/router";
import store from "./redux/store";

function App() {
  return (
      <Router>
        <Routes>
          {publicRouter.map((router, index) => {
            const Page = router.component || Fragment;
            const Layout = router.layout || Fragment;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
  );
}

export default App;
