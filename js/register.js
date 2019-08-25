


  // Your web app's Firebase configuration
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

  //Reference for form collection(3)
  let formMessage = firebase.database().ref('register');

  //listen for submit event//(1)
  document
    .getElementById('registrationform')
    .addEventListener('submit', formSubmit);

    function formBack(e) {
    location.href = "index.html";
    }
  //Submit form(1.2)
  function formSubmit(e) {
    document.querySelector('.congrats').style.display = 'none';
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const ref = firebase.storage().ref();
    const file = document.querySelector('#cameraInput').files[0]
    const fname = (+new Date()) + '-' + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(fname).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        updateData(name,url);
        
      })
      .catch(console.error);
   
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        
        alert("Registration Failed!\nPassword must be at least 6 characters.");
        window.location.reload();
    });
      
    demo();
 
  }


  //Send Message to Firebase(4)
  
  function updateData(name,url) {
      
  var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
  photoURL: url
}).then(function() {
  // Update successful.
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
  
  