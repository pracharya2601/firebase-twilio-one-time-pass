const {admin, db} = require('../utils/admin');

module.exports = (req, res) => {
    //verify user 
    if(!req.body.phoneNumber) {
        return res.status(422).send({error: 'Wrong Input'})
    }
    //format phone number to remove dashes
    const phone = String(req.body.phoneNumber).replace(/[^\d]/g, '');

    //creating account
        admin
        .auth()
        .createUser({
            uid: req.body.uid,
            phoneNumber: `${req.body.countryCode}${phone}`,
            displayName: req.body.displayName,
        })
        .then((data) => {
            return db.doc(`/users/${data.user.uid}`).set(req.body);
        })
        .then((data) => res.send(data))
        .catch((err) => res.status(422).send({error: err}))

    //respond to the user 
}
