import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import angularCSS from 'angular-css';
import navCtrl from './controllers/navCtrl';
import loginCtlr from './controllers/loginCtrl';
import mapCtlr from './controllers/mapCtrl';
import EventRepository from './events/event_repository';
import CurrentUserContext from './system/user_context';
import Authorization from './system/authorization';

import '../style/styles.css';
import '../style/loginstyle.css';

// let app = () => {
//   return {
//     template: require('./app.html'),
//     controller: 'AppCtrl',
//     controllerAs: 'app'
//   }
// };

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

function appConfig ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //route, ktory pozwala nam na zmiane ekranów i przypisuje kontrolery do danych ekranów
    $routeProvider
        .when('/home', {
            template: require('./views/home.html'),
            controller : 'MapController'
        })
        .when('/panel', {
            template: require('./views/panel.html'),
            controller: 'MapController'
        })
        .when('/login', {
            template: require('./views/login.html'),
            controller: 'LoginController',
            controllerAs: 'app'
        })
        .otherwise({
            redirectTo: '/login'
        });
}

const MODULE_NAME = 'app';

var config = {
    apiKey: "AIzaSyB9Is-rNsWgM-V1EexcJQeq0babWrO_xYk",
    authDomain: "aktywny-krakow-ae725.firebaseapp.com",
    databaseURL: "https://aktywny-krakow-ae725.firebaseio.com",
    projectId: "aktywny-krakow-ae725",
    storageBucket: "aktywny-krakow-ae725.appspot.com",
    messagingSenderId: "525000600389"
  };

firebase.initializeApp(config);


const userContext = new CurrentUserContext();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userContext.authenticate(user);
        console.log(user);
    } else {
        console.log('signed out');
    }
});



const providergoogle = new firebase.auth.GoogleAuthProvider();
const providerfacebook = new firebase.auth.FacebookAuthProvider();

const authorization = new Authorization(firebase.auth(), providergoogle, providerfacebook);

const database = firebase.database();

const eventRepository = new EventRepository(database, userContext);


angular.module(MODULE_NAME, [ngRoute, ngAnimate, angularCSS])
   .factory('eventRepository', function($rootScope) {
        return eventRepository;
   })
   .factory('authorization', function() {
        return authorization;
   })
  .config(['$routeProvider', '$locationProvider', appConfig])
  .controller('NavController', navCtrl)
  .controller('LoginController', ['$scope', '$location', 'authorization', loginCtlr])
  .controller('MapController', ['$scope', '$location', 'eventRepository', mapCtlr]);

export default MODULE_NAME;
