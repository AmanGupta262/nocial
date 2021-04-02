{
    // method to submit form data for new post using AJAX
    let createPost = () => {
        let postForm = $('#post-form');
        postForm.submit(e => {
            e.preventDefault();

            $.ajax({
                type: "post",
                url: '/posts/create',
                data: postForm.serialize(),
                success: (data) => {
                    console.log(data);
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
        });
    };

    // method to create post using AJAX

    createPost();
}