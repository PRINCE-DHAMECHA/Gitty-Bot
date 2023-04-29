import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import NavBar from "./NavBar";
import { AuthContext } from "../App";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="mx-auto container-fluid col-8 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-3 rounded m-3 border-3 border-bottom" style={{ border: "1px solid #dee2e6" }}></div>
          <div className="col-md-6 rounded m-3 border-3 border-bottom p-3" style={{ border: "1px solid #dee2e6" }}>
            <div className="fw-bold mt-1">About Bot 👀</div>
            <hr />
            <p>
              Allowing users to streamline their workflows and increase productivity. One common use case for a GitHub bot is auto-commenting on issues or pull requests that are created in a repository. This can be particularly helpful for teams with large codebases or high volumes of pull
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
