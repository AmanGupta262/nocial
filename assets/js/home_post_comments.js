class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comment-form`);

        this.createComment(postId);

        let self = this;

        $(' .delete-comment-btn', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let postSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = postSelf.newCommentDom(data.data.comment);
                    $(`#post-${postId}-comments`).prepend(newComment);
                    postSelf.deleteComment($(' .delete-comment-btn', newComment));

                    new Noty({
                        theme: 'relax',
                        text: 'Comment publihed!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment){
        return $(`
        <div class="comment" id="comment-${ comment._id }">
            <p>
                ${ comment.content }
            </p>
            <small>
                <a class="delete-comment-btn" href="/comments/destroy/${ comment._id }">X</a>
            </small>
            <p class="user"><i class="fas fa-user"></i>
                ${ comment.user.name }
            </p>
        </div>
        `);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax(
                {
                    type: 'get',
                    url: deleteLink.prop('href'),
                    success: function(data){
                        $(`#comment-${data.data.comment_id}`).remove();

                        new Noty({
                            theme: 'relax',
                            text: "Comment Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500

                        }).show();
                    },
                    error: function (error) {
                        console.log(error.responseText);
                    }
                }
            );
        });
    }
}