$('.datepicker').datepicker();
$('.timepicker').timepicker();

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

  var query = document.location.search;

  // To replace %20 with spaces
  const regex = /%20/;
  var match = regex.exec(query);
  while(match){
      query = query.replace(/%20/, ' ');
      match = regex.exec(query);
  }
  
  //Declaring extraction regex strings
  const regex_city = /city=(\w+)\,/;
  const regex_service = /service=(.*)\,/;
  const regex_subservice = /subservice=(.*)$/;
  
  var match = regex_city.exec(query);
  const city = match[1];

  var match = regex_service.exec(query);
  const service = match[1];

  var match = regex_subservice.exec(query);
  const subservice = match[1];

  const costCollection = firebase.firestore().collection("Cities").doc(city).collection("Services").doc(service).collection("Service").doc(subservice);
  const firestore = firebase.firestore();
  const auth = firebase.auth();

  var cost;
  costCollection.get()
  .then((snapshot) => {
        console.log(snapshot.data());
        cost = snapshot.data().cost;
        cost_display.innerText += cost;
        console.log(cost);
  })

  const service_head = document.getElementById("service-head");
  const service_description = document.getElementById("description");
  const cost_display = document.getElementById("cost");

  service_head.innerHTML += service;
  service_description.innerHTML += subservice;


 
  const button = document.getElementById("confirm_btn");

  button.addEventListener("click", e => {
        e.preventDefault();
        let user = auth.currentUser;
        const date = document.getElementById("date");
        const time = document.getElementById("time");

        if(date.value == "" || time.value == ""){
            window.alert("Fields can't be empty. Please try again!");
            console.log("Fields can't be empty");
        }else{
            console.log(date.value)
            console.log(time.value)

            const uid = firestore.collection(" ").doc().id;

        firestore.collection("Users").doc(user.email).collection("Bookings").doc(uid).set({
            date: date.value,
            time: time.value,
            price: cost,
            serviceId: subservice,
            id: uid,
            status: "Pending"

        })
        .then(() => {
            console.log("Booking Confirmed");
            window.alert("Booking Confirmed");
            let site = `
            mybookings.html?mail=${user.email}
            `
            window.location=site;
            })
        .catch(error => {
            console.error(error);
            window.alert(error.message);
            });
        }
        
  })

  
