const $ = window.$;
$(document).ready(() => {
    createCategoryButton = $('#createCategoryButton');
    textareaCategory = $('#textareaCategory');

    createCategoryButton.on('click', event => {
        event.preventDefault();

        const sendToCategoryCreate = {
            name: textareaCategory.val().trim()
        };

        $.post('/api/category', sendToCategoryCreate)
            .then((result) => {
                // window.location.replace('/forum');
                location.reload();
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    });
});
