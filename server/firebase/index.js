import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8')
  );
} else {
  serviceAccount = require('../config/fbServiceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
