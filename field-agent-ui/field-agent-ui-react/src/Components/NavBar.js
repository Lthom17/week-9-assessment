import { Link } from 'react-router-dom';
import Login from './Login';


function NavBar({onLogOut}) {
    
   
    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light bg-light col-8">
                    <div className="container-fluid">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/add-agent">Add Agent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/update-agent">Update Agent</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/delete-agent">Delete Agent</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="col-4">
                    <Login  onLogOut={onLogOut}/>
                </div>
            </div>


        </>
    );

}

export default NavBar;