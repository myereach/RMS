'use strict';
var $baseUrl="http://192.168.2.61:8080/openmaint/services/rest/v2/";
console.log("FM200s");
angular.module("rmsApp.services")
    .factory('FM200s', function(Restangular) {

        //var resourceBase = Restangular.all("cards");
        var service=Restangular.service('classes/FM200/cards');

        service.getById = function (id) {
            //return  service.one(id).get().$object ;
            //console.log("service.getById");
            return service.one(id).get();
            // return restangular.one("account", id).get();
        };
        service.getAll = function () {
            console.log("service.getAll");
            return service.getList().then(function(it){
                console.log(JSON.stringify(it));
                console.log("service.getAll back");
                return it;
            });
            // return restangular.one("account", id).get();.$object
        };
        service.update = function(it) {
            //var id=it._id;
            //it.id=id;
            return Restangular.copy(it).put();
        };
        service.create = function(it, callback) {
            console.log(it);
            return service.post(it).then(function(resp) {

                callback(resp.data);

            });
            //return service.post(it);
            //return Restangular.copy(user).post();
        };
        service.delete = function(it) {

            console.log(it);
            return it.remove();

            //return Restangular.copy(user).post();
        };
        return service;


    });
