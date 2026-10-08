
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAioI03-rVA4RZ_DPMlO1YRbYP-qvDLQjY",
  authDomain: "netflix-clone-fb183.firebaseapp.com",
  projectId: "netflix-clone-fb183",
  storageBucket: "netflix-clone-fb183.firebasestorage.app",
  messagingSenderId: "1073696699107",
  appId: "1:1073696699107:web:4b1ae5112987cfbd8a8bd6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authprovider:"local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}
const logout = ()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout};