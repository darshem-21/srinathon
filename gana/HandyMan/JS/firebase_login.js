var firebaseConfig = {
    apiKey: "AIzaSyCL2v8R6NdJIIXraLLrpIpISbn-xUv5pCo",
    authDomain: "handyman-1742c.firebaseapp.com",
    databaseURL: "https://handyman-1742c.firebaseio.com",
    projectId: "handyman-1742c",
    storageBucket: "handyman-1742c.appspot.com",
    messagingSenderId: "728193362142",
    appId: "1:728193362142:web:a7b38a519c2c106ae8ba4f",
    measurementId: "G-6DDTBN6137"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const firestore = firebase.firestore();
  const email = document.getElementById("email");
  const pass = document.getElementById("password");
  const login = document.getElementById("logd");

  const auth = firebase.auth();

  //var docRef = firestore.collection("Users").doc(email.value);

  login.addEventListener("click", e => {
    e.preventDefault();

    const promise = auth.signInWithEmailAndPassword(email.value, pass.value)
    .then(() => {
        console.log("Logged in successfully");
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
        //Redirect code here
        window.location="services.html";
    })
    .catch(error => {
        console.error(error);
        window.alert(error.message);
    });
  
})


  