const {admin, db} = require('../utils/admin');

module.exports = (req, res) => {
    if(!req.body.phoneNumber || !req.body.code) {
        return res.status(422).send({error: 'Phone number and code must be provided'})
    }

    const phone = String(req.body.phoneNumber).replace(/[^\d]/g, '');
    const phoneNumber = `${req.body.countryCode}${phone}`;
    const code = parseInt(req.body.code);
    
    admin
    .auth()
    .getUserByPhoneNumber(phoneNumber)
    .then((userDetail) => {
        const userData = db.doc(`/users/${userDetail.uid}`);
        return userData
            .get()
            .then((doc) => {
                const user = doc.data();
                if(user.code !== code || !user.codeValid) {
                    res.status(422).send({error: 'code not valid'})
                } else {
                    db.doc(`/users/${userDetail.uid}`).update({
                        codeValid: false
                    })
                }
                return admin.auth().createCustomToken(phoneNumber)
            })
            .then((token) => res.send({token: token}))
    })
    .catch((error) => res.status(422).send({error: error}))

}
