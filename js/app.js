/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */

var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    'ui.select',
    'rmsApp.services',
    'rmsApp.controllers',
    'smart-table',
    'restangular'
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/
/**
 `$controller` will no longer look for controllers on `window`.
 The old behavior of looking on `window` for controllers was originally intended
 for use in examples, demos, and toy apps. We found that allowing global controller
 functions encouraged poor practices, so we resolved to disable this behavior by
 default.

 To migrate, register your controllers with modules rather than exposing them
 as globals:

 Before:

 ```javascript
 function MyController() {
  // ...
}
 ```

 After:

 ```javascript
 angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

 Although it's not recommended, you can re-enable the old behavior like this:

 ```javascript
 angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
 **/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);
var _isMobile = (function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
})();
/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope','LoginModal', function($scope, $rootScope, LoginModal) {
    $scope.name="MetronicApp";
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
        if(_isMobile){
            $('#myBody').removeClass("page-header-fixed").removeClass("page-sidebar-closed-hide-logo").removeClass("page-quick-sidebar-over-content");
            $('#myBody').addClass('page-full-width');
            $('#myHeader').hide();
            $('#myFooter').hide();
            $('.page-container').each(function(){
                $(this).css('margin-top','0px');

            });

        }

//Your code goes here.

    });
    // logout function
    this.logout = function(){
        $rootScope.currentUser=undefined;
        console.log("@scope="+$scope);
        location.reload();
        //$scope.$dismiss;
    };
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */

MetronicApp.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', function($stateProvider, $urlRouterProvider, RestangularProvider) {

// MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //Restangular setup
    /*var newBaseUrl = "http://192.168.2.61:8080/openmaint/services/rest/v2/";
     if (window.location.hostname == "localhost") {
     newBaseUrl = "http://localhost:8080/services/rest/v2";
     } else {
     var deployedAt = window.location.href.substring(0, window.location.href);
     newBaseUrl = deployedAt + "/services/rest/v2";
     }
     RestangularProvider.setBaseUrl("http://192.168.2.61:8080/openmaint/services/rest/v2/classes/Building");
     */
    /*RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig, $rootScope) {
     headers = headers || {};
     headers['Content-Type'] = "application/json";
     console.log("here");
     console.log (myRootScope);
     console.log ($rootScope.currentUser);
     if( $rootScope!=undefined&&$rootScope.currentUser!=undefined){
     console.log ($rootScope.currentUser.token);
     headers['CMDBuild-Authorization'] =$rootScope.user.token; //'fdl0qml8knd74vijqatdpvjpeu';
     }


     });
     RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, $scope) {
     if (operation == "getList" || operation == "get" ) {
     data = data.data;
     }
     //console.debug("RETURN from server:");
     //console.debug(JSON.stringify(data));
     //console.debug(data);
     return data;
     });
     RestangularProvider.setBaseUrl($baseUrl);
     RestangularProvider.setRestangularFields({
     id: '_id'
     });*/


    // Redirect any unmatched url

    $urlRouterProvider.otherwise("/dashboard.html");



    $stateProvider

        //root
        .state('app', {
            template: '<ui-view/>',
            // ...
            data: {
                requireLogin: true // this property will apply to all children of 'app'
            }
            ,
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            //'assets/global/plugins/select2/select2.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                            'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                            'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',
                            //'assets/global/plugins/select2/select2.min.js',
                            'assets/global/plugins/datatables/all.min.js',
                            'js/scripts/table-advanced2.js'
                        ]

                    });
                }]
            }
        })
        // location>building
        .state('app.buildingList', {
            url: "/location/buildingList",
            templateUrl: "views/location/buildingList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "BuildingListController",
            resolve: {

            }
        })
        .state('app.buildingUpdate', {
            url: "/location/buildingUpdate/:id",
            templateUrl: "views/location/buildingUpdate.html",
            data: {pageTitle: 'Building Setting'},
            controller: "BuildingUpdateController",
            resolve: {

            }
        })
        .state('app.buildingView', {
            url: "/location/buildingView/:id",
            templateUrl: "views/location/buildingView.html",
            data: {pageTitle: 'Building Setting'},
            controller: "BuildingViewController",
            resolve: {
            }
        })
        .state('app.buildingAdd', {
            url: "/location/buildingAdd",
            templateUrl: "views/location/buildingUpdate.html",
            data: {pageTitle: 'Building Setting'},
            controller: "BuildingAddController",
            resolve: {

            }
        })
        // location>floor
        .state('app.floorList', {
            url: "/location/floorList",
            templateUrl: "views/location/floorList.html",
            controller: "FloorListController",
            resolve: {

            }
        })
        .state('app.floorUpdate', {
            url: "/location/floorUpdate/:id",
            templateUrl: "views/location/floorUpdate.html",
            data: {pageTitle: 'Floor Setting'},
            controller: "FloorUpdateController",
            resolve: {
                /*buildingObjects: ['Buildings',
                 function(Buildings) {
                 return Buildings.getAll();
                 }
                 ]
                 /*floorObject: ['Floors','$stateParams',
                 function( Floors, $stateParams) {
                 //console.log($stateParams.id);
                 //var it = Floors.getById($stateParams.id) ;
                 return Floors.getById($stateParams.id);
                 }
                 ]*/
            }
        })
        .state('app.floorView', {
            url: "/location/floorView/:id",
            templateUrl: "views/location/floorView.html",
            data: {pageTitle: 'Floor Setting'},
            controller: "FloorViewController",
            resolve: {
            }
        })
        .state('app.floorAdd', {
            url: "/location/floorAdd",
            templateUrl: "views/location/floorUpdate.html",
            data: {pageTitle: 'Floor Setting'},
            controller: "FloorAddController",
            resolve: {

            }
        })
        // location>room
        .state('app.roomList', {
            url: "/location/roomList",
            templateUrl: "views/location/roomList.html",
            controller: "RoomListController",
            resolve: {

            }
        })
        .state('app.roomUpdate', {
            url: "/location/roomUpdate/:id",
            templateUrl: "views/location/roomUpdate.html",
            data: {pageTitle: 'Room Setting'},
            controller: "RoomUpdateController",
            resolve: {

            }
        })
        .state('app.roomView', {
            url: "/location/roomView/:id",
            templateUrl: "views/location/roomView.html",
            data: {pageTitle: 'Room Setting'},
            controller: "RoomViewController",
            resolve: {
            }
        })
        .state('app.roomAdd', {
            url: "/location/roomAdd",
            templateUrl: "views/location/roomUpdate.html",
            data: {pageTitle: 'Room Setting'},
            controller: "RoomAddController",
            resolve: {

            }
        })
        // device>CO2AFS
        .state('app.co2AFSList', {
            url: "/device/co2AFSList",
            templateUrl: "views/safetyDevice/co2AFSList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "CO2AFSListController",
            resolve: {

            }
        })
        .state('app.co2AFSUpdate', {
            url: "/device/co2AFSUpdate/:id",
            templateUrl: "views/safetyDevice/co2AFSUpdate.html",
            data: {pageTitle: 'CO2AFS Setting'},
            controller: "CO2AFSUpdateController",
            resolve: {

            }
        })
        .state('app.co2AFSView', {
            url: "/device/co2AFSView/:id",
            templateUrl: "views/safetyDevice/co2AFSView.html",
            data: {pageTitle: 'CO2AFS Setting'},
            controller: "CO2AFSViewController",
            resolve: {
            }
        })
        .state('app.co2AFSAdd', {
            url: "/device/co2AFSAdd",
            templateUrl: "views/safetyDevice/co2AFSUpdate.html",
            data: {pageTitle: 'CO2AFS Setting'},
            controller: "CO2AFSAddController",
            resolve: {

            }
        })
        // device>FM200
        .state('app.FM200List', {
            url: "/device/FM200List",
            templateUrl: "views/safetyDevice/FM200List.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "FM200ListController",
            resolve: {

            }
        })
        .state('app.FM200Update', {
            url: "/device/FM200Update/:id",
            templateUrl: "views/safetyDevice/FM200Update.html",
            data: {pageTitle: 'FM200 Setting'},
            controller: "FM200UpdateController",
            resolve: {

            }
        })
        .state('app.FM200View', {
            url: "/device/FM200View/:id",
            templateUrl: "views/safetyDevice/FM200View.html",
            data: {pageTitle: 'FM200 Setting'},
            controller: "FM200ViewController",
            resolve: {
            }
        })
        .state('app.FM200Add', {
            url: "/device/FM200Add",
            templateUrl: "views/safetyDevice/FM200Update.html",
            data: {pageTitle: 'FM200 Setting'},
            controller: "FM200AddController",
            resolve: {

            }
        })
        // device>VESDA
        .state('app.VESDAList', {
            url: "/device/VESDAList",
            templateUrl: "views/safetyDevice/VESDAList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "VESDAListController",
            resolve: {

            }
        })
        .state('app.VESDAUpdate', {
            url: "/device/VESDAUpdate/:id",
            templateUrl: "views/safetyDevice/VESDAUpdate.html",
            data: {pageTitle: 'VESDA Setting'},
            controller: "VESDAUpdateController",
            resolve: {

            }
        })
        .state('app.VESDAView', {
            url: "/device/VESDAView/:id",
            templateUrl: "views/safetyDevice/VESDAView.html",
            data: {pageTitle: 'VESDA Setting'},
            controller: "VESDAViewController",
            resolve: {
            }
        })
        .state('app.VESDAAdd', {
            url: "/device/VESDAAdd",
            templateUrl: "views/safetyDevice/VESDAUpdate.html",
            data: {pageTitle: 'VESDA Setting'},
            controller: "VESDAAddController",
            resolve: {

            }
        })
        // device>PDU
        .state('app.PDUList', {
            url: "/device/PDUList",
            templateUrl: "views/device/PDUList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "PDUListController",
            resolve: {

            }
        })
        .state('app.PDUUpdate', {
            url: "/device/PDUUpdate/:id",
            templateUrl: "views/device/PDUUpdate.html",
            data: {pageTitle: 'PDU Setting'},
            controller: "PDUUpdateController",
            resolve: {

            }
        })
        .state('app.PDUView', {
            url: "/device/PDUView/:id",
            templateUrl: "views/device/PDUView.html",
            data: {pageTitle: 'PDU Setting'},
            controller: "PDUViewController",
            resolve: {
            }
        })
        .state('app.PDUAdd', {
            url: "/device/PDUAdd",
            templateUrl: "views/device/PDUUpdate.html",
            data: {pageTitle: 'PDU Setting'},
            controller: "PDUAddController",
            resolve: {

            }
        })
        // device>UPS
        .state('app.UPSList', {
            url: "/device/UPSList",
            templateUrl: "views/device/UPSList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "UPSListController",
            resolve: {

            }
        })
        .state('app.UPSUpdate', {
            url: "/device/UPSUpdate/:id",
            templateUrl: "views/device/UPSUpdate.html",
            data: {pageTitle: 'UPS Setting'},
            controller: "UPSUpdateController",
            resolve: {

            }
        })
        .state('app.UPSView', {
            url: "/device/UPSView/:id",
            templateUrl: "views/device/UPSView.html",
            data: {pageTitle: 'UPS Setting'},
            controller: "UPSViewController",
            resolve: {
            }
        })
        .state('app.UPSAdd', {
            url: "/device/UPSAdd",
            templateUrl: "views/device/UPSUpdate.html",
            data: {pageTitle: 'UPS Setting'},
            controller: "UPSAddController",
            resolve: {

            }
        })
        // device>PrimaryChilledWaterPump
        .state('app.PrimaryChilledWaterPumpList', {
            url: "/device/PrimaryChilledWaterPumpList",
            templateUrl: "views/device/PrimaryChilledWaterPumpList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "PrimaryChilledWaterPumpListController",
            resolve: {

            }
        })
        .state('app.PrimaryChilledWaterPumpUpdate', {
            url: "/device/PrimaryChilledWaterPumpUpdate/:id",
            templateUrl: "views/device/PrimaryChilledWaterPumpUpdate.html",
            data: {pageTitle: 'PrimaryChilledWaterPump Setting'},
            controller: "PrimaryChilledWaterPumpUpdateController",
            resolve: {

            }
        })
        .state('app.PrimaryChilledWaterPumpView', {
            url: "/device/PrimaryChilledWaterPumpView/:id",
            templateUrl: "views/device/PrimaryChilledWaterPumpView.html",
            data: {pageTitle: 'PrimaryChilledWaterPump Setting'},
            controller: "PrimaryChilledWaterPumpViewController",
            resolve: {
            }
        })
        .state('app.PrimaryChilledWaterPumpAdd', {
            url: "/device/PrimaryChilledWaterPumpAdd",
            templateUrl: "views/device/PrimaryChilledWaterPumpUpdate.html",
            data: {pageTitle: 'PrimaryChilledWaterPump Setting'},
            controller: "PrimaryChilledWaterPumpAddController",
            resolve: {

            }
        })
        // device>LVPanel
        .state('app.LVPanelList', {
            url: "/device/LVPanelList",
            templateUrl: "views/device/LVPanelList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "LVPanelListController",
            resolve: {

            }
        })
        .state('app.LVPanelUpdate', {
            url: "/device/LVPanelUpdate/:id",
            templateUrl: "views/device/LVPanelUpdate.html",
            data: {pageTitle: 'LVPanel Setting'},
            controller: "LVPanelUpdateController",
            resolve: {

            }
        })
        .state('app.LVPanelView', {
            url: "/device/LVPanelView/:id",
            templateUrl: "views/device/LVPanelView.html",
            data: {pageTitle: 'LVPanel Setting'},
            controller: "LVPanelViewController",
            resolve: {
            }
        })
        .state('app.LVPanelAdd', {
            url: "/device/LVPanelAdd",
            templateUrl: "views/device/LVPanelUpdate.html",
            data: {pageTitle: 'LVPanel Setting'},
            controller: "LVPanelAddController",
            resolve: {

            }
        })
        // device>CoolingWaterSandFilter
        .state('app.CoolingWaterSandFilterList', {
            url: "/device/CoolingWaterSandFilterList",
            templateUrl: "views/device/CoolingWaterSandFilterList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "CoolingWaterSandFilterListController",
            resolve: {

            }
        })
        .state('app.CoolingWaterSandFilterUpdate', {
            url: "/device/CoolingWaterSandFilterUpdate/:id",
            templateUrl: "views/device/CoolingWaterSandFilterUpdate.html",
            data: {pageTitle: 'CoolingWaterSandFilter Setting'},
            controller: "CoolingWaterSandFilterUpdateController",
            resolve: {

            }
        })
        .state('app.CoolingWaterSandFilterView', {
            url: "/device/CoolingWaterSandFilterView/:id",
            templateUrl: "views/device/CoolingWaterSandFilterView.html",
            data: {pageTitle: 'CoolingWaterSandFilter Setting'},
            controller: "CoolingWaterSandFilterViewController",
            resolve: {
            }
        })
        .state('app.CoolingWaterSandFilterAdd', {
            url: "/device/CoolingWaterSandFilterAdd",
            templateUrl: "views/device/CoolingWaterSandFilterUpdate.html",
            data: {pageTitle: 'CoolingWaterSandFilter Setting'},
            controller: "CoolingWaterSandFilterAddController",
            resolve: {

            }
        })
        // device>CoolingTower
        .state('app.CoolingTowerList', {
            url: "/device/CoolingTowerList",
            templateUrl: "views/device/CoolingTowerList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "CoolingTowerListController",
            resolve: {

            }
        })
        .state('app.CoolingTowerUpdate', {
            url: "/device/CoolingTowerUpdate/:id",
            templateUrl: "views/device/CoolingTowerUpdate.html",
            data: {pageTitle: 'CoolingTower Setting'},
            controller: "CoolingTowerUpdateController",
            resolve: {

            }
        })
        .state('app.CoolingTowerView', {
            url: "/device/CoolingTowerView/:id",
            templateUrl: "views/device/CoolingTowerView.html",
            data: {pageTitle: 'CoolingTower Setting'},
            controller: "CoolingTowerViewController",
            resolve: {
            }
        })
        .state('app.CoolingTowerAdd', {
            url: "/device/CoolingTowerAdd",
            templateUrl: "views/device/CoolingTowerUpdate.html",
            data: {pageTitle: 'CoolingTower Setting'},
            controller: "CoolingTowerAddController",
            resolve: {

            }
        })
        // device>CoolingWaterPump
        .state('app.CoolingWaterPumpList', {
            url: "/device/CoolingWaterPumpList",
            templateUrl: "views/device/CoolingWaterPumpList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "CoolingWaterPumpListController",
            resolve: {

            }
        })
        .state('app.CoolingWaterPumpUpdate', {
            url: "/device/CoolingWaterPumpUpdate/:id",
            templateUrl: "views/device/CoolingWaterPumpUpdate.html",
            data: {pageTitle: 'CoolingWaterPump Setting'},
            controller: "CoolingWaterPumpUpdateController",
            resolve: {

            }
        })
        .state('app.CoolingWaterPumpView', {
            url: "/device/CoolingWaterPumpView/:id",
            templateUrl: "views/device/CoolingWaterPumpView.html",
            data: {pageTitle: 'CoolingWaterPump Setting'},
            controller: "CoolingWaterPumpViewController",
            resolve: {
            }
        })
        .state('app.CoolingWaterPumpAdd', {
            url: "/device/CoolingWaterPumpAdd",
            templateUrl: "views/device/CoolingWaterPumpUpdate.html",
            data: {pageTitle: 'CoolingWaterPump Setting'},
            controller: "CoolingWaterPumpAddController",
            resolve: {

            }
        })
        // device>AHU2
        .state('app.AHU2List', {
            url: "/device/AHU2List",
            templateUrl: "views/device/AHU2List.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "AHU2ListController",
            resolve: {

            }
        })
        .state('app.AHU2Update', {
            url: "/device/AHU2Update/:id",
            templateUrl: "views/device/AHU2Update.html",
            data: {pageTitle: 'AHU2 Setting'},
            controller: "AHU2UpdateController",
            resolve: {

            }
        })
        .state('app.AHU2View', {
            url: "/device/AHU2View/:id",
            templateUrl: "views/device/AHU2View.html",
            data: {pageTitle: 'AHU2 Setting'},
            controller: "AHU2ViewController",
            resolve: {
            }
        })
        .state('app.AHU2Add', {
            url: "/device/AHU2Add",
            templateUrl: "views/device/AHU2Update.html",
            data: {pageTitle: 'AHU2 Setting'},
            controller: "AHU2AddController",
            resolve: {

            }
        })
        // device>PlateTypeHeatExchanger
        .state('app.PlateTypeHeatExchangerList', {
            url: "/device/PlateTypeHeatExchangerList",
            templateUrl: "views/device/PlateTypeHeatExchangerList.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "PlateTypeHeatExchangerListController",
            resolve: {

            }
        })
        .state('app.PlateTypeHeatExchangerUpdate', {
            url: "/device/PlateTypeHeatExchangerUpdate/:id",
            templateUrl: "views/device/PlateTypeHeatExchangerUpdate.html",
            data: {pageTitle: 'PlateTypeHeatExchanger Setting'},
            controller: "PlateTypeHeatExchangerUpdateController",
            resolve: {

            }
        })
        .state('app.PlateTypeHeatExchangerView', {
            url: "/device/PlateTypeHeatExchangerView/:id",
            templateUrl: "views/device/PlateTypeHeatExchangerView.html",
            data: {pageTitle: 'PlateTypeHeatExchanger Setting'},
            controller: "PlateTypeHeatExchangerViewController",
            resolve: {
            }
        })
        .state('app.PlateTypeHeatExchangerAdd', {
            url: "/device/PlateTypeHeatExchangerAdd",
            templateUrl: "views/device/PlateTypeHeatExchangerUpdate.html",
            data: {pageTitle: 'PlateTypeHeatExchanger Setting'},
            controller: "PlateTypeHeatExchangerAddController",
            resolve: {

            }
        })
        // device>HighSensibleHeatAC1
        .state('app.HighSensibleHeatAC1List', {
            url: "/device/HighSensibleHeatAC1List",
            templateUrl: "views/device/HighSensibleHeatAC1List.html",
            //data: {pageTitle: 'Building Setting'},
            //parent: "app",
            controller: "HighSensibleHeatAC1ListController",
            resolve: {

            }
        })
        .state('app.HighSensibleHeatAC1Update', {
            url: "/device/HighSensibleHeatAC1Update/:id",
            templateUrl: "views/device/HighSensibleHeatAC1Update.html",
            data: {pageTitle: 'HighSensibleHeatAC1 Setting'},
            controller: "HighSensibleHeatAC1UpdateController",
            resolve: {

            }
        })
        .state('app.HighSensibleHeatAC1View', {
            url: "/device/HighSensibleHeatAC1View/:id",
            templateUrl: "views/device/HighSensibleHeatAC1View.html",
            data: {pageTitle: 'HighSensibleHeatAC1 Setting'},
            controller: "HighSensibleHeatAC1ViewController",
            resolve: {
            }
        })
        .state('app.HighSensibleHeatAC1Add', {
            url: "/device/HighSensibleHeatAC1Add",
            templateUrl: "views/device/HighSensibleHeatAC1Update.html",
            data: {pageTitle: 'HighSensibleHeatAC1 Setting'},
            controller: "HighSensibleHeatAC1AddController",
            resolve: {

            }
        })
        // device>airCooledElectricityGenerator
        .state('app.airCooledElectricityGeneratorList', {
            url: "/device/airCooledElectricityGeneratorList",
            templateUrl: "views/device/airCooledElectricityGeneratorList.html",
            controller: "AirCooledElectricityGeneratorListController",
            resolve: {

            }
        })
        .state('app.airCooledElectricityGeneratorUpdate', {
            url: "/device/airCooledElectricityGeneratorUpdate/:id",
            templateUrl: "views/device/airCooledElectricityGeneratorUpdate.html",
            data: {pageTitle: 'AirCooledElectricityGenerator Setting'},
            controller: "AirCooledElectricityGeneratorUpdateController",
            resolve: {

            }
        })
        .state('app.airCooledElectricityGeneratorView', {
            url: "/device/airCooledElectricityGeneratorView/:id",
            templateUrl: "views/device/airCooledElectricityGeneratorView.html",
            data: {pageTitle: 'AirCooledElectricityGenerator Setting'},
            controller: "AirCooledElectricityGeneratorViewController",
            resolve: {
            }
        })
        .state('app.airCooledElectricityGeneratorAdd', {
            url: "/device/airCooledElectricityGeneratorAdd",
            templateUrl: "views/device/airCooledElectricityGeneratorUpdate.html",
            data: {pageTitle: 'AirCooledElectricityGenerator Setting'},
            controller: "AirCooledElectricityGeneratorAddController",
            resolve: {

            }
        })
        // device>sandFilter
        .state('app.sandFilterList', {
            url: "/device/sandFilterList",
            templateUrl: "views/device/sandFilterList.html",
            controller: "SandFilterListController",
            resolve: {

            }
        })
        .state('app.sandFilterUpdate', {
            url: "/device/sandFilterUpdate/:id",
            templateUrl: "views/device/sandFilterUpdate.html",
            data: {pageTitle: 'SandFilter Setting'},
            controller: "SandFilterUpdateController",
            resolve: {

            }
        })
        .state('app.sandFilterView', {
            url: "/device/sandFilterView/:id",
            templateUrl: "views/device/sandFilterView.html",
            data: {pageTitle: 'SandFilter Setting'},
            controller: "SandFilterViewController",
            resolve: {
            }
        })
        .state('app.sandFilterAdd', {
            url: "/device/sandFilterAdd",
            templateUrl: "views/device/sandFilterUpdate.html",
            data: {pageTitle: 'SandFilter Setting'},
            controller: "SandFilterAddController",
            resolve: {

            }
        })
        // device>leakSensor
        .state('app.leakSensorList', {
            url: "/device/leakSensorList",
            templateUrl: "views/device/leakSensorList.html",
            controller: "LeakSensorListController",
            resolve: {

            }
        })
        .state('app.leakSensorUpdate', {
            url: "/device/leakSensorUpdate/:id",
            templateUrl: "views/device/leakSensorUpdate.html",
            data: {pageTitle: 'LeakSensor Setting'},
            controller: "LeakSensorUpdateController",
            resolve: {

            }
        })
        .state('app.leakSensorView', {
            url: "/device/leakSensorView/:id",
            templateUrl: "views/device/leakSensorView.html",
            data: {pageTitle: 'LeakSensor Setting'},
            controller: "LeakSensorViewController",
            resolve: {
            }
        })
        .state('app.leakSensorAdd', {
            url: "/device/leakSensorAdd",
            templateUrl: "views/device/leakSensorUpdate.html",
            data: {pageTitle: 'LeakSensor Setting'},
            controller: "LeakSensorAddController",
            resolve: {

            }
        })
        // device>naturalCirculationWaterCoolingPump
        .state('app.naturalCirculationWaterCoolingPumpList', {
            url: "/device/naturalCirculationWaterCoolingPumpList",
            templateUrl: "views/device/naturalCirculationWaterCoolingPumpList.html",
            controller: "NaturalCirculationWaterCoolingPumpListController",
            resolve: {

            }
        })
        .state('app.naturalCirculationWaterCoolingPumpUpdate', {
            url: "/device/naturalCirculationWaterCoolingPumpUpdate/:id",
            templateUrl: "views/device/naturalCirculationWaterCoolingPumpUpdate.html",
            data: {pageTitle: 'NaturalCirculationWaterCoolingPump Setting'},
            controller: "NaturalCirculationWaterCoolingPumpUpdateController",
            resolve: {

            }
        })
        .state('app.naturalCirculationWaterCoolingPumpView', {
            url: "/device/naturalCirculationWaterCoolingPumpView/:id",
            templateUrl: "views/device/naturalCirculationWaterCoolingPumpView.html",
            data: {pageTitle: 'NaturalCirculationWaterCoolingPump Setting'},
            controller: "NaturalCirculationWaterCoolingPumpViewController",
            resolve: {
            }
        })
        .state('app.naturalCirculationWaterCoolingPumpAdd', {
            url: "/device/naturalCirculationWaterCoolingPumpAdd",
            templateUrl: "views/device/naturalCirculationWaterCoolingPumpUpdate.html",
            data: {pageTitle: 'NaturalCirculationWaterCoolingPump Setting'},
            controller: "NaturalCirculationWaterCoolingPumpAddController",
            resolve: {

            }
        })
        // device>AHU1
        .state('app.AHU1List', {
            url: "/device/AHU1List",
            templateUrl: "views/device/AHU1List.html",
            controller: "AHU1ListController",
            resolve: {

            }
        })
        .state('app.AHU1Update', {
            url: "/device/AHU1Update/:id",
            templateUrl: "views/device/AHU1Update.html",
            data: {pageTitle: 'AHU1 Setting'},
            controller: "AHU1UpdateController",
            resolve: {

            }
        })
        .state('app.AHU1View', {
            url: "/device/AHU1View/:id",
            templateUrl: "views/device/AHU1View.html",
            data: {pageTitle: 'AHU1 Setting'},
            controller: "AHU1ViewController",
            resolve: {
            }
        })
        .state('app.AHU1Add', {
            url: "/device/AHU1Add",
            templateUrl: "views/device/AHU1Update.html",
            data: {pageTitle: 'AHU1 Setting'},
            controller: "AHU1AddController",
            resolve: {

            }
        })
        // device>airSupplyAndExhaust
        .state('app.airSupplyAndExhaustList', {
            url: "/device/airSupplyAndExhaustList",
            templateUrl: "views/device/airSupplyAndExhaustList.html",
            controller: "AirSupplyAndExhaustListController",
            resolve: {

            }
        })
        .state('app.airSupplyAndExhaustUpdate', {
            url: "/device/airSupplyAndExhaustUpdate/:id",
            templateUrl: "views/device/airSupplyAndExhaustUpdate.html",
            data: {pageTitle: 'AirSupplyAndExhaust Setting'},
            controller: "AirSupplyAndExhaustUpdateController",
            resolve: {

            }
        })
        .state('app.airSupplyAndExhaustView', {
            url: "/device/airSupplyAndExhaustView/:id",
            templateUrl: "views/device/airSupplyAndExhaustView.html",
            data: {pageTitle: 'AirSupplyAndExhaust Setting'},
            controller: "AirSupplyAndExhaustViewController",
            resolve: {
            }
        })
        .state('app.airSupplyAndExhaustAdd', {
            url: "/device/airSupplyAndExhaustAdd",
            templateUrl: "views/device/airSupplyAndExhaustUpdate.html",
            data: {pageTitle: 'AirSupplyAndExhaust Setting'},
            controller: "AirSupplyAndExhaustAddController",
            resolve: {

            }
        })
        // device>centrifugalChiller
        .state('app.centrifugalChillerList', {
            url: "/device/centrifugalChillerList",
            templateUrl: "views/device/centrifugalChillerList.html",
            controller: "CentrifugalChillerListController",
            resolve: {

            }
        })
        .state('app.centrifugalChillerUpdate', {
            url: "/device/centrifugalChillerUpdate/:id",
            templateUrl: "views/device/centrifugalChillerUpdate.html",
            data: {pageTitle: 'CentrifugalChiller Setting'},
            controller: "CentrifugalChillerUpdateController",
            resolve: {

            }
        })
        .state('app.centrifugalChillerView', {
            url: "/device/centrifugalChillerView/:id",
            templateUrl: "views/device/centrifugalChillerView.html",
            data: {pageTitle: 'CentrifugalChiller Setting'},
            controller: "CentrifugalChillerViewController",
            resolve: {
            }
        })
        .state('app.centrifugalChillerAdd', {
            url: "/device/centrifugalChillerAdd",
            templateUrl: "views/device/centrifugalChillerUpdate.html",
            data: {pageTitle: 'CentrifugalChiller Setting'},
            controller: "CentrifugalChillerAddController",
            resolve: {

            }
        })
        // device>HVPanel
        .state('app.HVPanelList', {
            url: "/device/HVPanelList",
            templateUrl: "views/device/HVPanelList.html",
            controller: "HVPanelListController",
            resolve: {

            }
        })
        .state('app.HVPanelUpdate', {
            url: "/device/HVPanelUpdate/:id",
            templateUrl: "views/device/HVPanelUpdate.html",
            data: {pageTitle: 'HVPanel Setting'},
            controller: "HVPanelUpdateController",
            resolve: {

            }
        })
        .state('app.HVPanelView', {
            url: "/device/HVPanelView/:id",
            templateUrl: "views/device/HVPanelView.html",
            data: {pageTitle: 'HVPanel Setting'},
            controller: "HVPanelViewController",
            resolve: {
            }
        })
        .state('app.HVPanelAdd', {
            url: "/device/HVPanelAdd",
            templateUrl: "views/device/HVPanelUpdate.html",
            data: {pageTitle: 'HVPanel Setting'},
            controller: "HVPanelAddController",
            resolve: {

            }
        })
        // device>highSensibleHeatDirectEvaporation
        .state('app.highSensibleHeatDirectEvaporationList', {
            url: "/device/highSensibleHeatDirectEvaporationList",
            templateUrl: "views/device/highSensibleHeatDirectEvaporationList.html",
            controller: "HighSensibleHeatDirectEvaporationListController",
            resolve: {

            }
        })
        .state('app.highSensibleHeatDirectEvaporationUpdate', {
            url: "/device/highSensibleHeatDirectEvaporationUpdate/:id",
            templateUrl: "views/device/highSensibleHeatDirectEvaporationUpdate.html",
            data: {pageTitle: 'HighSensibleHeatDirectEvaporation Setting'},
            controller: "HighSensibleHeatDirectEvaporationUpdateController",
            resolve: {

            }
        })
        .state('app.highSensibleHeatDirectEvaporationView', {
            url: "/device/highSensibleHeatDirectEvaporationView/:id",
            templateUrl: "views/device/highSensibleHeatDirectEvaporationView.html",
            data: {pageTitle: 'HighSensibleHeatDirectEvaporation Setting'},
            controller: "HighSensibleHeatDirectEvaporationViewController",
            resolve: {
            }
        })
        .state('app.highSensibleHeatDirectEvaporationAdd', {
            url: "/device/highSensibleHeatDirectEvaporationAdd",
            templateUrl: "views/device/highSensibleHeatDirectEvaporationUpdate.html",
            data: {pageTitle: 'HighSensibleHeatDirectEvaporation Setting'},
            controller: "HighSensibleHeatDirectEvaporationAddController",
            resolve: {

            }
        })
        // device>highSensibleHeatAC
        .state('app.highSensibleHeatACList', {
            url: "/device/highSensibleHeatACList",
            templateUrl: "views/device/highSensibleHeatACList.html",
            controller: "HighSensibleHeatACListController",
            resolve: {

            }
        })
        .state('app.highSensibleHeatACUpdate', {
            url: "/device/highSensibleHeatACUpdate/:id",
            templateUrl: "views/device/highSensibleHeatACUpdate.html",
            data: {pageTitle: 'HighSensibleHeatAC Setting'},
            controller: "HighSensibleHeatACUpdateController",
            resolve: {

            }
        })
        .state('app.highSensibleHeatACView', {
            url: "/device/highSensibleHeatACView/:id",
            templateUrl: "views/device/highSensibleHeatACView.html",
            data: {pageTitle: 'HighSensibleHeatAC Setting'},
            controller: "HighSensibleHeatACViewController",
            resolve: {
            }
        })
        .state('app.highSensibleHeatACAdd', {
            url: "/device/highSensibleHeatACAdd",
            templateUrl: "views/device/highSensibleHeatACUpdate.html",
            data: {pageTitle: 'HighSensibleHeatAC Setting'},
            controller: "highSensibleHeatACAddController",
            resolve: {

            }
        })
        // workorder>MaintenanceRequest
        .state('app.MaintenanceRequestList', {
            url: "/workorder/MaintenanceRequestList",
            templateUrl: "views/workorder/MaintenanceRequestList.html",
            controller: "MaintenanceRequestListController",
            resolve: {

            }
        })
        .state('app.MaintenanceRequestUpdate', {
            url: "/workorder/MaintenanceRequestUpdate/:id",
            templateUrl: "views/workorder/MaintenanceRequestUpdate.html",
            data: {pageTitle: 'MaintenanceRequest Setting'},
            controller: "MaintenanceRequestUpdateController",
            resolve: {

            }
        })
        .state('app.MaintenanceRequestView', {
            url: "/workorder/MaintenanceRequestView/:id",
            templateUrl: "views/workorder/MaintenanceRequestView.html",
            data: {pageTitle: 'MaintenanceRequest Setting'},
            controller: "MaintenanceRequestViewController",
            resolve: {
            }
        })
        .state('app.MaintenanceRequestAdd', {
            url: "/workorder/MaintenanceRequestAdd",
            templateUrl: "views/workorder/MaintenanceRequestUpdate.html",
            data: {pageTitle: 'MaintenanceRequest Setting'},
            controller: "MaintenanceRequestAddController",
            resolve: {

            }
        })
        // workorder>OPPatrol
        .state('app.OPPatrolList', {
            url: "/workorder/OPPatrolList",
            templateUrl: "views/workorder/OPPatrolList.html",
            controller: "OPPatrolListController",
            resolve: {

            }
        })
        .state('app.OPPatrolUpdate', {
            url: "/workorder/OPPatrolUpdate/:id",
            templateUrl: "views/workorder/OPPatrolUpdate.html",
            data: {pageTitle: 'OPPatrol Setting'},
            controller: "OPPatrolUpdateController",
            resolve: {

            }
        })
        .state('app.OPPatrolView', {
            url: "/workorder/OPPatrolView/:id",
            templateUrl: "views/workorder/OPPatrolView.html",
            data: {pageTitle: 'OPPatrol Setting'},
            controller: "OPPatrolViewController",
            resolve: {
            }
        })
        .state('app.OPPatrolAdd', {
            url: "/workorder/OPPatrolAdd",
            templateUrl: "views/workorder/OPPatrolUpdate.html",
            data: {pageTitle: 'OPPatrol Setting'},
            controller: "OPPatrolAddController",
            resolve: {

            }
        })
        // workorder>ContractorPatrol
        .state('app.ContractorPatrolList', {
            url: "/workorder/ContractorPatrolList",
            templateUrl: "views/workorder/ContractorPatrolList.html",
            controller: "ContractorPatrolListController",
            resolve: {

            }
        })
        .state('app.ContractorPatrolUpdate', {
            url: "/workorder/ContractorPatrolUpdate/:id",
            templateUrl: "views/workorder/ContractorPatrolUpdate.html",
            data: {pageTitle: 'ContractorPatrol Setting'},
            controller: "ContractorPatrolUpdateController",
            resolve: {

            }
        })
        .state('app.ContractorPatrolView', {
            url: "/workorder/ContractorPatrolView/:id",
            templateUrl: "views/workorder/ContractorPatrolView.html",
            data: {pageTitle: 'ContractorPatrol Setting'},
            controller: "ContractorPatrolViewController",
            resolve: {
            }
        })
        .state('app.ContractorPatrolAdd', {
            url: "/workorder/ContractorPatrolAdd",
            templateUrl: "views/workorder/ContractorPatrolUpdate.html",
            data: {pageTitle: 'ContractorPatrol Setting'},
            controller: "ContractorPatrolAddController",
            resolve: {

            }
        })
        // Advanced Datatables
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/select2/select2.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                            'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                            'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

                            'assets/global/plugins/select2/select2.min.js',
                            'assets/global/plugins/datatables/all.min.js',
                            'js/scripts/table-advanced2.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // OLD Dashboard
        .state('dashboard2', {
            url: "/dashboard2.html",
            templateUrl: "views/dashboard2.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/admin/pages/css/tasks.css',

                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',

                            'assets/admin/pages/scripts/index3.js',
                            'assets/admin/pages/scripts/tasks.js',
                            'js/controllers/DashboardController.js'
                        ]
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('fileupload', {
            url: "/file_upload.html",
            templateUrl: "views/file_upload.html",
            data: {pageTitle: 'AngularJS File Upload'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'angularFileUpload',
                        files: [
                            'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select.html",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap.html",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            'assets/global/plugins/jstree/dist/jstree.min.js',
                            'assets/admin/pages/scripts/ui-tree.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'assets/global/plugins/jquery-tags-input/jquery.tagsinput.css',
                            'assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            'assets/global/plugins/typeahead/typeahead.css',

                            'assets/global/plugins/fuelux/js/spinner.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            'assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            'assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            'assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            'assets/global/plugins/jquery-tags-input/jquery.tagsinput.min.js',
                            'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            'assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            'assets/global/plugins/typeahead/handlebars.min.js',
                            'assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            'assets/admin/pages/scripts/components-form-tools.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/clockface/css/clockface.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            'assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            'assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            'assets/global/plugins/clockface/js/clockface.js',
                            'assets/global/plugins/bootstrap-daterangepicker/moment.min.js',
                            'assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                            'assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            'assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            'assets/admin/pages/scripts/components-pickers.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-select/bootstrap-select.min.css',
                            'assets/global/plugins/select2/select2.css',
                            'assets/global/plugins/jquery-multi-select/css/multi-select.css',

                            'assets/global/plugins/bootstrap-select/bootstrap-select.min.js',
                            'assets/global/plugins/select2/select2.min.js',
                            'assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js',

                            'assets/admin/pages/scripts/components-dropdowns.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/advanced.html",
            templateUrl: "views/datatables/advanced.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/select2/select2.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                            'assets/global/plugins/datatables/extensions/Scroller/css/dataTables.scroller.min.css',
                            'assets/global/plugins/datatables/extensions/ColReorder/css/dataTables.colReorder.min.css',

                            'assets/global/plugins/select2/select2.min.js',
                            'assets/global/plugins/datatables/all.min.js',
                            'js/scripts/table-advanced.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/select2/select2.css',
                            'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            'assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/select2/select2.min.js',
                            'assets/global/plugins/datatables/all.min.js',

                            'assets/global/scripts/datatable.js',
                            'js/scripts/table-ajax.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/admin/pages/css/profile.css',
                            'assets/admin/pages/css/tasks.css',

                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'assets/admin/pages/scripts/profile.js',

                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: {pageTitle: 'Todo'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'assets/global/plugins/bootstrap-datepicker/css/datepicker3.css',
                            'assets/global/plugins/select2/select2.css',
                            'assets/admin/pages/css/todo.css',

                            'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            'assets/global/plugins/select2/select2.min.js',

                            'assets/admin/pages/scripts/todo.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);




/* Init global settings and run the app */
/*MetronicApp.run(["$rootScope", "settings", "$state" , function($rootScope, settings, $state ) {
 $rootScope.$state = $state; // state to be accessed from view
 // login check

 }]);*/

//MetronicApp.run(["$rootScope", "settings", "$state",    function($rootScope, settings, $state ) {
MetronicApp.run(["$rootScope", "settings", "$state",  "LoginModal", "Restangular", function($rootScope, settings, $state,  LoginModal, Restangular) {

    var _isMobile = (function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    })();
	
    Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        headers = headers || {};
        headers['Content-Type'] = "application/json";

        //console.log ($rootScope.currentUser);
        if( $rootScope!=undefined&&$rootScope.currentUser!=undefined){
            headers['CMDBuild-Authorization'] =$rootScope.currentUser.token; //'fdl0qml8knd74vijqatdpvjpeu';
        }


    });
    Restangular.addResponseInterceptor(function(data, operation, what, url, response, $scope) {
        if (operation == "getList" || operation == "get" ) {
            data = data.data;
        }

        return data;
    });
    Restangular.setBaseUrl($baseUrl);
    Restangular.setRestangularFields({
        id: '_id'
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if(response.status === 401) {
            //refreshAccesstoken().then(function() {
            // Repeat the request and then call the handlers the usual way.


            //$http(response.config).then(responseHandler, deferred.reject);
            // Be aware that no request interceptors are called this way.
            //});
            // logout function

            $rootScope.currentUser=undefined;

            location.reload();
            $scope.error="登入逾時...";
            $rootScope.error="登入逾時...";
            //location.reload();
            return true; // error handled
        }else if(response.status === 403) {
            refreshAccesstoken().then(function() {
                // Repeat the request and then call the handlers the usual way.
                $http(response.config).then(responseHandler, deferred.reject);
                // Be aware that no request interceptors are called this way.
            });

            return true; // error handled
        }else if(response.status === 500) {
            //refreshAccesstoken().then(function() {
            // Repeat the request and then call the handlers the usual way.
            //$scope.systemMessage=response.data;
            $rootScope.systemMessage="<h4>HTTP Status "+response.status+"</h4>"+response.data;
            console.log(response.status);
            //$http(response.config).then(responseHandler, deferred.reject);
            // Be aware that no request interceptors are called this way.
            //});

            return true; // error handled
        }

        return true; // error not handled
    });

    $rootScope.$state = $state; // state to be accessed from view

    // login check
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        console.log("go to State: "+toState.name);
        $rootScope.systemMessage=undefined;
        var requireLogin = toState.data.requireLogin;
        // if(toState.data.requireLogin) requireLogin = toState.data.requireLogin;

        if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
            console.log("need login "+toState.name);
            event.preventDefault();
            //
            LoginModal()
                .then(function () {
                    console.log("then");
                    return $state.go(toState.name, toParams);
                })
                .catch(function (e) {
                    console.log("catch:" +JSON.stringify(e) );
                    //return $state.go('dashboard');
                    return $state.go(toState.name);
                });
        }else{
            console.log("logined");
            return;
        }
    });

}]);


function isPromise(value) {
    if (typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
}

// Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
// Paste this in browser's console
