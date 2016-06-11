angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
   $ionicConfigProvider.tabs.position('bottom');

})

.controller("TabsCtrl", function($scope){
    $scope.tabState = {
        homepage : {
            hidden : true
        }
    };
})

//RECETTES
.factory("Recettes", function($firebaseArray) {
    var itemsRef = new Firebase("https://swaltyapp.firebaseio.com/recettes");
    return $firebaseArray(itemsRef);
})

//AFFICHER LES RECETTES
.controller('RecetteController', function($scope, Recettes,$state, myService){
   $scope.recettes = Recettes;

   $scope.single = function(){
      single = this.recette;
      myService.set(single);
  } 
})

//AFFICHER LES RECETTES SINGLE
.controller('SingleController', function($scope, Recettes, myService, $ionicViewService){

  $scope.single = myService.get();
  $scope.ingredients = single.ingredient;
  $scope.etapes = single.etape;

    $scope.backView = function(){
        $ionicViewService.getBackView().go();
    }

})


//DETAILS DES RECETTES
.controller('RecetteDetailCtrl', function($scope, $stateParams, Recettes) {
    var ref = new Firebase("https://swaltyapp.firebaseio.com/recettes");

    ref.on("child_added", function(snapshot, prevChildKey) {
        $scope.recette = snapshot.val();
        console.log("id: " + prevChildKey);
    });
})

//AFFICHER LES TITRES
.factory("Titres", function($firebaseArray) {
    var itemsRef = new Firebase("https://swaltyapp.firebaseio.com/titres");
    return $firebaseArray(itemsRef);
})

.controller('TitreController', function($scope, Titres){
    $scope.titres = Titres;
})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


//authInscription
.controller('AuthController', function($scope) {

    $scope.addUser = function() {
        var ref = new Firebase("https://swaltyapp.firebaseio.com");
        pseudo = this.pseudo;
        mail = this.email;
        mdp = this.mdp;
        mdpConf = this.mdpConf;

        if(mdp == mdpConf) {

            ref.createUser({
                "email": mail,
                "password": mdp
            }, function (error, userData) {
                if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        }

    }


})


//authConnexion
.controller('ConnexionController', function($scope) {

    $scope.userConnexion = function() {
        var ref = new Firebase("https://swaltyapp.firebaseio.com");

        pseudo = this.pseudo;
        mdp = this.mdp;

        ref.auth("AUTH_TOKEN", function(error, result) {
            if (error) {
                console.log("Authentication Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", result.auth);
                console.log("Auth expires at:", new Date(result.expires * 1000));
            }

        })
    }
});

