import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddAgent from './AddAgent';
import Error from './Error';

function UpdateAgent({ onUpdate }) {

    const { id } = useParams();

    const [agent, setAgent] = useState(
        {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            heightInInches: ""
        }
    );
    
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/agent/${id}`)
                .then(response => {
                    if (response.status !== 200) {
                        return Promise.reject("Agent fetch failed")
                    }
                    return response.json();
                })
                .then(data => setAgent(data))
                .catch(
                    response => setError(response[0])
                );

        }
    },
        [id]
    );




    const doUpdateAgent = () => {

        const url = `http://localhost:8080/api/agent/${id}`

        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            },

            body: JSON.stringify(agent)
        }

        fetch(url, init)
            .then(async response => {
                if (response.status === 204 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject("Response was not 204 NO_CONTENT");
                }

            }).then(response => {
                if (response) {
                    setError(response[0])
                } else {
                    onUpdate(agent);
                }
            }).catch(
                err => {
                    setError(err);
                }
            );

    }




    const updateAgent = () => {

        const agentTemp = { ...agent };

        agentTemp.agentId = parseInt(document.getElementById("agent_id").value);
        agentTemp.firstName = document.getElementById("agent_first_name").value;
        agentTemp.middleName = document.getElementById("agent_middle_name").value;
        agentTemp.lastName = document.getElementById("agent_last_name").value;
        agentTemp.dob = document.getElementById("agent_dob").value;
        agentTemp.heightInInches = parseInt(document.getElementById("agent_height").value);


        setAgent(agentTemp);

    }

    return (

        <div>
            <h2>Update an Agent</h2>
            {
                <Error msg={error} />
            }
            <form className="was-validated align-items-center" onSubmit={doUpdateAgent}>
                <div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_first_name' >First Name: </label>
                        <input id='agent_first_name' className="form-control" defaultValue={agent.firstName} onChange={updateAgent} required />

                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_middle_name' >Last Name: </label>
                        <input id='agent_middle_name' className="form-control" defaultValue={agent.middleName} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_last_name' >Last Name: </label>
                        <input id='agent_last_name' className="form-control" defaultValue={agent.lastName} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_dob' >Birthdate: </label>
                        <input id='agent_dob' className="form-control" defaultValue={agent.dob} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_height' >Height(in): </label>
                        <input id='agent_height' className="form-control" defaultValue={agent.heightInInches} onChange={updateAgent} required />
                    </div>
                    <input id="agent_id" type="hidden" defaultValue={agent.agentId} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAgent;

