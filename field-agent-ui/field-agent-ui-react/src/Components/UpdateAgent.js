import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Error from './Error';
import AgentForm from './AgentForm';

function UpdateAgent() {

    const defaultAgent = {
        agentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        heightInInches: ""
    }

    const { id } = useParams();

    const [agent, setAgent] = useState(defaultAgent);
    const [error, setError] = useState('');

    const history = useHistory();


    useEffect(() => {

        const init = {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }
    
        };

        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject("Agent fetch failed")
                }
                return response.json();
            })
            .then(data => setAgent(data))
            .catch(
                response => setError(response)
            );


    }, [id]);


    function doUpdateAgent(agentToUpdate) {

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            },

            body: JSON.stringify(agentToUpdate)
        }

        fetch(`http://localhost:8080/api/agent/${id}`, init)
            .then(response => {
                if (response.status !== 204) {
                    if (response.status === 400) {
                        setError("The information that you entered is invalid.")
                    } else if (response.status === 403) {
                        setError("You do not have the appropriate permissions to complete this task.")
                    } else {
                        return Promise.reject("Response was not 200 OK");
                    }
                } else {
                    setAgent(agentToUpdate);
                    history.push("/confirmation", { msg: `${agent.lastName}, ${agent.firstName} updated` });
                }
            }
            ).catch(err => {
                setError(err);
            });
    }

    return (

        <>
            <Error msg={error} />
            <AgentForm onSubmit={doUpdateAgent} />
        </>


    )
}

export default UpdateAgent;