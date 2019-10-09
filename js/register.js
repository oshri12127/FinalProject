
  var firebaseConfig = {
    apiKey: "AIzaSyDw_tDZu1yNEh3FsAq-3mAVmMi4ECAgME8",
    authDomain: "finalprojectweb-6ea4b.firebaseapp.com",
    databaseURL: "https://finalprojectweb-6ea4b.firebaseio.com",
    projectId: "finalprojectweb-6ea4b",
    storageBucket: "finalprojectweb-6ea4b.appspot.com",
    messagingSenderId: "517852498593",
    appId: "1:517852498593:web:02203ae20e84b066"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var globalname = "";
  //Reference for form collection(3)
  let formMessage = firebase.database().ref('register');

  //listen for submit event//(1)
 
  document.getElementById('registrationform')
    .addEventListener('submit', formSubmit);

  function formback() {window.location.href = "index.html";}
   
  //Submit form(1.2)
  function formSubmit(e) {
    document.querySelector('.congrats').style.display = 'none';
    e.preventDefault();
  
    let name = document.querySelector('#name').value;
    globalname = name;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const ref = firebase.storage().ref();
    const file = document.querySelector('#cameraInput').files[0];

    const fname = (+new Date()) + '-' + file.name;
    
    const metadata = {
      contentType: file.type
    };

    const task = ref.child(fname).put(file, metadata);
    
    task.then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
		resetScore(url);
		updateData(name,url);
        
      })
      .catch(console.error);
   
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        
        alert("Registration Failed!\nPassword must be at least 6 characters.");
        window.location.reload();
    });
    //resetScore(); 
    demo();
 
  }

    var userNow2;
  function resetScore(url){ //for the real time data base
	  
	var point0 = 0;
	firebase.auth().onAuthStateChanged(function (user){
		userNow2 = user.uid;
    var datesRef = firebase.database().ref();
    
	datesRef.child(userNow2).child('data').set({
        score: point0,
        username: globalname,
		photoURL: url
    });
	});
}
  //Send Message to Firebase(4)
  
  function updateData(name,url) { //for the authontication
	  
      
    var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName: name,
      photoURL: url
    }).then(function() {
      
    }).catch(function(error) {
      // An error happened.
    });
  
    
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    await sleep(3000);
    document.querySelector('.congrats').style.display = 'block';
    await sleep(3000);
    location.href = "hangman.html";
  }
 /*   var userNow2;
  function resetScore(url){
	  console.log(url);
	var point0 = 0;
	firebase.auth().onAuthStateChanged(function (user){
		userNow2 = user.uid;
    var datesRef = firebase.database().ref();
    
	datesRef.child(userNow2).child('data').set({
        score: point0,
        username: globalname,
		//photoURL: url
    });
	});
}*/
  
  