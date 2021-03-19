module.exports.profile = (req, res) => {
    return res.render('profile', {title: 'Profile'});
};

module.exports.posts = (req, res) => {
    return res.render('posts', { title: 'Posts' });
};
