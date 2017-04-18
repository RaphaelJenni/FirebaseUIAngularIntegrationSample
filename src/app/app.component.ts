import { AfterViewInit, Component, Inject } from "@angular/core";
import { AngularFire, FirebaseApp } from "angularfire2";
import * as firebase from "firebase/app";
import { User } from "firebase/app";
import * as firebaseui from "firebaseui";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.firebaseui.css']
})
export class AppComponent implements AfterViewInit {

  private firebaseUiInstance;
  title = 'app works!';


  constructor(private aF: AngularFire, @Inject(FirebaseApp) private firebaseApp: any) {
    // Initialize the FirebaseUI Widget using Firebase.
    this.firebaseUiInstance = new firebaseui.auth.AuthUI(firebaseApp.auth());
  }

  ngAfterViewInit(): void {
    //Only fire this if the user isn't authenticated
    this.aF.auth.subscribe(value => {
      if (!value) this.firebaseUIPopup();
    });

    firebase.auth().onAuthStateChanged(this.firebaseAuthChangeListener, (error) => console.log(error));
  }

  firebaseUIPopup() {
    console.log('popup');
    let uiConfig = {
      callbacks: {
        signInSuccess: (currentUser, credential, rederictUrl) => {
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


    // The start method will wait until the DOM is loaded.
    this.firebaseUiInstance.start('#firebaseui-auth-container', uiConfig);
  }

  firebaseAuthChangeListener(user: User) {
    if (user) {
      user.getToken().then(function (accessToken) {
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
          accessToken: accessToken,
          providerData: user.providerData
        }, null, '  ');
      });
    } else {
      document.getElementById('account-details').textContent = 'null - User not signed in';
    }
  }

  logout() {
    console.log(this.aF.auth.getAuth());
    this.aF.auth.logout().then(() => console.log(this.aF.auth.subscribe(v => console.log(v))))
  }
}
