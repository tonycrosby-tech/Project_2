const $ = window.$;
$(document).ready(() => {
  //   // This file just does a GET request to figure out which user is logged in
  //   // and updates the HTML on the page
  const createPost = $('#createPost');
  const usersPosting = $('#usersPosting');
  const titlePost = $('#titlePost');
  const postCategory = $('#myCategories');

  createPost.on('click', event => {
    event.preventDefault();

    const selectedCat = postCategory.val();
    const sendPostToServer = {
      CategoryId: selectedCat,
      title: titlePost.val().trim(),
      body: usersPosting.val().trim()
    };

    if (sendPostToServer.CategoryId === null || !sendPostToServer.body || !sendPostToServer.title) {
      return;
    }
    // /api/posts
    $.post('/api/posts', sendPostToServer)
      .then((result) => {
        window.location.replace('/members');
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  });
});
