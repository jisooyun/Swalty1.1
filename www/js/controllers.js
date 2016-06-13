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
   console.log(Recettes)

   $scope.single = function(){
      single = this.recette;
      myService.set(single);
  } 
})

//AFFICHER LES RECETTES SINGLE
.controller('SingleController', function($scope, Recettes, $ionicViewService,  myService, updateFav, Scores, ScoresTotal, titreJoueur, $ionicPopup, $state){

  $scope.single = myService.get();
  

    $scope.backView = function(){
        $ionicViewService.getBackView().go();
    };

    $scope.single = myService.get();
    var single = $scope.single;
    $scope.ingredients = single.ingredient;
    console.log(single)
    $scope.etapes = single.etape;


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
        var tokenFavoris = 0;
        var banane = snap.val().fav;
        for (var i = banane.length - 1; i >= 0; i--) {
                if (banane[i] === id) {
                    tokenFavoris = 1
                }
            }

          if (tokenFavoris == 1) {
              $scope.Favoris = {"display" : "none"};
          }else{
              $scope.delFavoris = {"display" : "none"};
          }
    });
  };

    $scope.isFav = function(){
      var auth = ref.getAuth();
      var idUtilisateur = auth.uid;

      var usersRef = ref.child(idUtilisateur);
      var path = usersRef.toString();
      var userRef = new Firebase(path);
      userRef.on("value", function(snap){
        var id = single.$id;
        var tokenFav = 0;
        console.log(snap.val().fav)
        var banane = snap.val().fav;
        for (var i = banane.length - 1; i >= 0; i--) {
                if (banane[i] === id) {
                    tokenFav = 1
                }
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

   //Add point
  var ref = new Firebase("https://swaltyapp.firebaseio.com/users");
  var ref2 = new Firebase("https://swaltyapp.firebaseio.com/scores");
  var ref3 = new Firebase("https://swaltyapp.firebaseio.com/titres");
// Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    $scope.pointSucree = function(){
        var auth = ref.getAuth();
        var idUtilisateur = auth.uid;
        var usersRef = ref.child(idUtilisateur);
        var path = usersRef.toString();
        var userRef = new Firebase(path);
        userRef.on("value", function(snap){
            var score = snap.val().sucre;
            var scores = score + 1;
            Scores.set(scores);
        })
        ref2.on("value", function(sna){
          var snaperlipopette = sna.val().sucre
          snaperlipopetteNew = snaperlipopette + 1
          ScoresTotal.set(snaperlipopetteNew);
        })
        
        ref3.on("value", function(sn){
          scores = Scores.get();
          var snaperlipopetteTitre = sn.val()
          sn.forEach(function(childSnapshot) {
            if (childSnapshot.val().score == scores) {
              titre = childSnapshot.val().nom
              titreJoueur.set(titre)
              usersRef.update({titre:titre})
              showAlert();
            };
          })
          
        })

        scores = Scores.get();
        userRef.update({
            sucre : scores
        
        });
        NewSna = ScoresTotal.get()
        console.log(NewSna)
        ref2.update({sucre:NewSna});

      }
    });
  ref.on("value", function(snapshot) {
    $scope.pointSel = function(){
        var auth = ref.getAuth();
        var idUtilisateur = auth.uid;
        var usersRef = ref.child(idUtilisateur);
        var path = usersRef.toString();
        var userRef = new Firebase(path);

        userRef.on("value", function(snap){
            var score = snap.val().sel;
            var scores = score + 1;
            Scores.set(scores);
        })
        
        ref3.on("value", function(sn){
          scores = Scores.get();
          var snaperlipopetteTitre = sn.val()
          console.log(snaperlipopetteTitre);
          sn.forEach(function(childSnapshot) {
            if (childSnapshot.val().score == scores) {
              titre = childSnapshot.val().nom
              titreJoueur.set(titre)
              usersRef.update({titre:titre})
              showAlert();
            }; 
          })
        })

        scores = Scores.get();
        userRef.update({
            sel : scores
        });
        ref2.on("value", function(pomme){
          var snaperlipopetteSel = pomme.val().sel
          var snaperlipopetteNewnew = snaperlipopetteSel +1
          console.log(snaperlipopetteNewnew)
          ScoresTotal.set(snaperlipopetteNewnew);
        })
        var NewSnaSel = ScoresTotal.get()
        console.log(NewSnaSel)
        ref2.update({sel:NewSnaSel});

      }


    });


    // BOITE D'ALERTE QUI ANNONCE LE TITRE DU JOUEUR !
    showAlert = function() {
        var auth = ref.getAuth();
        var idUtilisateur = auth.uid;
        var usersRef = ref.child(idUtilisateur);
        var path = usersRef.toString();
        var userRef = new Firebase(path);
        userRef.on("value", function(snap){
            var titre = snap.val().titre;
            console.log(titre)
            var alertPopup = $ionicPopup.alert({
            title: 'FELICITATIONS',
            template: '<img src="img/icon/confetti.png" class="confetti"> <br>' +
                '+1 POINT ! <br>'+
            'Vous êtes à présent : <br> '+titre+''
        });
        alertPopup.then(function(res) {
            console.log('test', res);
        });
        });
        $state.go("homepage");
    };

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

// FAVORIS
.controller('FavorisController', function($scope, Titres, favorisSingle, myService){
    var ref = new Firebase("https://swaltyapp.firebaseio.com/users");

    ref.on("value", function(snap){
          var auth = ref.getAuth();
          var idUtilisateur = auth.uid;
          var usersRef = ref.child(idUtilisateur);
          var path = usersRef.toString();
          var userRef = new Firebase(path);
          userRef.on("value", function(snapshot){
            var tadam = snapshot.val().fav;
            favorisSingle.set(tadam);
            
            var ref2 = new Firebase("https://swaltyapp.firebaseio.com/recettes");
            ref2.on("value", function(sn){
              var fav = sn.val();
              tadam = favorisSingle.get()
              var favorisFinal = [0]
              
                for (var i = tadam.length - 1; i >= 1; i--) {
                  if (sn.hasChild(tadam[i])) {
                    if (tadam.length - 1 == i) {favorisFinal.splice(0,1)};
                    favorisFinal.push(fav[tadam[i]]);
                  };
                }; 
              $scope.favorits = favorisFinal
            })
          })
        });
    $scope.titres = Titres;
    $scope.single = function(){
      single = this.favori;
      console.log(single)
      myService.set(single);
  } 


})

//authInscription
.controller('AuthController', function($scope, authProvider, $state) {

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
                    
                    console.log(userData);
                    console.log("Successfully created user account with uid:", userData.uid);
                    var favoris = [0];
                    var titres = [0];
                    var titre = "Inscit"; 
                    var ref = new Firebase("https://swaltyapp.firebaseio.com");
                    ref.child("users").child(userData.uid).set({
                    provider: "password",
                    name: pseudo,
                    fav: favoris,
                    sucre: 0,
                    sel: 0,
                    titres: titres,
                    titre: titre
                });
                    $state.go("homepage");
                }
            });
        }

    }


})


