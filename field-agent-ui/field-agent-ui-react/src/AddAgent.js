import { useState } from 'react'



function AddAgent({onAdd}) {

    const url = "http://localhost:8080/api/agent";

    


    const defaultAgent = {
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        heightInInches: ""
    }


    const [agent, setAgent] = useState(defaultAgent);
    
    
    const doAddAgent = (e) => {
        e.preventDefault();
        
        const init = {
           
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(agent)
            };
        

        

        fetch(url, init)
            .then(async response => {
                if (response.status !== 201) {
                    console.log("Agent was not created.");
                    try {
                        return await Promise.reject("response is not 200 OK");
                    } catch (error) {
                        return console.log(error);
                    }
                }
                return response.json();
            }).then(addedAgent => onAdd(addedAgent));
            

            
    }


    
    
    const updateAgentFirst = (e) => {

        const agentToAdd = {...agent};

        agentToAdd.firstName = e.target.value; 

        setAgent(agentToAdd);
         
    }

    
    const updateAgentMiddle = (e) => {

        const agentToAdd = {...agent};

        agentToAdd.middleName = e.target.value; 

        setAgent(agentToAdd);
    }

    const updateAgentLast = (e) => {

        const agentToAdd = {...agent};

        agentToAdd.lastName = e.target.value; 

        setAgent(agentToAdd);
    }


    const updateAgentDOB = (e) => {

        const agentToAdd = {...agent};

        agentToAdd.dob = e.target.value; 

        setAgent(agentToAdd);
    }

    const updateAgentHeight = (e) => {

        const agentToAdd = {...agent};

        agentToAdd.heightInInches = parseInt(e.target.value); 

        setAgent(agentToAdd);
    }


    const dateMax = new Date();
    dateMax.setDate( dateMax.getDate());
    dateMax.setFullYear( dateMax.getFullYear() - 12);
    
    const dateMin = new Date();
    dateMin.setDate( dateMin.getDate());
    dateMin.setFullYear( dateMin.getFullYear() - 70);


    return (
        <div>
            <h2>Add an Agent</h2>
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