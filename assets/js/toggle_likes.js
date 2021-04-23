class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(data => {
                console.log(data);
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted) {
                    likesCount -= 1;
                }
                else {
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} likes`);

            })
            .fail(function (errData) {
                console.log('error in completing the request: ', errData);
            });
        });    
    }
}