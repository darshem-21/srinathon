$(document).on('change', '.div-toggle', function() {
    var target = $(this).data('target');
    var show = $("option:selected", this).data('show');
    $(target).children().addClass('hide');
    $(show).removeClass('hide');
  });
  $(document).ready(function(){
      $('.div-toggle').trigger('change');
  })

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
const userCollection = firebase.firestore().collection("Users");
const citiesCollection = firebase.firestore().collection("Cities");

const city_list = document.getElementById("cities");
const service_container = document.getElementById("show_list")

citiesCollection.get()
.then(snapshot => {
    snapshot.forEach(city => {

        const city_name = `
            <option value="${city.id}" data-show=".${city.id}">${city.id}</option>
            `
        const div_create = `
            <div class="${city.id} hide">
            
            <ul id="${city.id}_services"></ul>
            </div>
            `
        city_list.innerHTML += city_name;
        service_container.innerHTML += div_create;

        console.log(city_name + ' ' + div_create);
    
        citiesCollection.doc(city.id).collection("Services").get()
        .then(snapshot => {
            snapshot.forEach(types => {
                var ul_name = city.id + "_services"
                console.log(ul_name);
                const service_list = document.getElementById(ul_name);

                const type_name = `
                    <li><a href = "subservices.html?city=${city.id},service=${types.id}">${types.id}</a></li>
                     `        
                service_list.innerHTML += type_name;
                console.log(type_name);
            })
        })
        .catch(error => {
            console.log(error);
        });
    });
});


// const service_name = [];
// const list = document.getElementById("list");
// userCollection.get()
// .then(snapshot => {
//     snapshot.forEach(user => {
//         service_name.push(user.id);
//         console.log(user.id, '->', user.data());
//         console.log(service_name);

       
//     });
    
    
//     for (let i = 0; i < service_name.length; i++) {
//         const service_item = `
//         <li><a href="#"> ${service_name[i]} </a></li>
//         `;
//         list.innerHTML += service_item; 
//         }
// })
// .catch(error => {
//     console.error(error);
// });

const search = () => {
    let filter = document.getElementById('myInput').value.toUpperCase();
    let ul = document.getElementById("show_list");

    let li = ul.getElementsByTagName('li');

    for(var i = 0; i < li.length; i++)
    {
        let a = li[i].getElementsByTagName('a')[0];

        let textValue = a.textContent || a.innerText ;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = '';}
        else{
            li[i].style.display = 'none';}
    }
}