import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AgentForm from './AgentForm';
import Error from './Error';



function AddAgent() {

    const dateMin = new Date();
    dateMin.setDate(dateMin.getDate());
    dateMin.setFullYear(dateMin.getFullYear() - 70);

    const dateMax = new Date();
    dateMax.setDate(dateMax.getDate());
    dateMax.setFullYear(dateMax.getFullYear() - 12);




    const [error, setError] = useState('');


    const url = "http://localhost:8080/api/agent";

    const history = useHistory();


    const doAddAgent = (agentToAdd) => {
        
        const init = {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`
            },
            body: JSON.stringify(agentToAdd)
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
                    setError(response)
                }
            }).catch(
                err => {
                    setError(err);
                }
            );

    }

    

    return (
        <>
            
            <Error msg={error} />
            
            <AgentForm onSubmit={doAddAgent}/>

        </>

    );

}

export default AddAgent;