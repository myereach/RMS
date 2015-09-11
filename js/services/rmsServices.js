/**
 * Created by richard on 2015/8/23.
 */
'use strict';
var $baseUrl="http://220.134.213.206:8082/openmaint/services/rest/v2/";

angular.module("rmsApp.services")
    .factory('rmsServices', function(Restangular) {

        //var resourceBase = Restangular.all("cards");
        //var service=Restangular.service('classes/Building/cards');



        var service=new Object();
        service._itemUrl="abc";
        service._service={};
        service.init=function(itemUrl) {
            var newone = new Object();
            newone = service;
            newone._itemUrl = itemUrl;
            Restangular.withConfig(function (RestangularConfigurer) {
                Restangular.setBaseUrl($baseUrl);

                newone._service = Restangular.service(itemUrl);


            });
            return newone;
        };
        service.getById = function (id) {
            //return  service.one(id).get().$object ;
            //console.log("service.getById");
            return service._service.one(id).get();
            // return restangular.one("account", id).get();
        };
        service.getAll = function () {
            return service._service.getList();
            // return restangular.one("account", id).get();.$object
        };
        service.update = function(it) {
            //var id=it._id;
            //it.id=id;
            return Restangular.copy(it).put();
        };
        service.create = function(it, callback) {
            console.log(it);
            return service._service.post(it).then(function(resp) {

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

        return  service;

    });