//authConnexion
.controller('ConnexionController', function($scope, $state, $firebaseAuth) {

    $scope.userConnexion = function() {
        var ref = new Firebase("https://swaltyapp.firebaseio.com");

        mail = this.mail;
        mdp = this.mdp;
        ref.authWithPassword({
        "email": this.mail,
        "password": this.mdp
}       , function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
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
        var isNewUser = false;

        var ref = new Firebase("https://swaltyapp.firebaseio.com");




        ref.onAuth(function(authData) {
          ref.once('value', function(snapshot) {
          var test = getName(authData)
          var test2 = authData.provider
          console.log(snapshot)
          if (snapshot.hasChild(test)) {
            console.log('test')
            var isNewUser = true;
          }else{
            $state.go("homepage");
            console.log('??')
          }
        });
            if (authData && isNewUser) {
                var favoris = [0];
                var titres = [0];
                var titre = "Inscit";
                // save the user's profile into the database so we can list users,
                // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,
                    name: getName(authData),
                    fav: favoris,
                    sucre: 0,
                    sel: 0,
                    titres: titres,
                    titre: titre
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

//PROFIL
.controller("ProfilController", ["$scope", "Auth",
    function($scope, Auth) {
        $scope.auth = Auth;

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });
        // we would probably save a profile when we register new users on our site
        // we could also read the profile to see if it's null
        // here we will just simulate this with an isNewUser boolean
        var isNewUser = false;

        var ref = new Firebase("https://swaltyapp.firebaseio.com");


        ref.onAuth(function(authData) {
          ref.once('value', function(snapshot) {
          var test = getName(authData)
          if (snapshot.hasChild(test)) {
            console.log("nice")
            var isNewUser = true;
          }else{
            console.log(getName(authData))
          }
        });
            if (authData && isNewUser == true) {
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
            }
        });
    }



]);
