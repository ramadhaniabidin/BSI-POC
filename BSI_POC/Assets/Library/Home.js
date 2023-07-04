var app = angular.module('app', []);
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
});

app.controller('ctrl', function ($scope, svc) {
    $scope.Items = [];
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

    $scope.ListData();
});