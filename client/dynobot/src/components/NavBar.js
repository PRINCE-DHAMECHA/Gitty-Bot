import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export default function NavBar() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Gitty-Bot</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                        <form className="d-flex gap-3">
                            {!isAuthenticated ? (<LoginButton />) : (<LogoutButton />)}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    function handleLogin() {
        loginWithRedirect();
    }
    
    return (
        !isAuthenticated && (
            <button className="btn btn-outline-dark my-2 my-sm-0" onClick={() => loginWithRedirect()}>Sign-in</button>
        )
    )
}

function LogoutButton() {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button className='btn btn-outline-danger' onClick={() => logout()}>Sign Out</button>
        )
    )
}