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

  var query = document.location.search;
  let user = auth.currentUser;
  const regex_mail = /mail=(.*)$/;
  var match = regex_mail.exec(query);
  const email = match[1];
  const bookingCollection = firebase.firestore().collection("Users").doc(/*"mail@mail.com"user.email*/email).collection("Bookings");

  
  var ref = document.getElementById("container");

  bookingCollection.get()
    .then(snapshot => {
        snapshot.forEach(booking => {
            let data = booking.data();

            const div_create = `
                <div class="small-box">
                <p>${data.serviceId}</p>
                <p>Date: ${data.date}</p>
                <p>Time: ${data.time}</p>
                <p>Cost: ${data.cost}</p>
                <p>Status: ${data.status}</p>
                <button id="delete_btn" value="${data.id}" onclick="remove(this.value)">Cancel Booking</button>
                </div>
                `
            ref.innerHTML += div_create;

            console.log(div_create);
        });
    });

function remove(id) {
    bookingCollection.doc(id).delete()
    .then(function() {
        console.log("Document successfully deleted!");
        window.alert("Booking cancelled!");
        window.location="mybookings.html"+query;
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
}