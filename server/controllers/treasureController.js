module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db');
        const treasure = await db.get_dragon_treasure(1)
        res.status(200).send(treasure)
    },
    getUserTreasure: async (req, res) => {
        const userTreasure = await req.app.get('db').get_user_treasure([
            req.session.user.id
        ])
        res.status(200).send(userTreasure)
    },
    addUserTreasure: async (req, res) => {
        const {treasureUrl} = req.body;
        const {id} = req.session.user;
        const userTreasure = await req.app.get('db')
        .add_user_treasure([treasureUrl, id])
        res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req, res) => {
        const allTreasure = await req.app.get('db').get_all_treasure()
        return res.status(200).send(allTreasure)
    }
}