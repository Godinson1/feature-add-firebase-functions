const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const cors = require('cors')
const app = express()
 
app.use(cors())

app.post("/", (request, response) => {
    const entry = request.body;

    return admin.database().ref('/messages').push(entry)
        .then(() => {
            return response.status(200).send(entry)
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        });
});

exports.addmessage = functions.https.onRequest(app);


exports.GenerateUuid = functions.database.instance('feature-godwin-enye').ref('/messages/{UserId}')
    .onCreate((snapshot, context) => {
        console.log(snapshot.val());
        console.log(context);
        const uuidv5 = require('uuid/v5');
        const ENYE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const code = uuidv5('enye-id', ENYE);
        return snapshot.ref.update({ userId : code});
    });
