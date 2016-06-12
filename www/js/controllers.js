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
.controller('SingleController', function($scope, Recettes, myService, $ionicViewService,  myService, updateFav){

  $scope.single = myService.get();
  $scope.ingredients = single.ingredient;
  $scope.etapes = single.etape;

    $scope.backView = function(){
        $ionicViewService.getBackView().go();
    }

    $scope.single = myService.get();
  single = $scope.single;


  //Add Favoris dans Users
  var ref = new Firebase("https://swaltyapp.firebaseio.com/users");
// Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    //Hide btn
    $scope.isFavoris = function(){
    var auth = ref.getAuth();
    var idUtilisateur = auth.uid;
    var usersRef = ref.child(idUtilisateur);
      var path = usersRef.toString();
      var userRef = new Firebase(path);
      userRef.on("value", function(snap){
        var id = single.$id;
        var tokenFavoris = 0
        var banane = snap.val().fav;
        for (var i = banane.length - 1; i >= 0; i--) {
                if (banane[i] === id) {
                    tokenFavoris = 1
                };
            }
        if (tokenFavoris == 1) {
            $scope.Favoris = {display : "none"}; 
      }else{
        $scope.delFavoris = {display : "none"}; 
      }
    });
  }

    $scope.isFav = function(){
        var auth = ref.getAuth();
      var idUtilisateur = auth.uid;

      var usersRef = ref.child(idUtilisateur);
      var path = usersRef.toString();
      console.log(ref)
      var userRef = new Firebase(path);
      userRef.on("value", function(snap){
        var id = single.$id;
        var tokenFav = 0
        var banane = snap.val().fav;
        for (var i = banane.length - 1; i >= 0; i--) {
                if (banane[i] === id) {
                    tokenFav = 1
                };
            }
        if (tokenFav != 1) {
            
            banane.push(id);
            updateFav.set(banane);
        }else{
            banane = snap.val().fav;
            updateFav.set(banane);
        }
      })
      banane = updateFav.get();
      userRef.update({
             fav : banane
        });

    
        
        }
    });


  //Delete Favoris dans Users
  var ref = new Firebase("https://swaltyapp.firebaseio.com/users");
// Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    $scope.delFav = function(){
        var auth = ref.getAuth();
        var idUtilisateur = auth.uid;
        var usersRef = ref.child(idUtilisateur);
        var path = usersRef.toString();
        var userRef = new Firebase(path);
        userRef.on("value", function(snap){
            var banane = snap.val().fav;
            var id = single.$id;
            for (var i = banane.length - 1; i >= 0; i--) {
                if (banane[i] === id) {
                    banane.splice(i,1);
                };
            }
            updateFav.set(banane);
        })
        banane = updateFav.get();
        userRef.update({
            fav : banane
        });

    
        
  }
    

    });

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
.controller('AuthController', function($scope, authProvider, $location) {

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
                  authProvider.set(1);
                  $location.path("/homepage");
                  console.log(userData);
                    console.log("Successfully created user account with uid:", userData.uid);
                    var favoris = [0];
                    var ref = new Firebase("https://swaltyapp.firebaseio.com");
                    ref.child("users").child(userData.uid).set({
                    provider: "password",
                    name: pseudo,
                    fav: favoris,
                    sucre: 0,
                    sel: 0
                });
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
})


//SE CONNECTER VIA FACEBOOK
.controller("UserController", ["$scope", "Auth", "$state",
    function($scope, Auth, $state) {
        $scope.auth = Auth;

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
            
        });

        // we would probably save a profile when we register new users on our site
        // we could also read the profile to see if it's null
        // here we will just simulate this with an isNewUser boolean
        var isNewUser = true;

        var ref = new Firebase("https://swaltyapp.firebaseio.com");
        ref.onAuth(function(authData) {
            if (authData && isNewUser) {
                var favoris = [0];
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData),
                    fav: favoris,
                    sucre: 0,
                    sel: 0
                });
                $state.go("homepage");
            }
        });

        // find a suitable name based on the meta info given by each provider
        function getName(authData) {
            switch(authData.provider) {
                case 'password':
                    return authData.password.email.replace(/@.*/, '');
                case 'twitter':
                    return authData.twitter.displayName;
                case 'facebook':
                    return authData.facebook.displayName;
            }
        }
    }

])

// //FAVORIS CONTROLLER
// .controller('RecetteController', function($scope, Recettes, myService, updateFav){

// $scope.single = myService.get();
//   single = $scope.single;


//   //Add Favoris dans Users
//   var ref = new Firebase("https://swaltyapp.firebaseio.com/users");
// // Attach an asynchronous callback to read the data at our posts reference
//   ref.on("value", function(snapshot) {
//     //Hide btn
//     $scope.isFavoris = function(){
//     var auth = ref.getAuth();
//     var idUtilisateur = auth.uid;
//     var usersRef = ref.child(idUtilisateur);
//       var path = usersRef.toString();
//       var userRef = new Firebase(path);
//       userRef.on("value", function(snap){
//         var id = single.$id;
//         var tokenFavoris = 0
//         var banane = snap.val().fav;
//         for (var i = banane.length - 1; i >= 0; i--) {
//                 if (banane[i] === id) {
//                     tokenFavoris = 1
//                 };
//             }
//         if (tokenFavoris == 1) {
//             $scope.Favoris = {display : "none"}; 
//       }else{
//         $scope.delFavoris = {display : "none"}; 
//       }
//     });
//   }

//     $scope.isFav = function(){
//         var auth = ref.getAuth();
//       var idUtilisateur = auth.uid;

//       var usersRef = ref.child(idUtilisateur);
//       var path = usersRef.toString();
//       console.log(ref)
//       var userRef = new Firebase(path);
//       userRef.on("value", function(snap){
//         var id = single.$id;
//         var tokenFav = 0
//         var banane = snap.val().fav;
//         for (var i = banane.length - 1; i >= 0; i--) {
//                 if (banane[i] === id) {
//                     tokenFav = 1
//                 };
//             }
//         if (tokenFav != 1) {
            
//             banane.push(id);
//             updateFav.set(banane);
//         }else{
//             banane = snap.val().fav;
//             updateFav.set(banane);
//         }
//       })
//       banane = updateFav.get();
//       userRef.update({
//              fav : banane
//         });

    
        
//         }
//     });


//   //Delete Favoris dans Users
//   var ref = new Firebase("https://swaltyapp.firebaseio.com/users");
// // Attach an asynchronous callback to read the data at our posts reference
//   ref.on("value", function(snapshot) {
//     $scope.delFav = function(){
//         var auth = ref.getAuth();
//         var idUtilisateur = auth.uid;
//         var usersRef = ref.child(idUtilisateur);
//         var path = usersRef.toString();
//         var userRef = new Firebase(path);
//         userRef.on("value", function(snap){
//             var banane = snap.val().fav;
//             var id = single.$id;
//             for (var i = banane.length - 1; i >= 0; i--) {
//                 if (banane[i] === id) {
//                     banane.splice(i,1);
//                 };
//             }
//             updateFav.set(banane);
//         })
//         banane = updateFav.get();
//         userRef.update({
//             fav : banane
//         });

    
        
//   }
    

//     });
// });
