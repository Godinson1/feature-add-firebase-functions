const admin = require('firebase-admin');
admin.initializeApp();

const functions = require('firebase-functions');


exports.generateUuid = functions.database.instance('feature-godwin-enye').ref('/users/{UserId}')
    .onCreate((snapshot, context) => {
        console.log(snapshot.val());
        console.log(context);
        const uuidv5 = require('uuid/v5');
        const ENYE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const code = uuidv5('enye-id', ENYE);
        return snapshot.ref.update({ userId : code});
    });
