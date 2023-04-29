const reactOnIssueCommentCreate = async (context) => {
  var content;
  var body = context.payload.comment.body;
  if (body.toLowerCase().includes("thank")) {
    content = "heart";
  } else if (body.toLowerCase().includes("good")) {
    content = "rocket";
  } else if (body.toLowerCase().includes("funny")) {
    content = "laugh";
  } else {
    return;
  }
  var repo = context.payload.repository.name;
  var comment_id = context.payload.comment.id;
  var owner = context.payload.repository.owner.login;
  return context.octokit.reactions.createForIssueComment({
    owner,
    repo,
    comment_id,
    content,
  });
};

const reactOnIssueCommentEdit = async (context) => {
  var content = "eyes";
  var repo = context.payload.repository.name;
  var comment_id = context.payload.comment.id;
  var owner = context.payload.repository.owner.login;
  return context.octokit.reactions.createForIssueComment({
    owner,
    repo,
    comment_id,
    content,
  });
};

const chatWithComment = async (context, userData) => {
  var body = context.payload.comment.body;

  var actions = userData.actions

  for(var i = 0; i  < actions.length; i++){
    var obj = actions[i];
    if(obj.key === body){
      const params = context.issue({
        body: obj.value,
      });
      return await context.octokit.issues.createComment(params);
    }
  }
  consoler.log("Nothing for party 🎉")
  return;
};

module.exports = {
  reactOnIssueCommentCreate,
  reactOnIssueCommentEdit,
  chatWithComment,
};
