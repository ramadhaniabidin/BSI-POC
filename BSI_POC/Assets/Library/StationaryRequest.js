var app = angular.module('app', []);

app.directive('button', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                })
            }
        }
    }
})

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
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
    this.svc_InsertHeaderData = function (header) {
        var param = {
            'header': header
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/InsertHeaderData",
            data: JSON.stringify(param),
            datatype: "json"
        });

        return response;
    }


    this.svc_InsertDetailData = function (detail) {
        var param = {
            'detail': detail
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx.InsertDetailData",
            data: JSON.stringify(param),
            datatype: "json"
        })

        return response;
    }
})

app.controller('ctrl', function ($scope, svc) {
    $scope.header_data = {
        folio_no: '',
        applicant: '',
        department: '',
        role: '',
        employee_id: '',
        employee_name: 'Dhani',
        extension: '',
        status_id: 2,
        remarks: '',
        created_by: 'Dhani',
        created_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        modified_by: 'Dhani',
        modified_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
    };

    $scope.details_data = {
        header_id: '',
        no: '',
        item_name: '',
        uom: '',
        request_qty: '',
        reason: '',
    }

    //$scope.detail_table = document.getElementById("semprot_lahan");
    //$scope.row_detail = $scope.detail_table.getElementsByTagName("tr");
    //$scope.row_count = $scope.row_detail.length;


    $scope.InsertDataHeader = function () {
        var params = {
            header: {
                folio_no: $scope.header_data.folio_no,
                applicant: $scope.header_data.applicant,
                department: $scope.header_data.department,
                role: $scope.header_data.role,
                employee_id: $scope.header_data.employee_id,
                employee_name: $scope.header_data.employee_name,
                extension: $scope.header_data.extension,
                status_id: $scope.header_data.status_id,
                remarks: $scope.header_data.remarks,
                created_by: $scope.header_data.created_by,
                created_date: $scope.header_data.created_date,
                modified_by: $scope.header_data.modified_by,
                modified_date: $scope.header_data.modified_date
            }
        }

        console.log(params);
        svc.svc_InsertHeaderData(params.header).
            then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                console.log(resp_data);
                if (resp_data.ProcessSuccess) {
                    window.alert("Success, Writen header ID : " + resp_data.InfoMessage.toString());
                    window.location.href = '/Pages/StationaryRequest.aspx';
                }
                else {
                    window.alert("Error : " + resp_data.InfoMessage);
                }
            });
    }

    $scope.InsertDataDetail = function () {
        $scope.detailArray = [];
        //var det = {
        //    header_id = $scope.details_data.header_id,
        //    no = $scope.details_data.no,
        //    item_name = $scope.details_data.item_name,
        //    uom = $scope.details_data.uom,
        //    request_qty = $scope.details_data.request_qty,
        //    reason = $scope.details_data.reason
        //}
        //for (var i = 0; i < $scope.details_data.length; i++) {
        //    $scope.detailArray.push($scope.details_data[i]);
        //}
        //forEach(i in $scope.rows){
        //    console.log(i);
        //}

        for (i of $scope.rows) {
            console.log(i);
        }

        /*console.log($scope.rows)*/

        /*$scope.detailArray.push($scope.details_data);*/
        /*console.log($scope.detailArray);*/


        //svc.svc_InsertDetailData($scope.details_data).
        //    then(function (response) {
        //        var resp_data = JSON.parse(response.data.d);
        //        console.log(resp_data);
        //        if (resp_data.ProcessSuccess) {
        //            window.alert("Success, Writen detail ID : " + resp_data.InfoMessage.toString());
        //            window.location.href = '/Pages/StationaryRequest.aspx';
        //        }
        //        else {
        //            window.alert("Error : " + resp_data.InfoMessage);
        //        }
        //    });



    }

    $scope.rows = [{
        item_name: '',
        uom: '',
        request_qty: '',
        reason: ''
    }];

    $scope.itemNames = ['A4 Paper', 'Pencil', 'Marker', 'Envelope'];

    $scope.addRow = function () {
        $scope.rows.push({
            item_name: '',
            uom: '',
            request_qty: '',
            reason: ''
        });
    };


})