import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Error from './Error';



function AddAgent() {

    const dateMin = new Date();
    dateMin.setDate(dateMin.getDate());
    dateMin.setFullYear(dateMin.getFullYear() - 70);

    const dateMax = new Date();
    dateMax.setDate(dateMax.getDate());
    dateMax.setFullYear(dateMax.getFullYear() - 12);




    const [error, setError] = useState([]);


    const url = "http://localhost:8080/api/agent";


    const defaultAgent = {
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        heightInInches: ""
    }


    const [agent, setAgent] = useState(defaultAgent);

    const history = useHistory();


    const doAddAgent = (e) => {
        e.preventDefault();

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
                    setError(err);
                }
            );

    }




    const updateAgentFirst = (e) => {

        const agentToAdd = { ...agent };

        agentToAdd.firstName = e.target.value;

        setAgent(agentToAdd);

    }


    const updateAgentMiddle = (e) => {

        const agentToAdd = { ...agent };

        agentToAdd.middleName = e.target.value;

        setAgent(agentToAdd);
    }

    const updateAgentLast = (e) => {

        const agentToAdd = { ...agent };

        agentToAdd.lastName = e.target.value;

        setAgent(agentToAdd);
    }


    const updateAgentDOB = (e) => {

        const agentToAdd = { ...agent };

        agentToAdd.dob = e.target.value;

        setAgent(agentToAdd);
    }

    const updateAgentHeight = (e) => {

        const agentToAdd = { ...agent };

        agentToAdd.heightInInches = parseInt(e.target.value);

        setAgent(agentToAdd);
    }




    return (
        <div>
            <h2>Add an Agent</h2>
            {
                <Error msg={error} />
            }
            <form className="was-validated align-items-center" onSubmit={(e) => doAddAgent(e)} >
                <div className="col-md-4 mb-3">
                    <label className="col-form-label pr-1" htmlFor='add_first_name' >First Name: </label>
                    <input id='add_first_name' className="form-control" value={agent.firstName} onChange={updateAgentFirst} required />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="col-form-label pr-1" htmlFor='add_middle_name' >Middle Name: </label>
                    <input id='add_middle_name' className="form-control" value={agent.middleName} onChange={updateAgentMiddle} required />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="col-form-label pr-1" htmlFor='add_last_name' >Last Name: </label>
                    <input id='add_last_name' className="form-control" value={agent.lastName} onChange={updateAgentLast} required />
                </div>

                <div className="col-md-4 mb-3">
                    <label className="row-form-label pr-1" htmlFor='add_dob' >Birthdate: </label>
                    <input id='add_dob' className="form-control" type="date" max={dateMax} min={dateMin} value={agent.dob} onChange={updateAgentDOB} required />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="row-form-label pr-1" htmlFor='add_height' >Height (in): </label>
                    <input id='add_height' className="form-control" value={agent.heightInInches} onChange={updateAgentHeight} required />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>


    );

}

export default AddAgent;