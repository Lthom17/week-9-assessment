import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


function Agents({role}) {

    const [agents, setAgents] = useState([]);
    

        useEffect( () => {

            fetch( "http://localhost:8080/api/agent" )
            .then( async (response) => { 
    
                if( response.status !== 200 ){
                    return await Promise.reject("Agents fetch failed")
                } else {
                    return response.json();
                }
            })
            .then(json => setAgents(json))
            .catch(err => console.log(err));
        });
    

   
    return (


        <div className="row">
        <div className="col-6 mt-3" id="agent-list">
            <h2 className="displayAll">Agent List</h2>
            <ul className="list-group list-group-flush">
                {(agents.length !== 0) ? agents.map(a => <li key={a.agentId} className="list-group-item">{a.lastName}, {a.firstName} 
                  
               
                {role === "ROLE_ADMIN" &&  
                 
                     (<div className= "row">
                        <Link to={`/update-agent/${a.agentId}`} className="btn btn-primary ml-2 btn-sm" role="button" data-bs-toggle="button">Update</Link>
                        <Link to={`/delete-agent/${a.agentId}`} className="btn btn-danger ml-2 btn-sm" role="button">Delete</Link> 
                    
                     </div>)}
                
                </li>)
                
                : <li>There are no agents to list.</li>}
         
            </ul>
        </div>
        </div>


    )
}


export default Agents;

