require('dotenv').config()

async function getUser(context) {
  console.log("Inside any things");
  var responseData;
  console.log(context.payload.repository.owner.login);
  try {
    const SERVER_URL = process.env["SERVER_URL"]
    const response = await fetch(
      `${SERVER_URL}username=${context.payload.repository.owner.login}`,
      {
        method: "GET",
      }
    );
    responseData = await response.json();
    console.log(response.status);
    if (response.status != 200) {
      console.log("User Not Found IG", responseData);
      return 0;
    }
  } catch (error) {
    console.log("Error in the response", error);
  }
  return responseData[0];
};


module.exports = {
  getUser
}