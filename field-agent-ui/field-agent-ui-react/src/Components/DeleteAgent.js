import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Error from './Error';


function DeleteAgent() {

    const defaultAgent = {
        agentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        heightInInches: ""
    }

    const { id } = useParams();

    const history = useHistory();

    const [agentToDelete, setAgentToDelete] = useState(defaultAgent);

    const [error, setError] = useState('');



    useEffect(() => {

        const url = `http://localhost:8080/api/agent/${id}`


        const init = {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }
        }

        fetch(url, init)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agent fetch failed")
                }
                return response.json();
            })
            .then(data => setAgentToDelete(data))
            .catch(
                err => setError(err)
            );
    }, [id]);



    const doDelete = (e) => {

        e.preventDefault();

        const url = `http://localhost:8080/api/agent/${id}`

        const init = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }

        }

        fetch(url, init)
            .then(response => {
                if (response.status !== 204) {
                    return Promise.reject("Agent not deleted!")
                }
                return response.json()
            }).then(
                history.push("/confirmation", { msg: `${agentToDelete.lastName}, ${agentToDelete.firstName} deleted` })
            ).catch(
                err => setError(err)
            );
    }

    return (
        <>
            <Error msg={error} />

            <div>

                <form className="align-items-center" onSubmit={doDelete}>
                    <div className="card mt-1" style={{ width: 18 + "rem" }}>
                        <h2 className="card-title">Delete Agent</h2>
                        <div className="card-body">
                            <div>First: {agentToDelete.firstName}</div>
                            <div>Middle: {agentToDelete.middleName}</div>
                            <div>Last: {agentToDelete.lastName}</div>
                            <div>DOB: {agentToDelete.dob}</div>
                            <div>Height (in): {agentToDelete.heightInInches}</div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-danger btn-sm m-1">Delete</button>
                            <Link to={"/"} className="btn btn-success ml-2 btn-sm" role="button">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>

        </>

    );

}

export default DeleteAgent;