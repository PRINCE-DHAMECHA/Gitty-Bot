import React, { useEffect, useState } from 'react'

const CLIENT_ID = "5e541bf08d9cb831a009";

export default function Login() {

    const [rerender, setRerender] = useState(false);

    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id" + CLIENT_ID)
    }


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        // async function Test() {
        //     await fetch("http://localhost:5000/test", {
        //         method: "GET"
        //     })
        //         .then((response) => response.json())
        //         .then((data) => { console.log(data) });
        // }

        // Test();


        if (codeParam && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch("http://localhost:5000/getAccessToken?code=" + codeParam, {
                    method: "GET"
                }).then((response) => response.json()).then((data) => {
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                });
            }
            getAccessToken();
        }



    }, []);


    return (
        <div>
            <button onClick={loginWithGithub}>Login with Github</button>
        </div>
    )
}
