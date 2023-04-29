import React from "react";
import logo from "../utils/52.jpg";
const Home = () => {
  return (
    <div className="d-flex m-auto h-100">
      <div className="m-auto">
        <div
          class="card text-white bg-primary mb-3"
          style={{ maxWidth: "20rem" }}
        >
          <div class="card-header">Header</div>
          <div class="card-body">
            <img className="w-100 h-auto" src={logo}></img>
          </div>
        </div>
        <div
          class="card text-white bg-primary mb-3"
          style={{ maxWidth: "30rem" }}
        >
          <div class="card-header">Header</div>
          <div class="card-body">
            <img className="w-100 h-auto" src={logo}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
