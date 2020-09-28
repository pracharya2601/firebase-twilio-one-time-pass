const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onetime-password-53939.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin, db};