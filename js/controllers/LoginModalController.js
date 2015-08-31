// LoginModalController.js

angular.module("rmsApp.controllers", []).controller('LoginModalController', function ($rootScope, $scope , Users) {
    console.debug (" get in LoginModalController");

    this.cancel = $scope.$dismiss;


    this.submit = function (username, password) {
        $scope.error=undefined;
        var session ={username:username, password:password};
        //Users.create(session, function(data){console.log(data);});
        var user = Users.create(session, function(errorMessage){
            $scope.error="無效帳號或密碼，請重試。";
        }).then(function (user) {
            console.log(user);
            //if(username=='admin' && password=='admin') {
            //if(user==undefined) $scope.error="無效帳號或密碼，請重試。";
            if($scope.error==undefined) {
                //var user={username:'admin', password:'password'};
                var user={username:'admin', token:user._id};

                $scope.$close(user);
                $scope.$dismiss;
            }
                //$scope.$dismiss;
            //}
        });

    };

});
