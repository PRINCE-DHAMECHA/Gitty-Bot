let getUser = require("./middlewares/authenticate");
let issueController = require("./events/issues");
let commentController = require("./events/comments");
let pull_requestController = require("./events/pull_requests");

module.exports = (app) => {
  // Your code here
  app.log("Yay! The app was loaded!");

  // done
  app.on("issues.opened", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    var issueGreetMessage = userObject.issueCreate;
    var issueAddLabel = userObject.issueAddLabel;
    console.log(issueGreetMessage, " ", issueAddLabel);
    await issueController.issueCreate(context, issueGreetMessage);
    return await issueController.issueAddLabel(context, issueAddLabel);
  });

  // done
  app.on("issues.edited", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    if(userObject.issueEdit)
      return await issueController.issueEdit(context);
  });
  // done
  app.on("issues.closed", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }

    var issueClosedCompleted = userObject.issueClosedCompleted
    var issueClosedNotCompleted = userObject.issueClosedNotCompleted
    return await issueController.issueClose(context, issueClosedCompleted, issueClosedNotCompleted);
  })
  // done
  app.on("issues.reopened", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }

    var issueReopened = userObject.issueReopened
    return await issueController.issueReopened(context, issueReopened);
  })


  // done
  app.on("pull_request.opened", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    var pull_requestCreateMessage = userObject.pull_requestCreate;
    var pull_requestAddLabel = userObject.pull_requestAddLabel;
    await pull_requestController.pull_requestCreated(
      context,
      pull_requestCreateMessage
    );
    return pull_requestController.pull_requestAddLabel(
      context,
      pull_requestAddLabel
    );
  });

  // done
  app.on("pull_request.closed", async (context) => {
    var getData = await getUser.getUser(context);
    if (getData == 0) {
      return;
    }
    var MessageMerged = getData.pull_requestCloseMerged;
    var MessageNot = getData.pull_requestClosedNotMerged;
    return await pull_requestController.pull_requestClosed(
      context,
      MessageMerged,
      MessageNot
    );
  });

  // done
  app.on("pull_request.synchronize", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    var pull_requestAddLabelOnSynchronize =
      userObject.pull_requestAddLabelOnSynchronize;
    return await pull_requestController.pull_requestAddLabelOnSynchronize(
      context,
      pull_requestAddLabelOnSynchronize
    );
  });

  // done
  app.on("pull_request.reopened", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    try {
      // console.log(userObject);
      // console.log(context.payload.number)
      var pull_requestReopended = userObject.pull_requestReopened;
      return await pull_requestController.pull_requestReopened(
        context,
        pull_requestReopended
      );
    } catch (error) {
      console.log(error);
    }
  });

  // done
  app.on("issue_comment.created", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    var comment = context.payload.comment.body;
    if (comment == "/assign") {
      if (userObject.issueAssign)
        return await issueController.issueAssign(context);
      else return;
    } else if (comment == "/list") {
      if (userObject.pull_requestListFiles)
        return await pull_requestController.pull_requestListFiles(context);
      else return;
    } else {
      if (userObject.reactOnIssueCommentCreate)
        await commentController.reactOnIssueCommentCreate(context);
      // chatting with bot ->:)
      return await commentController.chatWithComment(context, userObject);
    }
  });

  // done
  app.on("issue_comment.edited", async (context) => {
    var userObject = await getUser.getUser(context);
    if (userObject == 0) {
      return;
    }
    if (userObject.reactOnIssueCommentEdit)
      return await commentController.reactOnIssueCommentEdit(context);
    else return;
  });
};
