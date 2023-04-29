module.export = async function getUser(context) {
  console.log("Inside any things");
  var responseData;
  console.log(context.payload.repository.owner.login);
  try {
    const response = await fetch(
      `https://git-greeter-server.vashishth-patel.repl.co/api/user/frombot?username=${context.payload.repository.owner.login}`,
      {
        method: "GET",
      }
    );
    responseData = await response.json();
    console.log(response.status);
    if (response.status != 201) {
      console.log("User Not Found IG", responseData);
      return 0;
    }
  } catch (error) {
    console.log("Error in the response", error);
  }
  return responseData;
};
