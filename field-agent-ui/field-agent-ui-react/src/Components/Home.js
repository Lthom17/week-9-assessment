import { useEffect, useState } from 'react'


function Home() {

    const [agents, setAgents] = useState([]);
    

    useEffect( () => {

        fetch( "http://localhost:8080/api/agent" )
        .then((response) => { 

            if(response.status !== 200 ){
                return Promise.reject("Agents fetch failed")
            } else {
                return response.json();
            }
        })
        .then(json => setAgents(json))
        .catch(err => console.log(err));
    }, []);

    
    return(

        <div className="row">
        <div className="col-6 mt-3" id="agent-list">
            <h2 className="displayAll">Agent List</h2>
            <ul className="list-group list-group-flush">
                {(agents.length !== 0) ? agents.map(a => 
                <li key={a.agentId} className="list-group-item">{a.lastName}, {a.firstName}</li>)        
                : <li>There are no agents to list.</li>}
            </ul>
        </div>
        </div>

    );

}

export default Home;