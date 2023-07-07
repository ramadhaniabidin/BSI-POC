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
    this.svc_GetRoleID = function (email) {
        var param = {
            'email': email,
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

app.controller('ctrl', function ($scope, $cookies, svc) {
    $scope.Items = [];
    $scope.role_id = '';
    $scope.login_email = '';
    $scope.GetRoleID = function () {
        var email = $scope.login_email;
        var proc = svc.svc_GetRoleID(email);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);

            if (data.ProcessSuccess) {
                console.log(data.id);
            }
            else {
                console.log(data.InfoMessage);
            }
        })
    }

    $scope.SetCookies = function () {
        $cookies.put('email', $scope.login_email);
    }

    $scope.GetCookie = function () {
        console.log($cookies.get('email'));
    }

    $scope.LoginButton = function () {
        $cookies.put('email', $scope.login_email, { expires: 'session' });
        window.location.href = '/Home.aspx';
    }

    $scope.cek_email = function () {
        console.log($scope.login_email);
    }

    /*$scope.GetRoleID();*/
    $scope.cek_email();
});