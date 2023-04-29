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

module.exports = {
  reactOnIssueCommentCreate,
  reactOnIssueCommentEdit,
};
