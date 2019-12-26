import firebase from "react-native-firebase";
import { Collections } from "../constants";

export default class FirebaseService {
  auth = firebase.auth();
  firestore = firebase.firestore();

  userRef = this.firestore.collection(Collections.USERS);
  converstationRef = this.firestore.collection(Collections.CONVERSTATIONS);

  async signIn() {
    try {
      const response = await this.auth.signInAnonymously();
      return { user: response.user };
    } catch (error) {
      return { error };
    }
  }

  async login(name) {
    await this.userRef.onSnapshot(snapshot => {
      snapshot.forEach(el => {
        if (name == el.data().name) {
          return el.data().uid;
        }
      });
    });
  }

  async createMessage({ message, uid, idDocs }) {
    await this.converstationRef
      .doc(idDocs)
      .collection("messages")
      .add({
        message,
        uid,
        created_at: new Date()
      });
  }
}
