import Agents from './Components/Agents.js'
import NavBar from './Components/NavBar.js';
import AgentForm from './Components/AgentForm.js';
import UserContext from './Context/UserContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Login from './Components/Login.js';
import NotFound from './Components/NotFound.js';
import Home from './Components/Home.js';
import DeleteAgent from './Components/DeleteAgent.js';
import Confirmation from './Components/Confirmation.js';


function App() {

  const [currentUser, setCurrentUser] = useState(null);


  const userObject = {
    currentUser,
    setCurrentUser
  };

  const onLogout = () => {
    localStorage.removeItem("jwt_token");
    setCurrentUser(null);
  }

  useEffect(() => {

    const jwtPresent = localStorage.getItem("jwt_token");
    if (jwtPresent) {
      const userObject = jwtDecode(jwtPresent);

      if (currentUser === null || userObject.sub !== currentUser.sub) {
        setCurrentUser(userObject);
      }


    }

  });


  return (
    <>
      <div className="header">
        <h1>Field Agents Application</h1>
      </div>

      <Router>
        <UserContext.Provider value={userObject}>
          <NavBar onLogOut={onLogout} />

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path={["/update-agent/:id", "/add-agent"]}>
              {currentUser?.sub ? <AgentForm role={currentUser?.authorities} /> : <Redirect to="/" />}
            </Route>
            <Route path="/update-agents">
              {currentUser?.sub ? <Agents role={currentUser?.authorities} /> : <Redirect to="/" />}
            </Route>
            <Route path="/delete-agent/:id">
              {currentUser?.sub ? <DeleteAgent role={currentUser?.authorities} /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/confirmation">
              <Confirmation />
            </Route>
            <Route >
              <NotFound />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
