angular.module('starter.services', ['firebase'])

// Service 
.factory('myService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

})

//Favoris
.factory('updateFav', function(){
  var newFav = {}
  function set(data){
    newFav = data;
    
  }
  function get(){
    return newFav;
  }
  return{
    set:set,
    get:get
  }
})


//AUthentification
.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://swaltyapp.firebaseio.com");
        return $firebaseAuth(ref);
    }
])

.factory("Scores", function(){
  var score = 0;
  function set(data){
    score = data;
  }
  function get(){
    return score;
  }
  return{
    set:set,
    get:get
  }
})

.factory("ScoresTotal", function(){
  var scores = 0;
  function set(data){
    scores = data;
  }
  function get(){
    return scores;
  }
  return{
    set:set,
    get:get
  }
})

//Save titre
.factory("titreJoueur", function(){
  var titre = " ";
  function set(data){
    titre = data;
  }
  function get(){
    return titre;
  }
  return{
    set:set,
    get:get
  }
})

//FAVORIS SINGLE
.factory("favorisSingle", function(){
  var fav = 0;
  function set(data){
    fav = data;
  }
  function get(){
    return fav;
  }
  return{
    set:set,
    get:get
  }
})
//Gestion des routes
.factory('authProvider', function() {
    var user = 0;
    function set(data){
      user = data;
    }
    function get(){
      return newFav;
    }
    return{
      set:set,
      get:get
  }
});