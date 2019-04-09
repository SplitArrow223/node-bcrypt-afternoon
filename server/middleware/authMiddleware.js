module.exports = {
    usersOnly: (req, res, next) => {
        if (!req.session.user) {
            res.status(401).send('Log in stupid')
        }
        next()
    },
    adminsOnly: (req, res, next) => {
        if(!req.session.user.isAdmin){
            res.status(403).send('youre not an admin')
        }
        next()
    }
}