let authenticate = require("./middlewares/authenticate");
var issueController = require("./events/issues");
var commentController = require("./events/comments");
var pull_requestController = require("./events/pull_requests");

module.exports = (app) => {
  // Your code here
  app.log("Yay! The app was loaded!");

  // on opening the issue
  app.on("issues.opened", async (context) => {
    var userObject = await authenticate(context);
    if (userObject == 0) {
      return;
    }
    var issueGreetMessage = userObject.issueCreate
    var issueAddLabel = userObject.issueAddLabel
    await issueController.issueCreate(context, issueGreetMessage);
    return await issueController.issueAddLabel(context, issueAddLabel)
  });




  app.on("pull_request.opened", async (context) => {
    var userObject = await authenticate(context);
    if(userObject == 0){
      return;
    }
    var pull_requestCreateMessage = userObject.pull_requestCreate
    var pull_requestAddLabel = userObject.pull_requestAddLabel
    await pull_requestController.pull_requestCreated(context, pull_requestCreateMessage);
    return pull_requestController.pull_requestAddLabel(context, pull_requestAddLabel);
    
  });

  app.on("pull_request.synchronize", async (context) => {
    var userObject = await authenticate(context);
    if(userObject == 0){
      return;
    }
    var pull_requestAddLabelOnSynchronize = userObject.pull_requestAddLabelOnSynchronize
    return await pull_requestController.pull_requestAddLabelOnSynchronize(context, pull_requestAddLabelOnSynchronize);
  });
  
  app.on("pull_request.reopened", async (context) => {
    var userObject = await authenticate(context);
    if(userObject == 0){
      return;
    }
    var pull_requestReopended = userObject.pull_requestReopended
    return await pull_requestController.pull_requestReopended(context, pull_requestReopended);
  });

  app.on("issue_comment.created",async (context) => {
    var userObject = await authenticate(context);
    if(userObject == 0){
      return;
    }
    var comment = context.payload.comment.body;
    if(comment == "/list"){
      return await pull_requestController.pull_requestListFiles(context);
    }
  });

  app.on("pull_request.closed", async (context) => {
    var userObject = await authenticate(context);
    if(userObject == 0){
      return;
    }
    var pull_requestCloseMerged = userObject.pull_requestCloseMerged
    var pull_requestClosedNotMerged = userObject.pull_requestClosedNotMerged
    return await pull_requestController.pull_requestClosed(context, pull_requestCloseMerged,pull_requestClosedNotMerged);
  });

};
