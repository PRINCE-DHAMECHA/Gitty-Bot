import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactSwitch from "react-switch";
import axios from "axios";
const context = [
  "issueCreate",
  "issueAssign",
  "issueEdit",
  "issueAddLabel",
  "issueClosedCompleted",
  "issueClosedNotCompleted",
  "issueReopened",
  "pull_requestCreate",
  "pull_requestClosedNotMerged",
  "pull_requestCloseMerged",
  "pull_requestReopened",
  "pull_requestAddLabel",
  "pull_requestAddLabelOnSynchronize",
  "pull_requestListFiles",
  "reactOnIssueCommentCreate",
  "reactOnIssueCommentEdit",
];
export default function Home() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({});
  const [currentState, setCurrentState] = useState("issueCreate");
  const [checked, setChecked] = useState(true);
  const [booleanVal, setBooleanVal] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [newContent, setNewContent] = useState(false);
  const [loading, setloading] = useState(true);

  
  console.log(user);

  const authFetch = axios.create({
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    console.log("Request goes", user)
    const getData = async () => {
      try {
        const userDataTemp = await authFetch.get(
          "/user/get?username=j-imy"
        );
        console.log(userDataTemp.data[0]);
        setUserData(userDataTemp.data[0]);
      } catch (e) {
        console.log(e);
      }
      setloading(false);
    };
    getData();
  }, []);



  const handleUpdate = async (e) => {

    // console.log(user.nickname);

    if (
      currentState === "issueAssign" ||
      currentState === "issueEdit" ||
      currentState === "pull_requestListFiles" ||
      currentState === "reactOnIssueCommentCreate" ||
      currentState === "reactOnIssueCommentEdit"
    ) {
      console.log(checked);
      const res = await authFetch.post("/user/update", {
        action: currentState,
        message: checked,
        username: "j-imy",
      });
    } else {
      const res = await authFetch.post("/user/update", {
        action: currentState,
        message: newContent,
        username: "j-imy",
      });
    }
    const getData = async () => {
      try {
        const userDataTemp = await authFetch.get(
          "/user/get?username=j-imy"
        );
        console.log(userDataTemp.data[0]);
        setUserData(userDataTemp.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
    setIsChange(false);
  };
  console.log(booleanVal);
  return (
    <>
      <div className="mx-auto container-fluid col-8 mt-5">
        <div className="row justify-content-center">
          <div
            className="col-md-3 rounded m-3 border-3 border-bottom"
            style={{ border: "1px solid #dee2e6" }}
          >
            <img className="w-100 rounded" src="https://user-images.githubusercontent.com/132129890/235353963-93092806-5674-4468-a679-4b6fa30d5bca.png" />
          </div>
          <div
            className="col-md-6 rounded m-3 border-3 border-bottom p-3"
            style={{ border: "1px solid #dee2e6" }}
          >
            <div className="fw-bold mt-1">About Bot 👀</div>
            <hr />
            <p>
              Allowing users to streamline their workflows and increase
              productivity. One common use case for a GitHub bot is
              auto-commenting on issues or pull requests that are created in a
              repository. This can be particularly helpful for teams with large
              codebases or high volumes of pull
            </p>
          </div>
        </div>
        <div className="text-center mt-5">
          <p>Select Action</p>
          <select
            className="form-select form-select-md mb-3 w-50 m-auto"
            aria-label=".form-select-lg example"
            onChange={(e) => {
              setCurrentState(e.target.value);
              if (
                e.target.value === "issueAssign" ||
                e.target.value === "issueEdit" ||
                e.target.value === "pull_requestListFiles" ||
                e.target.value === "reactOnIssueCommentCreate" ||
                e.target.value === "reactOnIssueCommentEdit"
              ) {
                setBooleanVal(true);
              } else {
                setBooleanVal(false);
              }
              console.log(e.target.value);
            }}
          >
            {context && context.map((e, i) => {
              return <option key={i}>{e}</option>;
            })}
          </select>
          {booleanVal ? (
            <ReactSwitch
              checked={userData[currentState]}
              onChange={(e) => {
                setChecked((userData[currentState] = !userData[currentState]));
                setIsChange(true);
              }}
            />
          ) : (
            <textarea
              className="form-control w-50 m-auto"
              id="exampleFormControlTextarea3"
              rows="6"
              value={userData[currentState]}
              onChange={(e) => {
                setIsChange(true);
                setNewContent(e.target.value);
                userData[currentState] = e.target.value;
                setIsChange(true);
              }}
            ></textarea>
          )}
          <div className="block">
            <button
              className="block mt-2 btn btn-outline-primary"
              onClick={handleUpdate}
              disabled={isChange ? false : true}
            >
              Update
            </button>
          </div>
        </div>
        {!loading && (
          <div className="text-center mt-5">
            <p>Select Action</p>
            <select
              className="form-select form-select-md mb-3 w-50 m-auto"
              aria-label=".form-select-lg example"
              onChange={(e) => {
                // setCurrentStateMessage(e.target.value);
              }}
            >
              {userData.actions && userData.actions.map((e, i) => {
                return <option key={i}>{e.key}</option>;
              })}
            </select>
            {/* <textarea value={userData.actions[]}></textarea> */}
          </div>
        )}
      </div>
    </>
  );
}
