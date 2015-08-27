// LoginModal.js
angular.module("rmsApp.services", ["restangular"]).service('LoginModal', function ($modal, $rootScope) {

    function assignCurrentUser (user) {
        $rootScope.currentUser = user;
        return user;
    }
    return function() {
        var instance = $modal.open({
            templateUrl: 'views/loginModalTemplate.html',
            controller: 'LoginModalController',
            controllerAs: 'LoginModalController'
        })

        return instance.result.then(assignCurrentUser);
    };

});
