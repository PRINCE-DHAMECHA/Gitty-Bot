import React, { useEffect, useState } from 'react'




export default function Login() {


    // function loginWithGithub() {
    //     window.location.assign("https://github.com/login/oauth/authorize?client_id" + CLIENT_ID)
    // }


    useEffect(() => {


        // async function Test() {
        //     await fetch("http://localhost:5000/test", {
        //         method: "GET"
        //     })
        //         .then((response) => response.json())
        //         .then((data) => { console.log(data) });
        // }

        // Test();


        // if (codeParam && (localStorage.getItem("accessToken") === null)) {
        //     async function getAccessToken() {
        //         await fetch("http://localhost:5000/getAccessToken?code=" + codeParam, {
        //             method: "GET"
        //         }).then((response) => response.json()).then((data) => {
        //             console.log(data);
        //             if (data.access_token) {
        //                 localStorage.setItem("accessToken", data.access_token);
        //                 setRerender(!rerender);
        //             }
        //         });
        //     }
        //     getAccessToken();
        // }



    }, []);


    return (
        <div>
            <button onClick={loginWithGithub}>Login with Github</button>
        </div>
    )
}
