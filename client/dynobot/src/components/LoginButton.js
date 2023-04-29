import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button class="btn btn-outline-dark my-2 my-sm-0" onClick={() => loginWithRedirect()}>Sign-in</button>
        )
    )
}


