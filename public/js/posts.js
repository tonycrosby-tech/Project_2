const $ = window.$;
$(document).ready(() => {
  const createPost = $("#createPost");
  const usersPosting = $("#usersPosting");
  const titlePost = $("#titlePost");
  const postCategory = $("#myCategories");

  createPost.on("click", (event) => {
    event.preventDefault();

    const selectedCat = postCategory.val();
    const sendPostToServer = {
      CategoryId: selectedCat,
      title: titlePost.val().trim(),
      body: usersPosting.val().trim(),
    };

    console.log(selectedCat);
    console.log(sendPostToServer);

    if (
      sendPostToServer.CategoryId === null ||
      !sendPostToServer.title ||
      !sendPostToServer.body
    ) {
      return;
    }
    // /api/posts
    $.post("/api/posts", sendPostToServer)
      .then((result) => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

$(document).ready(function() {
  $("textarea#titlePost, textarea#usersPosting").characterCounter();
});
