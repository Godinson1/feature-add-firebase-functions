const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({origin: true});
cors(req, res, () => {});



exports.addmessage = functions.https.onRequest(async (req, res) => {
    const original = req.body;
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
  });

exports.GenerateUuid = functions.database.instance('feature-godwin-enye').ref('/messages/{UserId}')
    .onCreate((snapshot, context) => {
        console.log(snapshot.val());
        console.log(context);
        const uuidv5 = require('uuid/v5');
        const ENYE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const code = uuidv5('enye-id', ENYE);
        return snapshot.ref.update({ userId : code});
    });
