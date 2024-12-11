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

  const form = document.querySelector('#form-message')

  form.addEventListener('submit', (e) => {
	e.preventDefault();
	firestore.collection("Feedback").doc(form.mail.value).set({
        name: form.name.value,
        email: form.mail.value,
        message: form.message.value
    })
    .then(() => {
		console.log("Success sent");
		window.alert("Thank you for your feedback!");
		})
    .catch(error => {
		console.error(error);
		window.alert(error.message);
		});

	form.reset();
  })
