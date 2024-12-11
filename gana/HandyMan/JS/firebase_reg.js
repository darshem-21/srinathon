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
  const auth = firebase.auth();

  const email = document.getElementById("emailid");
  const pass = document.getElementById("pass");
  const cpass = document.getElementById("confirm_pass");
  const name = document.getElementById("name");
  const mob = document.getElementById("mob");
  const address = document.getElementById("address");
  const pin = document.getElementById("pin");

  const button = document.getElementById("reg_btn");

  button.addEventListener("click", e => {
        e.preventDefault();
        if(name.value == "" || email.value == "" || mob.value == "" || address.value == "" || pin.value == "" || pass.value == "" || cpass.value == ""){
            window.alert("Fields can't be empty. Please try again!");
            console.log("Fields can't be empty");
        }
        else if(mob.value.length != 10){
            window.alert("Please enter a valid Mobile No.!");
            console.log("Mobile number not valid");
        }
        else if(pin.value.length != 6){
            window.alert("Please enter a valid PIN!");
            console.log("PIN not valid");
        }
        else if(pass.value != cpass.value){
            window.alert("Password not same!");
            console.log("CPASS is not same as PASS");
        }
        else{
            const promise = auth.createUserWithEmailAndPassword(email.value, pass.value)
            .then(() => {
            console.log("User Created!");
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            var user = firebase.auth().currentUser;
            var email = user.email;
            firestore.collection("Users").doc(email).set({
                name: name.value,
                email: email,
                id: user.uid,
                contact: Number(mob.value),
                address: address.value,
                pincode: Number(pin.value)
            })
            .then(() => {
                console.log("Success sent");
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
                window.location="services.html";
            })
            .catch(error => {
                console.error(error);
                window.alert(error.message);
                });
            })
            .catch(error => {
                console.error(error);
                window.alert(error.message);
            });
        }
  })