module.export = async function getUser(context){
    // context will contain the payload of the event that was triggered
    let username = context.payload.issue.user.login;

    // fetch the user from the our application's database
    // enpoint that will return user if the user is in the database
    let response = await fetch();
    let data = await response.json();

    return data;

}
