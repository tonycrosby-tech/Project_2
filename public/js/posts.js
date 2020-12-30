const $ = window.$;
$(document).ready(() => {
  const createPost = $('form#formCreatePost');
  const usersPosting = $('#usersPosting');
  const titlePost = $('#titlePost');
  const postCategory = $('#myCategories');

  createPost.on('submit', event => {
    event.preventDefault();

    const selectedCat = postCategory.val();
    const sendPostToServer = {
      CategoryId: selectedCat,
      title: titlePost.val().trim(),
      body: usersPosting.val().trim()
    };

    if (sendPostToServer.CategoryId === null || !sendPostToServer.title || !sendPostToServer.body) {
      return;
    }
    // /api/posts
    $.post('/api/posts', sendPostToServer)
      .then((result) => {
        window.location.replace('/forum');
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  });
});
