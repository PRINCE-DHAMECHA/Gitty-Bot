import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button className='btn btn-outline-danger' onClick={() => logout()}>Sign Out</button>
        )
    )
}


