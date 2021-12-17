import { useState, useEffect } from 'react'
import AddAgent from './AddAgent';
import UpdateAgent from './UpdateAgent';
import DeleteAgent from './DeleteAgent';
import EmptyMessage from './EmptyMessage';

function Agents() {

    const url = "http://localhost:8080/api/agent"



    const [agents, setAgents] = useState([]);
    const [currentAgent, setCurrentAgent] = useState(
        {
            agentId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            heightInInches: ""

        }
    );




    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject("Agents fetch failed")
            } 
            return response.json();
        }
        ).then(json => setAgents(json))
        .catch(err => console.log(err));



    const addAgent = (addedAgent) => {

        const agentsTemp = [...agents];
        agentsTemp.push(addedAgent);

        setAgents(agentsTemp);
    }

    const setSelectedAgent = (e) => {

        const agentId = e.target.getAttribute("data-agentid");

        const foundAgent = agents.filter(a => a.agentId == agentId);

        setCurrentAgent(foundAgent[0]);
    }

    const updateAgent = (updatedAgent) => {

        const agentsTemp = [...agents];
        const foundAgent = agents.filter(a => a.agentId == updatedAgent.agentId);
        const agentIndex = agents.indexOf(foundAgent[0]);

        agentsTemp[agentIndex] = updatedAgent;

        setAgents(agentsTemp);

    }

    const deleteAgent = (deletedAgent) => {

        const agentsCopy = [...agents];

        const foundAgent = agents.filter(a => a.agentId == deletedAgent.agentId);
        const agentIndex = agents.indexOf(foundAgent[0]);

        setAgents(agentsCopy.splice(agentIndex, 1));

    }


    if (agents.length == 0) {
        return (
            <>
                <div className="collapse col-md" id="collapseAddAgent">
                    <AddAgent onAdd={addAgent} />
                </div>
                <EmptyMessage />
            </>
        )
    } else {

        return (
            <>

                <div id="agent-list">
                    <h2 className="displayAll">Agent List</h2>
                    <ul className="list-group list-group-flush">
                        {agents.map(a => <li key={a.agentId} className="list-group-item">{a.lastName}, {a.firstName}
                            <button type="button" className="btn btn-warning btn-sm ml-1" data-toggle="collapse" href="#collapseUpdateAgent" data-agentid={a.agentId} onClick={setSelectedAgent}>Update</button>
                            <button type="button" className="btn btn-danger btn-sm ml-1" data-toggle="collapse" href="#collapseDeleteAgent" data-agentid={a.agentId} onClick={setSelectedAgent}>Delete</button></li>)}
                    </ul>
                </div>

                <div className="col-md">
                    <UpdateAgent selectedAgent={currentAgent} onUpdate={updateAgent} />

                    <DeleteAgent selectedAgent={currentAgent} onDelete={deleteAgent} />
                </div>
            </>


        )
    }
}

export default Agents;

