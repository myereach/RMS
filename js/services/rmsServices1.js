/**
 * Created by richard on 2015/8/23.
 */
'use strict';
var $baseUrl="http://220.134.213.206:8082/openmaint/services/rest/v2/";
console.log("test");
angular.module("rmsApp.services")
    .factory('rmsServices', function(Restangular) {

        //var resourceBase = Restangular.all("cards");
        //var service=Restangular.service('classes/Building/cards');
        var service={};
        service.itemUrl="";
        service.init = function(itemUrl){
            service.itemUrl=itemUrl;
            console.log("set :"+service.itemUrl)

            //Restangular.setBaseUrl($baseUrl);
            //service=Restangular.service(service.itemUrl);
            Restangular.withConfig(function(RestangularConfigurer) {
                service =  Restangular.setBaseUrl($baseUrl).service(itemUrl);

            });
            //return service;
            //service=Restangular.service(itemUrl);
            /*return Restangular.withConfig(function(RestangularConfigurer) {
                service =  Restangular.setBaseUrl($baseUrl).service(itemUrl);
                return service;
            });*/
        };
        service.getById = function (id) {
            //return  service.one(id).get().$object ;
            //console.log("service.getById");
            return service.one(id).get();
            // return restangular.one("account", id).get();
        };
        service.getAll = function () {
            return service.getList().$object;
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
