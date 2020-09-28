
const functions = require('firebase-functions');
const createUser = require('./routes/create_user');
const oneTimePass = require('./routes/request_one_time_pass');


exports.createUser = functions.https.onRequest(createUser);
exports.oneTimePass = functions.https.onRequest(oneTimePass);
