// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('homepage', {
    url: '/homepage',
    templateUrl: 'templates/homepage.html'


  })

      //PAGE SUCRE & SALE
      .state('sucre', {
        url: '/sucre',
        templateUrl: 'templates/sucre.html'

      })
      .state('sel', {
        url: '/sel',
        templateUrl: 'templates/sel.html'

      })

      //TEMPLATES CATEG

      ////// GAUFRES
      .state('gaufre-sel', {
          url: '/gaufre-sel',
          templateUrl: 'templates/categSel/gaufre-sel.html'

      })

      .state('gaufre-sucre', {
          url: '/gaufre-sucre',
          templateUrl: 'templates/categSucre/gaufre-sucre.html'

      })

      ////// MUFFINS
      .state('muffin-sel', {
        url: '/muffin-sel',
        templateUrl: 'templates/categSel/muffin-sel.html'
      })

      .state('muffin-sucre', {
        url: '/muffin-sucre',
        templateUrl: 'templates/categSucre/muffin-sucre.html'
      })

      ////// CAKES
      .state('cake-sel', {
          url: '/cake-sel',
          templateUrl: 'templates/categSel/cake-sel.html'
      })

      .state('cake-sucre', {
          url: '/cake-sucre',
          templateUrl: 'templates/categSucre/cake-sucre.html'
      })

      ////// COOKIES
      .state('cookie-sel', {
          url: '/cookie-sel',
          templateUrl: 'templates/categSel/cookie-sel.html'
      })

      .state('cookie-sucre', {
          url: '/cookie-sucre',
          templateUrl: 'templates/categSucre/cookie-sucre.html'
      })

      ////// CRÊPES
      .state('crepe-sel', {
          url: '/crepe-sel',
          templateUrl: 'templates/categSel/crepe-sel.html'
      })

      .state('crepe-sucre', {
          url: '/crepe-sucre',
          templateUrl: 'templates/categSucre/crepe-sucre.html'
      })

      ////// EVENT
      .state('event-sucre', {
          url: '/event-sucre',
          templateUrl: 'templates/categSucre/event-sucre.html'
      })

      ////// DETAIL PAGES 

      .state('sucre-detail', {
          url: '/sucre-detail',
          templateUrl: 'templates/sucre-detail.html'
      })

      .state('sel-detail', {
          url: '/sel-detail',
          templateUrl: 'templates/sel-detail.html'
      })

      ////// PAGES ETAPES

      .state('sucre-etape', {
          url: '/sucre-etape',
          templateUrl: 'templates/sucre-etape.html'
      })

      .state('sel-etape', {
          url: '/sel-etape',
          templateUrl: 'templates/sel-etape.html'
      })




      .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/homepage');

});
