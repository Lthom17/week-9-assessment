import { useHistory } from "react-router-dom";

function Confirmation() {
    const history = useHistory();

    return (
        <>
            <h3 className="mt-1">Confirmation</h3>
            <h5 className="mt-1">{history.location.state ? ` ${history.location.state.msg}` : ""}</h5>
        </>
    )
}

export default Confirmation;