var app = angular.module('app', ['ngCookies']);
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
});

app.controller('ctrl', function ($scope, $cookies, $window, svc) {
    $scope.Items = [];
    $scope.role_id = '';
    $scope.ListData = function () {
        try {
            var proc = svc.svc_ListData();

            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                console.log(data);
                if (data.ProcessSuccess) {
                    $scope.Items = data.items;
                } else {
                    console.log(data.InfoMessage);
                }

            });
        } catch (e) {
            alert(e.message);
        }

    }

    $scope.GetCookie = function () {
        console.log($cookies.get('email'));
    }

    $window.onbeforeunload = function (event) {
        $cookies.remove('email');
    };


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


    $scope.ListData();
    $scope.GetRoleID();
});