var app = angular.module('app', ['angular.filter']);

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

    this.svc_GetData = function (folio_no) {
        var param = {
            folio_no: folio_no,
        }

        console.log(param);
        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetDataByFolioNo",
            data: JSON.stringify(param),
            dataType: "json"
        })
    }




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


    this.svc_InsertDetailData = function (details) {
        var param = {
            'details': details
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/InsertDetailData",
            data: JSON.stringify(param),
            datatype: "json"
        })

        return response;
    }

    //this.RolesData = function () {

    //    //var response = $http({
    //    //    method: 'get',
    //    //    url: "/WebServices/StationaryRequest.asmx/GetRoles?"
    //    //})

    //    //return response.data;

    //};

    this.RolesData = function () {
        return $http({
            method: 'get',
            url: "/WebServices/StationaryRequest.asmx/GetRoles"
        }).then(function (response) {
            return response.data;
        });
    };

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
        status_id: -1,
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

    $scope.Items = [];

    //$scope.detail_table = document.getElementById("semprot_lahan");
    //$scope.row_detail = $scope.detail_table.getElementsByTagName("tr");
    //$scope.row_count = $scope.row_detail.length;

    
    $scope.InsertDataHeader = function () {
        if (($scope.approver == "Section Head") || ($scope.approver == "Dept Head")) {
            $scope.header_data.status_id = 1
        }
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

        for (i of $scope.rows) {
            var params = {
                details: {
                    //header_id: '',
                    //no: '',
                    item_name: i.item_name,
                    uom: i.uom,
                    request_qty: parseInt(i.request_qty, 10),
                    reason: i.reason
                }
            }

            console.log(params);
            svc.svc_InsertDetailData(params.details).
                then(function (response) {
                    var resp_data = JSON.parse(response.data.d);
                    console.log(resp_data);
                    if (resp_data.ProcessSuccess) {
                        window.alert("Success, Writen detail ID : " + resp_data.InfoMessage.toString());
                        window.location.href = '/Pages/StationaryRequest.aspx';
                    }
                    else {
                        window.alert("Error : " + resp_data.InfoMessage);
                    }
                })
        }

        //for (i of $scope.rows) {
        //    console.log(i.item_name);
        //}


    };

    $scope.CekTabel = function () {
        for (i of $scope.rows) {
            console.log(i.item_name + ', ' + i.uom + ', ' + i.request_qty + ', ' + i.reason);
        }
        if (($scope.approver == "Section Head") || ($scope.approver == "Dept Head")) {
            $scope.header_data.status_id = 1
        }

        console.log($scope.header_data.status_id);
    }

    $scope.rows = [{
        item_name: '',
        uom: '',
        request_qty: 0,
        reason: ''
    }];

    $scope.itemNames = ['A4 Paper', 'Pencil', 'Marker', 'Envelope'];
    $scope.uoms = ["Rim", "Piece"];

    $scope.addRow = function () {
        $scope.rows.push({
            item_name: '',
            uom: '',
            request_qty: 0,
            reason: ''
        });
    };


    $scope.insertData = function () {
        $scope.InsertDataHeader();
        $scope.InsertDataDetail();
    }

    $scope.roles = ["Internal Section Head", "Internal Dept Head", "GA Staff", "GA Section Head", "Requestor"]
    $scope.approver = '';

    $scope.approver_list = ["Section Head", "Dept Head"];

    $scope.GetData = function () {
        var folio_no = GetQueryString()["folio_no"];
        console.log(folio_no);


        var proc = svc.svc_GetData(folio_no);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);

            if (data.ProcessSuccess) {
                var h = data._header;
                $scope.header_data = h;
                $scope.Items = data._detail;
            }
            else {
                console.log(data.InfoMessage);
            }
        })
    }
})