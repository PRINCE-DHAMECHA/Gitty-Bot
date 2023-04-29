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

const pull_requestAddLabel = (context,label) =>{
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

module.export = {
    pull_requestCreated,
    pull_requestAddLabel
}