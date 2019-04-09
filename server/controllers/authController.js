const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password, isAdmin} = req.body;
        const db = req.app.get('db');
        const result = await db.get_user([username]);
        const existingUser = result[0];
        if (existingUser) {
           return res.status(409).send('Username Taken')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registered = await db.register_user([isAdmin, username, hash]);
        const user = registered[0];
        req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id}
        return res.status(201).send(req.session.user);
        
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const userFound = await db.get_user([username]);
        const user = userFound[0];
        if (!user) {
            res.status(401).send('You dont exist. please register as a new user!')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash)
        if (!isAuthenticated) {
            res.status(403).send('Wrong Password Dummy')
        }
        req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id}
        res.status(201).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
}