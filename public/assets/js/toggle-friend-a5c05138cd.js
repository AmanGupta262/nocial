function toggleFriend(){$("p a.toggle-friend-btn").click((function(e){e.preventDefault();let t=this;$.ajax({type:"POST",url:$(t).attr("href")}).done(e=>{console.log(e),e.data.isFriend?$(t).html("Remove Friend"):$(t).html("Add Friend")}).fail((function(e){console.log("error in completing the request: ",e)}))}))}toggleFriend();