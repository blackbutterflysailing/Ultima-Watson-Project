angular.module('starter.controllers', ['ionic', 'ngCordova', 'ngCordovaOauth'])

.controller('WelcomeCtrl', ["$scope", "$cordovaOauth", "$http", "facebookService", "$state", function($scope, $cordovaOauth, $http, facebookService, $state) {
	
  window.cordovaOauth = $cordovaOauth;
  window.http = $http;
  
  function displayData($http, access_token)
  {
    facebookService.getProfileData(function(data) {
      var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
      html = html + "<tr><td>" + "Name" + "</td><td>" + data.name + "</td></tr>";
      html = html + "<tr><td>" + "Gender" + "</td><td>" + data.gender + "</td></tr>";
      html = html + "<tr><td>" + "Picture" + "</td><td><img src='" + data.picture.data.url + "' /></td></tr>";

      html = html + "</tbody></table>";

      document.getElementById("listTable").innerHTML = html;
      $.mobile.changePage($("#profile"), "slide", true, true);
    }, access_token);
  }
  
  $scope.facebookLogin = function() {
    window.tts_synthesize("Logging in with facebook");
    
    $cordovaOauth.facebook("457264797802899", ["email", "public_profile"]).then(function(result) {
      displayData($http, result.access_token);
    }, function(error) {
      alert("Error: " + error);
    });
  }
  
  $scope.title = "Welcome";
  $scope.continueClick = function(){
    $state.go('tab.dash', {})
  }; 
}])

.controller('DashCtrl', ["$scope", "$http", "", function($scope, $http, ) {
	
  
  
	var xhr = new XMLHttpRequest();
	function tokenReceived(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var token = xhr.responseText;
			var wsURI = "wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=" + token
			+ "&model=es-ES_BroadbandModel";
			var websocket = new WebSocket(wsURI);
			websocket.onopen = function(evt) { onOpen(evt) };
			websocket.onclose = function(evt) { onClose(evt) };
			websocket.onmessage = function(evt) { onMessage(evt) };
			websocket.onerror = function(evt) { onError(evt) };

			$scope.captureAudio = function() {
				
				var options = { limit: 3, duration: 2 };
				
				function micErrorHandler(err) {
					console.log('exception', err);
				}

				function loopBody(audioData) {
					console.log('audioCapture', audioData);
					$cordovaCapture.captureAudio(loopBody, micErrorHandler, options);
				}

				$cordovaCapture.captureAudio(loopBody, micErrorHandler, options);
			}
		}
	}
	xhr.open('GET', "https://stream.watsonplatform.net/speech-to-text/api/v1/token", true, "938cf6f9-a3e6-4f32-8297-19b027df4b35", "Mc5z5LBPzHCB");
	xhr.send();
	xhr.onreadystatechange = tokenReceived;
}])

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

.controller('PlansCtrl', function($scope, Plans) {
  $scope.plans = Plans.all();
  $scope.remove = function(plan) {
    Plans.remove(plan);
  };
})

.controller('ActionsCtrl', function($scope, Actions) {
  $scope.plans = Plans.all();
  $scope.remove = function(plan) {
    Plans.remove(plan);
  };
});


