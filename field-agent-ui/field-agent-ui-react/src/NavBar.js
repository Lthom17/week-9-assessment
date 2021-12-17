

function NavBar() {
    return (
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" href="index.html">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" data-toggle="collapse" href="#collapseAddAgent">Add Agent</a>
            </li>
        </ul>
    );

}

export default NavBar;