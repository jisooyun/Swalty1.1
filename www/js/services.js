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