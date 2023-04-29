let authenticate = require('./middlewares/authenticate');

module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    
    // authenticate the user
    let response = await authenticate(context);
    if(response==0){
        return context.octokit.issues.createComment(context.issue({body: 'You are not authorized to comment on this issue'}));
    }
    else{
      // `context` extracts information from the event, which can be passed to
      // GitHub API calls. This will return:
      //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
      const params = context.issue({body: 'Hello World!'})

      // Post a comment on the issue
      return context.octokit.issues.createComment(params)
    }
    
    
  })
}
