function toggleFriend(){
    $('p a.toggle-friend-btn').click(function(e) {
        e.preventDefault();
        let self = this;
        $.ajax({
            type: 'POST',
            url: $(self).attr('href')
        })
        .done(data => {
            console.log(data);
            if(data.data.isFriend)
                $(self).html('Remove Friend');
            else
                $(self).html('Add Friend');
        })
        .fail(function (errData) {
            console.log('error in completing the request: ', errData);
        });
    });
}

toggleFriend();