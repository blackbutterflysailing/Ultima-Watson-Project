
angular.module('starter.services', [])
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
      if (chats[i].id === parseInt(chatId)) {
        return chats[i];
      }
      }
      return null;
    }
  };
})
.factory('Plans', function() {
  var plans = [{
    id: 0,
    name: 'Fire at home',
    actions:[
      {
        type:"IPV"
      }
    ]
  }];

  return {
    all: function() {
      return plans;
    },
    remove: function(plan) {
      plans.splice(plans.indexOf(plan), 1);
    },
    get: function(planId) {
      for (var i = 0; i < plans.length; i++) {
        if (plans[i].id === parseInt(planId)) {
          return plans[i];
        }
      }
      return null;
    },
    create: function() {
      var temp = {
        id: plans.length,
        name: "New Plan",
        actions: []
      };
      plans.push(temp);
      return temp;
    }
  };
})
.factory('facebookService', function($q) {
  return {
    getMyLastName: function() {
      var deferred = $q.defer();
      FB.api('/me', {
        fields: 'last_name'
      }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    },
    getProfileData: function(callback, access_token) {
        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
          callback(result.data);
        }, function(error) {
          alert("Error: " + error);
          callback(null);
      });
    }
  }
})
.factory('AccountService', function($q) {
  
  var name = "none";
  var gender = "none";
  var location = "none";
  var picture = "none";
  
  var reqFields = function(fields) {
      var deferred = $q.defer();
      FB.api('/me', {
        fields: fields
      }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    }
  
  return {
    getLastName: function() {
      return reqFields("last_name");
    },
    updateProfile: function() {
      return reqFields("name,gender,location,picture");
    },
    getProfileData: function(callback) {
        $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
          callback(result.data);
        }, function(error) {
          alert("Error: " + error);
          callback(null);
      });
    }
  }
});
