{let t=()=>{let t=$("#post-form");t.submit(n=>{n.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:t=>{let n=e(t.data.post);$("#post-container").prepend(n),s($(" .delete-post-btn",n)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-btn",n)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:t=>{console.log(t.responseText)}}),$("#post-content").val("")})},e=t=>$(`\n            <div class="post white-back" id="post-${t._id}">\n                <div class="post-title">\n                    Post Title                    \n                        <small><a class="delete-post-btn" href="/posts/destroy/${t._id}">X</a></small>\n                </div>\n                <div class="post-content">\n                    ${t.content}\n                </div>\n                <div class="likes">\n                    <a class="toggle-like-btn" href="/likes/toggle/?id=${t._id}&type=Post" data-likes="0">0 likes</a>\n                </div>\n                <div class="post-detail d-flex">\n                    <div class="post-author">\n                        <i class="fas fa-user"></i>\n                        ${t.user.name}\n                    </div>\n                    <div class="post-date">\n                        <i class="fas fa-calendar"></i>\n                        ${new Date(t.createdAt).toDateString()}\n                    </div>\n                </div>\n                <div class="comments-container" >\n                    <div class="comment-form">\n                        <h4>Add Comment</h4>\n                        <form action="/comments/create" method="post" id="post-${t._id}-comment-form">\n                            <input type="text"  name="content" placeholder="Add comment" required>\n                            <input type="hidden" name="post" value="${t._id}">\n                            <button class="btn submit-btn" type="submit">Add</button>\n                        </form>\n                    </div>\n                    <div class="comments" id="post-${t._id}-comments">\n                    </div> \n            </div>\n        `),s=t=>{$(t).click(e=>{e.preventDefault(),$.ajax({method:"get",url:$(t).prop("href"),success:t=>{$("#post-"+t.data.post_id).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:t=>{console.log(t.responseText)}})})},n=()=>{$("#post-container .post").each((function(){let t=$(this),e=$(" .delete-post-btn",t);s(e);let n=t.prop("id").split("-")[1];new PostComments(n)}))};t(),n()}