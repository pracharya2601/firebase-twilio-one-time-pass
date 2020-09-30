const {admin, db} = require('../utils/admin');
const twilio = require('../twilio');

module.exports = (req, res) => {
    if(!req.body.phoneNumber) {
        return res.status(422).send({error: 'Please provide phone number'})
    }
    const phone = String(req.body.phoneNumber).replace(/[^\d]/g, '');
    const phoneNumber = `${req.body.countryCode}${phone}`;

    const code = Math.floor(1000 + Math.random() * 9000);
    admin
        .auth()
        .getUserByPhoneNumber(phoneNumber)
        .then((userDetail) => {
            //send text from twilio
            return twilio.messages.create({
                    body: `Your one time code is ${code}`,
                    to: `${req.body.countryCode}${phone}`,
                    from: '+13044592460'
                }, (err) => {
                    if(err) { return res.status(422).send(err) }
                     return db.doc(`/users/${userDetail.uid}`)
                        .update({
                            code: code,
                            codeValid: true
                        })
                        .then(() => res.send({message: 'Code sent'}))
                })
        })
        .catch((err) => res.status(422).send({error: err}));


}