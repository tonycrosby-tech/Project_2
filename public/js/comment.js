const $ = window.$;

const createComment = $("#createComment");
const userComment = $("#comments");
const postId = $("#postId");

createComment.on("click", (event) => {
  event.preventDefault();

  const postInt = postId.attr("value");

  const sendPostToServer = {
    body: userComment.val().trim(),
    postId: postInt,
  };

  console.log(postInt);
  console.log(sendPostToServer);

  if (!sendPostToServer.body) {
    return;
  }
  // /api/posts
  $.post("/api/comments", sendPostToServer)
    .then((result) => {
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
