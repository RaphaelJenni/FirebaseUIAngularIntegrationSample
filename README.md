# FirebaseUIAngularIntegration

This project is a sample app for the FirebaseUI integrated into an Angular 2 app.
Feel free to use it for yourself.

Just add your firebase credentials to the `environments/environment.ts`.

```
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "<INSERT YOUR CONFIG>",
    authDomain: "<INSERT YOUR CONFIG>",
    databaseURL: "<INSERT YOUR CONFIG>",
    projectId: "<INSERT YOUR CONFIG>",
    storageBucket: "<INSERT YOUR CONFIG>",
    messagingSenderId: "<INSERT YOUR CONFIG>"
  }
};
```

## Known issues
#### Synchronous getAuth
Needs to be fixed. #1
```
WARNING: the getAuth() API has changed behavior since adding support for Firebase 3.
    This will return null for the initial value when the page loads, even if the user is actually logged in.
    Please observe the actual authState asynchronously by subscribing to the auth service: af.auth.subscribe().
    The getAuth method will be removed in future releases
```

## Documentations

* [AngularFire](https://github.com/angular/angularfire2)
* [FirebaseUI](https://github.com/firebase/firebaseui-web)
* [Firebase Web](https://firebase.google.com/docs/web/setup)
