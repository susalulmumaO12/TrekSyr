const express = require('express');
const cors = require('cors');
const app = express();
const userAuthRoutes = require('./src/routes/userAuthRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes');
const guideRoutes = require('./src/routes/guideRoutes');
const mutualRoutes = require('./src/routes/mutualRoutes');
const connection = require('./db/config/db');
const wirelessIp = require('./get_ip');

console.log(`\nyour wifi IP address is: ${wirelessIp}`);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* app.use((req, res, next) => {
  // Allow requests from any origin (for testing, but restrict later)
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Allow specific headers (adjust as needed)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // Allow specific methods (adjust as needed)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // If it's a preflight request (OPTIONS), respond immediately
  if (req.method === 'OPTIONS') {
    res.send();
    return;
  }

  next();
}); */


app.use('/api/users', userAuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/mutual', mutualRoutes);

/* connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
 */
var admin = require("firebase-admin");
var serviceAccount = require('./treksyr-firebase-adminsdk-ljf7l-89ac3c2e14.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-notification', (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title: title,
      body: body
    },
    token: token
  };

  admin.messaging().send(message)
    .then(response => {
      console.log(response)
      res.status(200).send('Notification sent successfully: ' + response);
    })
    .catch(error => {
      res.status(500).send('Error sending notification: ' + error);
    });
});



//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Fawal\Node Projects\gitlab\trek\backend\treksyr-firebase-adminsdk-ljf7l-89ac3c2e14.json"

app.post("/submitToken", (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ message: 'no token' });
  }

  tokenArray.push(token);

  return res.status(200).json({ message: 'succcess token' });
});

const PORT = process.env.PORT || 3000;
const IP_ADDRESS = wirelessIp || '127.0.0.1';
app.listen(PORT, IP_ADDRESS, () => console.log(`Server listening at http://${IP_ADDRESS}:${PORT}`));

module.exports = connection;
