import firebase from "firebase"
import 'firebase/firestore'

import { attachCustomCommands } from "cypress-firebase"

const fb = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

firebase.initializeApp(fb);

attachCustomCommands({ Cypress, cy, firebase });