import {Component, AfterViewInit} from "@angular/core";
import {AngularFire} from "angularfire2";
const firebase = require('firebase');
const firebaseui = require('firebaseui');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.firebaseui.css']
})
export class AppComponent implements AfterViewInit {

  title = 'app works!';

  constructor(private aF: AngularFire) {
  }

  ngAfterViewInit(): void {

    this.aF.auth.subscribe(value => {
      if (!value) this.firebaseUIPopup();
    });


    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var providerData = user.providerData;
        user.getToken().then(function (accessToken) {
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');
        });
      } else {
        document.getElementById('account-details').textContent = 'null - User not signed in';
      }
    }, function (error) {
      console.log(error);
    });

  }

  firebaseUIPopup() {
    let uiConfig = {
      callbacks: {
        signInSuccess: function (currentUser, credential, rederictUrl) {
          console.log(currentUser);
          return false;
        }
      },
      signInFlow: 'popup',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  logout() {
    console.log(this.aF.auth.getAuth());
    this.aF.auth.logout().then(() => console.log(this.aF.auth.subscribe(v => console.log(v))))
  }
}
