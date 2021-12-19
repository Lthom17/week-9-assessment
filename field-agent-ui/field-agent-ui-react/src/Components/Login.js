import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Error from './Error';
import jwtDecode from 'jwt-decode';
import UserContext from '../Context/UserContext';
import { useContext } from "react";

function Login({ onLogOut }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);

    const history = useHistory();

    const userManager = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/security/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),

        }
        ).then(response => {

            if (response.status === 200) {
                return response.json();
            } else if (response.status === 403) {
                    return Promise.reject("Login failed");
            } else {
                    return Promise.reject("Response was not 200 OK");
                }
            } 
        ).then(parsedResponse => {

            const jwt = parsedResponse.jwt_token;

            localStorage.setItem("jwt_token", jwt);

            const userInfo = jwtDecode(jwt);

            userManager.setCurrentUser(userInfo);

            history.push("/");
        }
        ).catch(err => {
            setError(err);
        });

    };
    return (

        <div className="card p-3" >
            <h4>Login</h4>
            {
                <Error msg={error} />
            }
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="username"
                        onChange={(event) => setUsername(event.target.value)}

                    />
                </div>
                <div className="col mt-3">
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={(event) => setPassword(event.target.value)}

                    />
                </div>
                <div className="col mt-3">
                    {userManager.currentUser ? <button className="btn btn-primary btn-sm" onClick={onLogOut}>{"Log Out " + userManager.currentUser.sub}</button> : <button className="btn btn-primary btn-sm" type="submit">Login</button>}
                </div>
            </form>
        </div>

    );

}


export default Login;