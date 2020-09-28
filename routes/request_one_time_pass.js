const {admin, db} = require('../utils/admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
    if(!req.body.phoneNumber) {
        return res.status(422).send({error: 'Please provide phone number'})
    }
    const phone = String(req.body.phoneNumber).replace(/[^\d]/g, '');
    const phoneNumber = `${req.body.countryCode}${phone}`;
    admin
        .auth()
        .getUserByPhoneNumber(phoneNumber)
        .then((userDetail) => {
            const code = Math.floor(1000 + Math.random() * 9000);
            //send text from twilio
            return twilio.message.create({
                    body: `Your one time code is ${code}`,
                    to: `${req.body.countryCode}${phone}`,
                    from: '+1304459246'
                }, (err) => {
                    if(err) { return res.status(422).send(err) }

                    db.doc(`/users/${userDetail.uid}`)
                        .update({
                            code: code,
                            codeValid: true
                        }, () => {
                            res.send({success: true})
                        })
                })
            
        })
        .catch((err) => res.status(422).send({error: err}));


}