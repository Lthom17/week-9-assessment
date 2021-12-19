import { Link } from 'react-router-dom';
import Login from './Login';
import UserContext from '../Context/UserContext';
import { useContext } from "react";



function NavBar({ onLogOut }) {

    const userManager = useContext(UserContext);

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
                    {userManager.currentUser ? <button className="btn btn-primary btn-sm" onClick={onLogOut}>{"Log Out " + userManager.currentUser.sub}</button>
                        :
                        
                            <Login/>
                        
                    }
                </div>
            </div>


        </>
    );

}

export default NavBar;