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
                    deletePost($(' .delete-post-btn', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new ToggleLike($(' .toggle-like-btn', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            });
            $('#post-content').val("");

        });
    };

    // method to create post in DOM using AJAX

    let newPostDom = (post) => {
        return $(`
            <div class="post white-back" id="post-${post._id}">
                <div class="post-title">
                    Post Title                    
                        <small><a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a></small>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
                <div class="likes">
                    <a class="toggle-like-btn" href="/likes/toggle/?id=${post._id}&type=Post" data-likes="0">0 likes</a>
                </div>
                <div class="post-detail d-flex">
                    <div class="post-author">
                        <i class="fas fa-user"></i>
                        ${post.user.name}
                    </div>
                    <div class="post-date">
                        <i class="fas fa-calendar"></i>
                        ${new Date(post.createdAt).toDateString()}
                    </div>
                </div>
                <div class="comments-container" >
                    <div class="comment-form">
                        <h4>Add Comment</h4>
                        <form action="/comments/create" method="post" id="post-${post._id}-comment-form">
                            <input type="text"  name="content" placeholder="Add comment" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <button class="btn submit-btn" type="submit">Add</button>
                        </form>
                    </div>
                    <div class="comments" id="post-${post._id}-comments">
                    </div> 
            </div>
        `);
    };

    // method to delete the post
    let deletePost = (deleteLink) => {
        $(deleteLink).click(e => {
            e.preventDefault();

            $.ajax({
                method: 'get',
                url: $(deleteLink).prop('href'),
                success: (data) => {
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: error => {
                    console.log(error.responseText);
                }
            });
        });
    };

    let convertPostsToAjax = () => {
        $('#post-container .post').each(function () {
            let self = $(this);

            let deleteBtn = $(' .delete-post-btn', self);

            deletePost(deleteBtn);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    };

    createPost();
    convertPostsToAjax();
}