import Agents from './Components/Agents.js'
import NavBar from './Components/NavBar.js';
import UpdateAgent from './Components/UpdateAgent.js';
import DeleteAgent from './Components/DeleteAgent.js';
import AddAgent from './Components/AddAgent.js';
import UserContext from './Context/UserContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';



function App() {

  const [currentUser, setCurrentUser] = useState(null);

  localStorage.removeItem( "jwt_token");
  const userObject = {
    currentUser,
    setCurrentUser
  };

  const onLogout = () => {
    localStorage.removeItem( "jwt_token");
    setCurrentUser( null );
  }

  useEffect( () => {

    const jwtPresent = localStorage.getItem( "jwt_token" );
    if( jwtPresent ){
      const userObject = jwtDecode(jwtPresent);

      if( currentUser == null || userObject.sub !== currentUser.sub ){
        setCurrentUser( userObject );
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
        <NavBar onLogOut={onLogout}/>
        
        <Switch>
          <Route exact path="/">
            <Agents />
          </Route>
          <Route path="/add-agent">
            <AddAgent />
          </Route>
          <Route path="/update-agent">
            <UpdateAgent />
          </Route>
          <Route path="/delete-agent">
            <DeleteAgent />
          </Route>
        </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
