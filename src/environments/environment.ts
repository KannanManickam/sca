// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC0FyjIJiA5-cuJu10ADwFFWUiLLj2IMHo",
    authDomain: "sca-project-ng.firebaseapp.com",
    databaseURL: "https://sca-project-ng.firebaseio.com",
    projectId: "sca-project-ng",
    storageBucket: "sca-project-ng.appspot.com",
    messagingSenderId: "232505022013"
  }
};
