function Authorization(auth, provider) {
    return {
        handleGoogleAuth: function () {
            auth.signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // console.log(user);
                // ...
            }).catch(function (error) {
                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
        /*handleFacebookAuth: function(){
            auth.signInWithPopup(provider).then(function(result) {
               // This gives you a Facebook Access Token. You can use it to access the Facebook API.
               var token = result.credential.accessToken;
               // The signed-in user info.
               var user = result.user;
               // ...
              }).catch(function(error) {
                console.log(error);
               // Handle Errors here.
               var errorCode = error.code;
               var errorMessage = error.message;
               // The email of the user's account used.
               var email = error.email;
               // The firebase.auth.AuthCredential type that was used.
               var credential = error.credential;
               // ...
              });
        }*/
    };
}

export default Authorization;
