

function DeleteAgent({ selectedAgent, onDelete }) {

    const url = `http://localhost:8080/api/agent/${selectedAgent.agentId}`



    const doDelete = () => {

        const init = {
            method: "DELETE"
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
            }).then(deletedAgent => onDelete(deletedAgent))
            .then(console.log(`Agent ${selectedAgent} DELETED`));

    }

    return (
        <div id="collapseDeleteAgent" className="collapse">

            <form className="align-items-center" onSubmit={doDelete}>
                <div className="card mt-1" style={{width: 18 + "rem"}}>
                    <h2 className="card-title">Delete Agent</h2>
                    <div className="card-body">
                        <div>First: {selectedAgent.firstName}</div>
                        <div>Middle: {selectedAgent.middleName}</div>
                        <div>Last: {selectedAgent.lastName}</div>
                        <div>DOB: {selectedAgent.dob}</div>
                        <div>Height (in): {selectedAgent.heightInInches}</div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-danger btn-sm m-1">Delete</button>
                        <button type="button" className="btn btn-success btn-sm m-1" data-toggle="collapse" href="#collapseDeleteAgent" >Cancel</button>
                    </div>
                </div>
            </form>
        </div>


    );

}

export default DeleteAgent;