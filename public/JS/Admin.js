
//Firebase auth check if admin login or not
firebase.auth().onAuthStateChanged(function (user) {
  // if admin is login in his account, he cann't see login container 
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    //to get user's email id
    var user = firebase.auth().currentUser;

    if (user != null) {
      // var email_id = user.email;
      // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
    }

  }
  //if admin didn't loged in this else statement show him login container
  else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

//login function
function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  //Firebase auth will check if the password and email match or not
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    //if password or email is not correct admin will get an error message
    window.alert("Error : " + errorMessage);

    // ...
  });
}
// end of login function

//logout function
function logout() {
  firebase.auth().signOut();
}



// firebase database to add product
const db = firebase.database();
const databaseRef = db.ref('product');

// databaseRef.on('value', function(snapshot){
//   const allData = snapshot.val();
//   console.log(allData);

//  // $('.productList').append('<table><tr><td>code</td><td>name</td><td>price</td></tr><tr><td>'+codedb+'</td><td>'+namedb+'</td><td>'+pricedb+'</td></tr></table>');
// });

const loadProductList = () => {
  databaseRef.on('value', snap => {
    snap.forEach(snap2 => {
      var codedb = snap2.val().code;
      var namedb = snap2.val().name;
      var pricedb = snap2.val().price;
      console.log(codedb, namedb, pricedb);
     // $('.productRow').append('<table><tr><td>code</td><td>name</td><td>price</td></tr><tr><td>' + codedb + '</td><td>' + namedb + '</td><td>' + pricedb + '</td></tr></table>');
      $('.productCode').append('<table><tr><td>' + codedb +'</td></tr></table>');
      $('.productName').append('<table><tr><td>' + namedb +'</td></tr></table>');
      $('.productPrice').append('<table><tr><td>' + pricedb +'</td></tr></table>');  
    });
  })
}

/* databaseRef.on('value',snap1=>{
   snap1.forEach(snap2 => {
     snap2.forEach(snap3 => {
       var codedb = snap3.val('code');
       var namedb = snap3.val('name');
       var pricedb = snap3.val('price');

       console.log(codedb + namedb + pricedb);

       $('.productList').append('<table><tr><td>code</td><td>name</td><td>price</td></tr><tr><td>'+codedb+'</td><td>'+namedb+'</td><td>'+pricedb+'</td></tr></table>');
     });
   });
 });*/

//this function will allow admin to add any product in firebase
function addProduct() {
  var productName = document.getElementById('product_name').value;
  var productPrice = document.getElementById('product_price').value;
  var productCode = document.getElementById('product_code').value;

  alert("Product Name:" + productName + "\nProduct Price: " + productPrice + "\nProduct Code: " + productCode);
  // const id = parseInt(Math.random() * 1000);
  // console.log(id);
  // db.ref('users/' + id).set({ name : myName, age: age});

  db.ref('product/' + productCode).set({ name: productName, price: productPrice, code: productCode });

  reload();
}

//function to update the product
function updateProduct() {
  var productName = document.getElementById('product_name').value;
  var productPrice = document.getElementById('product_price').value;
  var productCode = document.getElementById('product_code').value;

  alert("Product Name:" + productName + "\nProduct Price: " + productPrice + "\nProduct Code: " + productCode);

  db.ref('product/' + productCode).update({ name: productName, price: productPrice, code: productCode });
  alert('updated sucessfully');

  reload();
}

//function to delete the product
function deleteProduct() {
  var productCode = document.getElementById('product_code').value;

  db.ref('product/' + productCode).remove();
  alert("Delete sucessfully");

  reload();
}

function reload() {
  window.location.reload();
}

//.................CSS scripts..............
//ripple affect
$(document).ready(function () {
  $("#header, .info").ripples({
    dropRadius: 25,
    perturbance: 0.06,
  });

  //magnific popup
  $('.parent-container').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',

    gallery: {
      enabled: true
    }
    // other options
  });
});
