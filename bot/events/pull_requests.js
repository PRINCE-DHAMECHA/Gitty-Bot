const pull_requestCreated = (context, message) => {

    let repo = context.payload.repository.name;
    let owner = context.payload.repository.owner.login;
    let pull_number = context.payload.pull_request.number;

    return context.octokit.issues.createComment({
        owner,
        repo,
        pull_number,
        message,
    });

}

const pull_requestAddLabel = (context, label) => {
    var repo = context.payload.repository.name;
    var pull_number = context.payload.pull_request.number;
    var owner = context.payload.repository.owner.login;

    return context.octokit.issues.addLabels({
        owner,
        repo,
        pull_number,
        labels: [label],
    });
}

const pull_requestReopended = async (context, message) => {

    var owner = context.payload.repository.owner.login;
    var repo = context.payload.repository.name;
    var pull_number = context.payload.pull_request.number;

    return await context.ocktokit.issues.createComment({
        owner,
        repo,
        pull_number,
        message
    });

}

const pull_requestAddLabelOnSynchronize = async (context, label) => {
    var owner = context.payload.repository.owner.login;
    var repo = context.payload.repository.name;
    var pull_number = context.payload.pull_request.number;

    return await context.octokit.issues.addLabels({
        owner,
        repo,
        pull_number,
        labels: [label],
    });
}

const pull_requestClosed = async (context, merged, notmerged) => {
    var owner = context.payload.repository.owner.login;
    var repo = context.payload.repository.name;
    var pull_number = context.payload.pull_request.number;
    var pull_state = context.payload.pull_request.merged;

    if(!pull_state){
        return await context.octokit.issues.createComment({
            owner,
            repo,
            pull_number,
            notmerged
        });
    }else{
        return await context.octokit.issues.createComment({
            owner,
            repo,
            pull_number,
            merged
        });
    }
}

const pull_requestListFiles = async (context) => {
    var repo = context.payload.repository.name;
    var pull_number = context.payload.pull_request.number;
    var owner = context.payload.repository.owner.login;

    var response = await context.octokit.pulls.listFiles({
        owner,
        repo,
        pull_number
    });

    var files = response.data;

    var body = `<table>
  <tbody>
  <tr>
  <th><a href="#">File Name</a></th>
  <th><a href="#">Status</a></th>
  <th><a href="#">Additions</a></th>
  <th><a href="#">Deletions</a></th>
  <th><a href="#">URL</a></th>
  </tr>
  `;
  for (var i = 0; i < files.length; i++) {
    var filename = files[i].filename;
    var status = files[i].status;
    var additions = files[i].additions;
    var deletions = files[i].deletions;
    var url = files[i].blob_url;
    body += `<tr>
    <td>${filename}</td>
    <td>${status}</td>
    <td>${additions}</td>
    <td>${deletions}</td>
    <td><a href="${url}">Link</a></td>
    </tr>
    `;
  }
  body += `</tbody>
  </table>`;
  var issue_number = pull_number;
  // Post a comment on requesting file details
  return await context.octokit.issues.createComment({
    owner,
    repo,
    issue_number,
    body,
  });

}

module.export = {
    pull_requestCreated,
    pull_requestAddLabel,
    pull_requestReopended,
    pull_requestAddLabelOnSynchronize,
    pull_requestListFiles,
    pull_requestClosed
}