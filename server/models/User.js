import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  issueCreate: {
    type: String,
    required: true,
  },
  issueAssign: {
    type: Boolean,
    require: true,
  },
  issueEdit: {
    type: Boolean,
    require: true,
  },
  issueAddLabel: {
    type: String,
    require: true,
  },
  issueClosedCompleted: {
    type: String,
    require: true,
  },
  issueClosedNotCompleted: {
    type: String,
    require: true,
  },
  issueReopened: {
    type: String,
    require: true,
  },
  pull_requestCreate: {
    type: String,
    require: true,
  },
  pull_requestCloseMerged: {
    type: String,
    require: true,
  },
  pull_requestClosedNotMerged: {
    type: String,
    require: true,
  },
  pull_requestReopened: {
    type: String,
    require: true,
  },
  pull_requestAddLabel: {
    type: String,
    require: true,
  },
  pull_requestAddLabelOnSynchronize: {
    type: String,
    require: true,
  },
  pull_requestListFiles: {
    type: Boolean,
    require: true,
  },
  reactOnIssueCommentCreate: {
    type: Boolean,
    require: true,
  },
  reactOnIssueCommentEdit: {
    type: Boolean,
    require: true,
  },
  actions: [
    {
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
