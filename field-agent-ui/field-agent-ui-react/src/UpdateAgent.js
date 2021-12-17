import {useState} from 'react'

function UpdateAgent({selectedAgent, onUpdate}) {
    

    const [agent, setAgent] = useState(selectedAgent);
    

    const doUpdateAgent = () => {

        const url = `http://localhost:8080/api/agent/${agent.agentId}`

            const init = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
    
                body: JSON.stringify(agent)
            }

            fetch(url, init)
            .then(async response => {
                if (response.status !== 204) {
                    console.log("Agent was not created.");
                    try {
                        return await Promise.reject("response is not 204 NO_CONTENT");
                    } catch (error) {
                        return console.log(error);
                    }
                }
                return response.json();
            }).then(updatedAgent => onUpdate(updatedAgent))
            .then(console.log(`Agent ${selectedAgent} UPDATED`));;
            


    }



   
    const updateAgent = () => {

        const agentTemp = {...agent};

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
            
            <div id="collapseUpdateAgent" className="collapse">
                <h2>Update an Agent</h2>
                <form  className="was-validated align-items-center" onSubmit={doUpdateAgent}>
                    <div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor='agent_first_name' >First Name: </label>
                            <input id='agent_first_name' className="form-control" defaultValue={selectedAgent.firstName} onChange={updateAgent} required/>

                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor='agent_middle_name' >Last Name: </label>
                            <input id='agent_middle_name' className="form-control" defaultValue={selectedAgent.middleName} onChange={updateAgent} required/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor='agent_last_name' >Last Name: </label>
                            <input id='agent_last_name' className="form-control" defaultValue={selectedAgent.lastName} onChange={updateAgent} required/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor='agent_dob' >Birthdate: </label>
                            <input id='agent_dob' className="form-control" defaultValue={selectedAgent.dob} onChange={updateAgent} required/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor='agent_height' >Height(in): </label>
                            <input id='agent_height' className="form-control" defaultValue={selectedAgent.heightInInches} onChange={updateAgent} required/>
                        </div>
                        <input id="agent_id" type="hidden" defaultValue={selectedAgent.agentId}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default UpdateAgent;

