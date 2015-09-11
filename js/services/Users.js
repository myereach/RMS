/**
 * Created by richard on 2015/8/23.
 */
'use strict';
var $baseUrl="http://220.134.213.206:8082/openmaint/services/rest/v2/";
console.log("Users");
angular.module("rmsApp.services")
    .factory('Users', function(Restangular) {
        Restangular.setBaseUrl($baseUrl);
        Restangular.setRestangularFields({
            id: '_id'
        });
        //var resourceBase = Restangular.all("cards");
        var service=Restangular.service('sessions');

        service.create = function(it, callback) {
            return service.post(it).then(function(resp) {
                    console.log("okay", it);
                    console.log(resp.data);
                    return resp.data;
            },
                function (resp) {
                    console.log("fail", resp.status);
                    callback(resp);
                }
            );

        };
        service.getById = function (id) {
            //return  service.one(id).get().$object ;
            return  service.one(id).get().$object;
            // return restangular.one("account", id).get();
        };
        service.getAll = function () {
            return service.getList();
            // return restangular.one("account", id).get();.$object
        };
        service.update = function(it) {
            //var id=it._id;
            //it.id=id;
            return Restangular.copy(it).put();
        };

        service.delete = function(it) {

            console.log(it);
            return it.remove();

            //return Restangular.copy(user).post();
        };
        return service;


    });