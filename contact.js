//Used to Grab onto Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBPrQyiVKOAXEFBPICM8hFqmHh7qoMwOIY",
    authDomain: "contactform-6a9c3.firebaseapp.com",
    databaseURL: "https://contactform-6a9c3.firebaseio.com",
    projectId: "contactform-6a9c3",
    storageBucket: "contactform-6a9c3.appspot.com",
    messagingSenderId: "1023650006979",
    appId: "1:1023650006979:web:9e352d6914da76583edf76",
    measurementId: "G-1TRZJGL20M"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Start Grabbing the DOM Element
const submitBtn = document.querySelector("#submit");

let userName = document.querySelector("#userFullName");
let userEmail = document.querySelector("#userEmail");
let userMessage = document.querySelector("#userMessage");

const db = firestore.collection("contactData");

submitBtn.addEventListener('click', function() {
    let userNameInput = userName.value;
    let userEmailInput = userEmail.value;
    let userMessageInput = userMessage.value;

    if (userNameInput === '' || userEmailInput === '' || userMessageInput === '') {
        document.getElementById("error-alert").style.display = "block";
        document.getElementById("success-alert").style.display = "none";
    } else {
        document.getElementById("success-alert").style.display = "block";
        document.getElementById("error-alert").style.display = "none";
    }

    //Access the Database Collection
    db.add({
        name: userNameInput,
        email: userEmailInput,
        message: userMessageInput,
    }).then(function() {
        // document.getElementById("success-alert").style.display = "block";
        console.log("Data Saved");
    }).catch(function(error) {
        // document.getElementById("error-alert").style.display = "block";
        console.log(error);
    })
});