import Agents from './Agents.js'
import NavBar from './NavBar.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Field Agents Application</h1>
      </div>
      <div>
        <NavBar />
      </div>
      <div className="row">
        <div className="col-md">
          <Agents />
        </div>
        
      </div>
    </div>
  );
}

export default App;
