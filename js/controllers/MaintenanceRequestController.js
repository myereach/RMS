//'use strict';

angular.module("rmsApp.controllers")
//MetronicApp
	.controller("MaintenanceRequestListController", function($scope,rmsServices){
		console.log("MaintenanceRequestListController");
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getAll().then(function(all){
			rmsServices.init('lookup_types/ActivityStatus/values');
			  rmsServices.getAll().then(function(allStatus){
					for(i=0; i<all.length; i++){
						var item = all[i];
						//if(item.ActivityStatus==102){
							//item.RequestStatusName = '已指派';
						//} else {
						for(j=0; j<allStatus.length; j++){
							var status = allStatus[j];
							if(status._id == item.ActivityStatus) {
								item.ActivityStatusName = status.description;
							}
						}
					}
					$scope.MaintenanceRequests = all;
					$scope.displayedCollection = [].concat(all);
					$scope.totalItemCount=$scope.displayedCollection.length;
			  })
		});
		$scope.name = "RMS";
		$scope.$on("updateMaintenanceRequests", function (event, MaintenanceRequest) {
			$scope.MaintenanceRequests.push(MaintenanceRequest);
		});

		$scope.remove = function(idx){
			bootbox.confirm("確定刪除?", function(result) {
				if (result) {
					rmsServices.delete($scope.MaintenanceRequests[idx]).then(function(){
						$scope.MaintenanceRequests.splice(idx, 1);
					});
				}
			});
		};
	})
	.controller("MaintenanceRequestViewController", function($scope, $stateParams, rmsServices){
		rmsServices.init('processes/Workorder/instances');
		rmsServices.getById($stateParams.id).then(function(MaintenanceRequest){
			rmsServices.init('lookup_types/ActivityStatus/values');
		  rmsServices.getById(MaintenanceRequest.ActivityStatus).then(function(status){
				 MaintenanceRequest.ActivityStatusName=status.description;
			});
			rmsServices.init('domains/WorkorderItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==MaintenanceRequest._id){
						MaintenanceRequest.MaintenanceRequestItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.MaintenanceRequest = MaintenanceRequest ;
		});
		$scope.nextStep = function(_id){
			//bootbox.confirm("確定刪除?", function(result) {
				
			//});
			var MaintenanceRequest = $scope.MaintenanceRequest;
			console.log("MaintenanceRequest._id = " + MaintenanceRequest._id);
			rmsServices.init('processes/Workorder/instances/' + MaintenanceRequest._id + '/activities');
			rmsServices.getAll().then(function(all){
				var activity = all[0];
				alert("activity._id = " + activity._id);
				rmsServices.init('processes/Workorder/instances');
				rmsServices.getById(MaintenanceRequest._id).then(function(MaintenanceRequest){
					MaintenanceRequest._advance = true;
					MaintenanceRequest.GotoAcceptance=251369;
					MaintenanceRequest._activity=activity._id;
					delete MaintenanceRequest.TotalTime;
					delete MaintenanceRequest.TotalWorkingTime;
					delete MaintenanceRequest.StepDuration;
					delete MaintenanceRequest.OverdueTime;
					console.log(MaintenanceRequest);
			  	rmsServices.update(MaintenanceRequest).then(function(){
			  		alert("AAA");
				    $location.path("/workorder/MaintenanceRequestList");
			  	});
				});
			});
		};
	})

	.controller("MaintenanceRequestAddController", function($rootScope, $scope, $location, rmsServices){
		//rmsServices.init('processes/Workorder/instances');

		$scope.func = "add";
		$scope.add = function(){
			var MaintenanceRequest={};
			MaintenanceRequest=$scope.MaintenanceRequest;
			//MaintenanceRequest.RequestType=1;
			var itemName = MaintenanceRequest.MaintenanceRequestItemName;
			var itemId = 0;
			var itemType = '';
      rmsServices.init('classes/ElectricalDevice/cards');
				  rmsServices.getAll().then(function(all) {
						for (i = 0; i < all.length; i++) {
							var item = all[i];
							if (item.Code == itemName) {
								itemId = item._id;
								itemType = item._type;
								break;
							}
						}
						if (itemId != 0) {
							MaintenanceRequest.Category = 94;
							MaintenanceRequest.DueHours = 8;
							MaintenanceRequest._advance = true;
							MaintenanceRequest.WorkorderLightMgmt = false;
							MaintenanceRequest.Service = 214569;
							MaintenanceRequest.Team = 214689;
							MaintenanceRequest.Priority = 117;
							MaintenanceRequest.ServiceCategory = 214527;
							MaintenanceRequest.OpeningDate = '2015-09-10T20:00:00';
							rmsServices.init('processes/Workorder/instances');
							rmsServices.create(MaintenanceRequest, function (id) {
								if (id != 0) {
									rmsServices.init('domains/WorkorderItem/relations');
						  		var obj = new Object();
						  		obj._sourceType = 'Workorder';
						  		obj._sourceId = id;
						  		obj._destinationType = itemType;
						  		obj._destinationId = itemId;
						  		obj.DefaultGroup = false;
						  		rmsServices.create(obj, function (relationId) {$location.path("/workorder/MaintenanceRequestList");});
						  	}
							});
						}
					});				
		}
		
	})
	.controller("MaintenanceRequestUpdateController", function($scope, $stateParams, $location, rmsServices){
		$scope.func = "update";
		rmsServices.init('processes/Wokorder/instances');
		rmsServices.getById($stateParams.id).then(function(MaintenanceRequest){
			rmsServices.init('lookup_types/ActivityStatus/values');
			rmsServices.getById(MaintenanceRequest.RequestStatus).then(function(status){
				MaintenanceRequest.RequestStatusName=status.description;
			});
			rmsServices.init('lookup_types/Gravity/values');
			rmsServices.getById(MaintenanceRequest.Gravity).then(function(gravity){
				MaintenanceRequest.GravityName=gravity.description;
			});
			rmsServices.init('lookup_types/Priority/values');
			rmsServices.getById(MaintenanceRequest.Priority).then(function(priority){
				MaintenanceRequest.PriorityName=priority.description;
			});
			rmsServices.init('domains/MaintenanceRequestItem/relations');
			rmsServices.getAll().then(function(all){
				for(i=0; i<all.length; i++){
					var item = all[i];
					if(item._sourceId==MaintenanceRequest._id){
						MaintenanceRequest.MaintenanceRequestItemName=item._destinationDescription;
						break;
					}
				}
			});
			$scope.MaintenanceRequest = MaintenanceRequest ;
			console.log(MaintenanceRequest);
		});

		$scope.update = function(){
			//console.log(JSON.stringify($scope.floor.myBuilding));
			//rmsServices.init('domains/BuildingFloor/relations');
			//rmsServices.getAll().then(function(buildingFloorRelations){
			rmsServices.init('processes/Workorder/instances');
			rmsServices.update($scope.MaintenanceRequest).then(function(){
				$location.path("/workorder/MaintenanceRequestList");
			});

			//});

		};

	});