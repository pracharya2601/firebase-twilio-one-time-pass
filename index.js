
const functions = require('firebase-functions');
const createUser = require('./routes/create_user');
const oneTimePass = require('./routes/request_one_time_pass');
const verifyPass = require('./routes/verify_pass');


exports.createUser = functions.https.onRequest(createUser);
exports.oneTimePass = functions.https.onRequest(oneTimePass);
exports.verifyPass = functions.https.onRequest(verifyPass);
