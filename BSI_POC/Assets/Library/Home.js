var app = angular.module('app', ['angular.filter']);
app.directive('button', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                });
            }
        }
    };
});
app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };

}]);

app.service("svc", function ($http) {
    this.svc_ListData = function () {
        var response = $http({
            method: "post",
            url: "/WebServices/Home.asmx/ListData",
            //data: JSON.stringify(param),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });
        return response;
    }

    this.svc_ListDataByID = function (current_approver_role) {
        var param = {
            'current_approver_role': current_approver_role
        }

        var response = $http({
            method: "post",
            url: "/WebServices/Home.asmx/ListDataByID",
            data: JSON.stringify(param),
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        })

        console.log(param);

        return response;
    }

    this.svc_GetRoleID = function (email) {
        var param = {
            email: email
        }

        var response = $http({
            method: "post",
            url: "/WebServices/Login.asmx/GetRoleId",
            data: JSON.stringify(param),
            dataType: "json"
        });
        return response;
    }

    this.svc_GetTaskAndAssignmentID = function (header_id) {
        var param = {
            'header_id': header_id,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetTaskAndAssignmentID",
            data: JSON.stringify(param),
            dataType: "json",
        });
        console.log(response)

        return response;
    }

    this.svc_GetTasksList = function (assignee) {
        var param = {
            'assignee': assignee,
        };

        var response = $http({
            method: "post",
            url: "/WebServices/Home.asmx/GetTasksList",
            data: JSON.stringify(param),
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        console.log(param);

        return response;
    }

    this.svc_GetToken = function (client_id, client_secret, grant_type) {
        var param = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': grant_type
        }

        var response = $http({
            method: "POST",
            url: "/WebServices/StationaryRequest.asmx/GetToken",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }
});

app.controller('ctrl', function ($scope, svc) {
    $scope.Items = [];
    $scope.Item = [];
    $scope.role_id = '';
    $scope.token = '';
    $scope.task_name = '';

    $scope.GetTaskList = function () {
        try {
            var proc = svc.svc_GetTasksList(window.localStorage.getItem("email"));
            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                var taskData = JSON.parse(data.tasksJson);
                if (data.ProcessSuccess) {
                    console.log(taskData);
                    //for (var i = 0; i < taskData.length; i++) {
                    //    console.log("Task Name: " + taskData[i].name)
                    //    console.log("Assignee: " + taskData[i].taskAssignments[0].assignee);
                    //}
                    $scope.task_id = taskData["name"];
                    $scope.assignment_id = taskData.taskAssignments[0]["assignee"];

                    window.localStorage.setItem("taks_name", taskData["name"]);

                    //console.log("Task Name: " + $scope.task_id);
                    //console.log("Assignee: " + $scope.assignment_id);


                }
                else {
                    console.log(data.InfoMessage);
                }
            });
        }
        catch (e) {
            alert(e.message);
        }
    }


    $scope.ListData = function () {
        try {
            var proc = svc.svc_ListData();

            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                console.log(data);
                if (data.ProcessSuccess) {
                    
                    for (i of data.items) {
                        i.created_date = parseInt((i.created_date).substring(6, i.created_date.length - 2));
                        i.created_date = new Date(i.created_date).toDateString();
                        /*var date = new Date(ticks).toDateString();*/

                        /*console.log(i.created_date);*/
                    }
                    $scope.Items = data.items;
                    console.log($scope.Items);
                    //console.log($scope.task_id);
                    //console.log($scope.assignment_id);
                } else {
                    console.log(data.InfoMessage);
                }

            });

            //var client_id = "f7bbb84b-b114-4120-9a5f-b0557b6dbee2";
            //var client_secret = "sNNtUWsKIRJtSsOtTsJPLtSsMNJMLtUsMPtUsI2VsJtWsINMtPsNtW2MtVsRtUUsFRtSTWsFMtTVsPFtRsK2osFtTsP2jsLOKtRsMM2p";
            //var grant_type = "client_credentials";

            //var proc1 = svc.svc_GetToken(client_id, client_secret, grant_type);
            //proc1.then(function (response) {
            //    var data = JSON.parse(response.data.d);
            //    $scope.token = data.token;
            //    console.log($scope.task_id);
            //    console.log($scope.assignment_id);
            //    //if (data.ProcessSuccess) {
                    
            //    //    /*window.localStorage.setItem("token", $scope.token);*/
            //    //    console.log($scope.token);
            //    //}
            //    //else {
            //    //    console.log(data.InfoMessage);
            //    //}
            //});
            
        } catch (e) {
            alert(e.message);
        }

    }

    $scope.ListDataByID = function () {
        try {
            //$scope.task_name = window.localStorage.getItem("taks_name");
            //var parts = $scope.task_name.split("-");
            //var header_id = parseInt(parts[parts.length - 1].trim());

            //console.log(typeof (window.localStorage.getItem("role_id")));

            //console.log(header_id);
            var role_id = parseInt(window.localStorage.getItem("role_id"));
            console.log(role_id);

            var proc = svc.svc_ListDataByID(role_id);

            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                console.log(data);
                if (data.ProcessSuccess) {
                    for (i of data.items) {
                        i.created_date = parseInt((i.created_date).substring(6, i.created_date.length - 2));
                        i.created_date = new Date(i.created_date).toDateString();
                        /*var date = new Date(ticks).toDateString();*/

                        /*console.log(i.created_date);*/
                    }

                    $scope.Item = data.items;
                    console.log($scope.Item);
                    //console.log($scope.task_id);
                    //console.log($scope.assignment_id);
                } else {
                    console.log(data.InfoMessage);
                }

            });
        }
        catch (e) {
            alert(e.message);
        }
    }


    $scope.GetToken = function () {
        var client_id = "f7bbb84b-b114-4120-9a5f-b0557b6dbee2";
        var client_secret = "sNNtUWsKIRJtSsOtTsJPLtSsMNJMLtUsMPtUsI2VsJtWsINMtPsNtW2MtVsRtUUsFRtSTWsFMtTVsPFtRsK2osFtTsP2jsLOKtRsMM2p";
        var grant_type = "client_credentials";

        var proc = svc.svc_GetToken(client_id, client_secret, grant_type);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);
            if (data.ProcessSuccess) {
                $scope.token = data.token;
                /*window.localStorage.setItem("token", $scope.token);*/
                
            }
            else {
                console.log(data.InfoMessage);
            }
        })
    }



    $scope.GetRoleID = function () {
        var proc1 = svc.svc_GetRoleID(window.localStorage.getItem('email'));
        proc1.then(function (response) {
            var data = JSON.parse(response.data.d);
            if (data.ProcessSuccess) {
                window.localStorage.setItem('role_id', data.id);
                $scope.role_id = data.id;
            }
            else {
                console.log(data.InfoMessage);
            }
        })


    }

    $scope.CekRequest = function (header_id) {


        window.location.href = "/Pages/StationaryRequest.aspx?folio_no=" + header_id;

    }

    


    
    $scope.GetRoleID();
    /*$scope.GetTaskList();*/
    var listData = document.getElementById("listData");
    var listDataByID = document.getElementById("listDataByID");

    if (window.localStorage.getItem("role_id") == "0") {
        
        $scope.ListData();
        listDataByID.style.display = "none";
    }

    else if (window.localStorage.getItem("role_id") !== "0") {
        
        $scope.ListDataByID();
        listData.style.display = "none";
    }
    
    /*$scope.GetToken();*/
    
});