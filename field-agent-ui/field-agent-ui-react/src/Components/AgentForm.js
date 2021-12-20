import { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom';
import Error from './Error';



function AgentForm() {

    const dateMin = new Date();
    dateMin.setDate(dateMin.getDate());
    dateMin.setFullYear(dateMin.getFullYear() - 70);

    const dateMax = new Date();
    dateMax.setDate(dateMax.getDate());
    dateMax.setFullYear(dateMax.getFullYear() - 12);

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
    const [agentToUpdate, setAgentToUpdate] = useState(defaultAgent);
    const [error, setError] = useState('');

    const history = useHistory();


    const url = "http://localhost:8080/api/agent";

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

        };
    });

    function handleSubmit(event) {

        event.preventDefault();

        if (id) {

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
                    if( response.status !== 204 ){
                        if(response.status === 400){
                            setError("The information that you entered is invalid.")
                        } else if(response.status === 403) {
                            setError("You do not have the appropriate permissions to complete this task.")
                        }   
                    } else {

                        history.push( "/confirmation", { msg: `${agentToUpdate.lastName}, ${agentToUpdate.firstName} updated` });
                    }
                }
            );

        } else {

            const init = {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
                },
                body: JSON.stringify(agent)
            };

            fetch(url, init)
                .then(response => {
                    if (response.status === 201 || response.status === 400) {
                        return response.json();
                    } else {
                        return Promise.reject("Response was not 200 OK");
                    }

                }).then(response => {
                    if (response.agentId) {
                        history.push("/")
                    } else {
                        setError(response[0])
                    }
                }).catch(
                    err => {
                        setError(err[0]);
                    }
                );

        }

    }


    const updateAgent = () => {

        const agentTemp = { ...agent };

        agentTemp.agentId = parseInt(document.getElementById("agent_id").value);
        agentTemp.firstName = document.getElementById("agent_first_name").value;
        agentTemp.middleName = document.getElementById("agent_middle_name").value;
        agentTemp.lastName = document.getElementById("agent_last_name").value;
        agentTemp.dob = document.getElementById("agent_dob").value;
        agentTemp.heightInInches = parseInt(document.getElementById("agent_height").value);


        setAgentToUpdate(agentTemp);

    }



    return (

        <div>
            <h2>{agent.agentId ? "Update Agent" : "Add An Agent"}</h2>
            {
                <Error msg={error} />
            }
            <form className="was-validated align-items-center" onSubmit={handleSubmit}>
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
                        <input id='agent_dob' className="form-control" type="date" max={dateMax} min={dateMin} defaultValue={agent.dob} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_height' >Height(in): </label>
                        <input id='agent_height' className="form-control" defaultValue={agent.heightInInches}  onChange={updateAgent} required />
                    </div>
                    <input id="agent_id" type="hidden" defaultValue={agent.agentId} />
                </div>
                <div>
                    <button className="btn btn-primary ml-2 btn-sm"  type="submit">Submit</button>
                    <Link to={"/"} className="btn btn-danger ml-2 btn-sm" role="button">Cancel</Link>
                </div>
            </form>
        </div>

    );
}

export default AgentForm;