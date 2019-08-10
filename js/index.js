
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


	$(document).ready(function(){
		var state = "login";
		
		$("#signup").click(function(){
			$(this).text(state);
			if(state === "login"){
				state = "signup";
			} else{
				state = "login";
			}
			$("#login").text(state);
		});

		
		$("form").submit(function(e){
			e.preventDefault(); // so it wouldn't use form functionality
			let email = $("#email").val();
			let pass = $("#pass").val();
			if(state === "login"){
				firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
					alert('Email or Password incorrect!!');
					location.reload();
				});
				
			} else{

				location.href = "register.html";
			}
		});
		
		
		
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				location.href = "hangman.html";
				console.log(email);
			} else {
				firebase.auth().signOut();
			}
		});

		
	});