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
                    let newPost = newPostDom(data.data.post);
                    $('#post-container').prepend(newPost);
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
        });
    };

    // method to create post in DOM using AJAX

    let newPostDom = (post) => {
        return $(`
            <div class="post white-back" id="post-${ post._id }">
                <div class="post-title">
                    Post Title                    
                        <small><a class="delete-post-btn" href="/posts/destroy/${ post._id }">X</a></small>
                </div>
                <div class="post-content">
                    ${ post.content }
                </div>
                <div class="post-detail d-flex">
                    <div class="post-author">
                        <i class="fas fa-user"></i>
                        ${ post.user.name }
                    </div>
                    <div class="post-date">
                        <i class="fas fa-calendar"></i>
                        ${ new Date(post.createdAt).toDateString() }
                    </div>
                </div>
                <div class="comments-container">
                </div>
            </div>
        `);
    };

    // method to delete the post
    let deletPost = (deleteLink) => {
        $(deleteLink).click(e => {
            e.preventDefault();

            $.ajax({
                method: 'get',
                url: $(deleteLink).prop('href'),
                success: (data) => {

                },
                error: error => {
                    console.log(error.responseText);
                }
            });
        });
    };

    createPost();
}