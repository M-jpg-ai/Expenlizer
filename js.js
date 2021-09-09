window.onload = () => {
  document.getElementById("login_log").style.display="none";
  document.getElementById("logout").style.display ="block";
  document.getElementById("credit").innerHTML = "<div id='start_login' data-toggle='modal' data-target='#login' class='launch-modal'></div><div class='modal fade' id='login'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h2 class='header'>Expenlizer<sup><img id='img_mod' src='OIP (2).jpg'></sup></h2><button type='button' class='close' id='close_btn' data-dismiss='modal'>&times;</button></div><div class='modal-body'><h3 >See And learn How to keep accounts of your money.</h3><h4 >Join Expenlizer today</h4><p>What Should We Call You</p><div class='form-group'><label >User Name:</label><input id='user_login_input' type='text' class='form-control' placeholder='User Login'></div><button id='login_button' class='btn btn-primary' onclick='login()'>Log in</button><br><br></p></div></div></div></div>";
  document.getElementById("start_login").click();
  document.getElementById("credit").innerHTML = "";
  welcome();
}
var total_amount;
var flag=0;

/// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7m07CPyMzKFLSxxKGanx2YRD2Ax63D9Y",
  authDomain: "expenlizer-2e38e.firebaseapp.com",
  databaseURL: "https://expenlizer-2e38e-default-rtdb.firebaseio.com",
  projectId: "expenlizer-2e38e",
  storageBucket: "expenlizer-2e38e.appspot.com",
  messagingSenderId: "559457934616",
  appId: "1:559457934616:web:03eacf32dd3f524b9c926d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// function login_log(){
  
//     $(document).ready(function(){
//         $('.launch-modal').click(function(){
//             $('#login').modal({
//                 backdrop: 'static'
//             });
//         }); 
//     });
  
//     document.getElementById("credit").innerHTML = "";
//     document.getElementById("welcome").click();
// }

var names_array=[];
function login() {
  document.getElementById("login_log").style.display="none";
  document.getElementById("logout").style.display ="block";
  user = document.getElementById("user_login_input").value;
  localStorage.setItem("UserName",user);
  console.log(user);
  document.getElementById("close_btn").click();
 
  firebase.database().ref("/").on('value', function(snapshot) {snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val();
      names_array.push(childKey);
      if(childKey == user) {
      console.log(childKey);
      console.log(childData);
      total_amount=childData["total_amount"];
      document.getElementById("balance_div").innerHTML="<h1> Balance is "+total_amount+"</h1>";
  } 
});});
console.log(names_array);
for(i=0;i<names_array.length;i++){
  if(names_array[i]!=user){
      flag++;
      }
  }

  if(flag==names_array.length){
      firebase.database().ref("/").child(user).update({
          total_amount:0
  
      });
      console.log(user);
      console.log(flag);
      console.log(names_array.length);
  }
  if(flag!=0){
    firebase.database().ref("/").child(user).update({
        total_amount:0

    });
    console.log(user);
    console.log(flag);
    console.log(names_array.length);
}
}


function welcome() {
  document.getElementById("welcome").innerHTML = "Hi " + localStorage.getItem("UserName") + "!" + "<hr>";
}


function logout() {
  document.getElementById("login_log").style.display="block";
  document.getElementById("logout").style.display ="none";

  localStorage.removeItem("UserName");
  document.getElementById("balance_div").innerHTML=
  document.getElementById("welcome").innerHTML = "";
  document.getElementById("logout").innerHTML = "";
  document.getElementById("logout").innerHTML = "<button id='login_log' class='btn btn-primary' onclick='login_log()'><img id='login_icons8' src='icons8-login-64.png'>Login</button>";
  location.reload();
}

function credit() {
  if (document.getElementById("credit_input").value == 0) {
      window.alert("Please type the amount before you credit it to your profile");
  } else {

      amount_credited = Number(document.getElementById("credit_input").value);

      total_amount=total_amount+amount_credited;


      firebase.database().ref("/").child(user).update({
          total_amount:total_amount
  
      });
    
      console.log(amount_credited);
      document.getElementById("credit").innerHTML = "<div id='cre' data-toggle='modal' data-target='#credit_modal'></div><div class='modal fade' id='credit_modal'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button></div><div class='modal-body'><img src='piggy_bank(credit).gif' class='img-responsive img_modal'><h3 class='p_modal'>A Amount of </h3><h2 class='p_modal' id='amount'></h2><h3 class='p_modal'> is credited. </h3></div></div></div></div>";
      document.getElementById("amount").innerHTML = amount_credited;
      document.getElementById("cre").click();
      document.getElementById("credit").innerHTML = "";
      document.getElementById("credit_input").value = null;



  }
  

}

function debit() {
  if (document.getElementById("debit_input").value == 0) {
      window.alert("Please type the amount before you debit it from your profile");
  } else {

      amount_debited = Number(document.getElementById("debit_input").value);

      total_amount=total_amount-amount_debited;


      firebase.database().ref("/").child(user).update({
          total_amount:total_amount
  
      });
     
      console.log(amount_debited);
      document.getElementById("debit").innerHTML = "<div  id='deb' data-toggle='modal' data-target='#credit_modal'></div><div class='modal fade' id='credit_modal'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button></div><div class='modal-body'><img src='shopping.gif' class='img-responsive' id='modal_img'><h3 class='p_modal'>A Amount of </h3><h2 class='p_modal' id='amount'></h2><h3 class='p_modal'> is debited. </h3></div></div></div></div>";
      document.getElementById("amount").innerHTML = amount_debited;
      document.getElementById("deb").click();
      document.getElementById("debit").innerHTML = "";
      document.getElementById("debit_input").value = null;
  }
}