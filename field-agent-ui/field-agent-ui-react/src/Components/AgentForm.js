import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Error from './Error';




function AgentForm({ onSubmit }) {

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

    const [agentToUpdate, setAgentToUpdate] = useState(defaultAgent);
    const [error, setError] = useState('');




    useEffect(() => {

        const init = {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            }

        };

        if (id) {
            fetch(`http://localhost:8080/api/agent/${id}`, init)
                .then(response => {
                    if (response.status !== 200) {
                        return Promise.reject("Agent fetch failed")
                    }
                    return response.json();
                })
                .then(data => setAgentToUpdate(data))
                .catch(
                    response => setError(response)
                );

        };
    }, [id]);


    function handleSubmit(event) {
        event.preventDefault();

        onSubmit(agentToUpdate);
    }

    const updateAgent = () => {

        const agentTemp = { ...agentToUpdate };

        const idNum = document.getElementById("agent_id").value;
        
        if(idNum){
            agentTemp.agentId = parseInt(idNum);
        }else {
            agentTemp.agentId = ""
        }
       // agentTemp.agentId = parseInt(document.getElementById("agent_id").value);
        agentTemp.firstName = document.getElementById("agent_first_name").value;
        agentTemp.middleName = document.getElementById("agent_middle_name").value;
        agentTemp.lastName = document.getElementById("agent_last_name").value;
        agentTemp.dob = document.getElementById("agent_dob").value;

        const height = document.getElementById("agent_height").value;
        
        if(height){
            agentTemp.heightInInches = parseInt(height);
        }else {
            agentTemp.heightInInches = "";
        }

        //agentTemp.heightInInches = parseInt(document.getElementById("agent_height").value);


        setAgentToUpdate(agentTemp);

    }



    return (

        <div>
            <h2>{agentToUpdate.agentId ? "Update Agent" : "Add An Agent"}</h2>

            <Error msg={error} />

            <form className="was-validated align-items-center" onSubmit={handleSubmit}>
                <div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_first_name' >First Name: </label>
                        <input id='agent_first_name' className="form-control" defaultValue={agentToUpdate.firstName} onChange={updateAgent} required />

                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_middle_name' >Middle Name: </label>
                        <input id='agent_middle_name' className="form-control" defaultValue={agentToUpdate.middleName} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_last_name' >Last Name: </label>
                        <input id='agent_last_name' className="form-control" defaultValue={agentToUpdate.lastName} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_dob' >Birthdate: </label>
                        <input id='agent_dob' className="form-control" type="date" max={dateMax} min={dateMin} defaultValue={agentToUpdate.dob} onChange={updateAgent} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor='agent_height' >Height(in): </label>
                        <input id='agent_height' className="form-control" type="number" defaultValue={agentToUpdate.heightInInches} onChange={updateAgent} required />
                    </div>
                    <input id="agent_id" type="hidden" defaultValue={agentToUpdate.agentId} />
                </div>
                <div>
                    <button className="btn btn-primary ml-2 btn-sm" type="submit">Submit</button>
                    <Link to={"/"} className="btn btn-danger ml-2 btn-sm" role="button">Cancel</Link>
                </div>
            </form>

        </div>

    );

}

export default AgentForm;