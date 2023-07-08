var app = angular.module('app', ['angular.filter', 'ngCookies']);

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

        /*console.log(param);*/
        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetDataByFolioNo",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }




    this.svc_InsertHeaderData = function (header, detail) {
        var param = {
            'header': header,
            'detail': detail,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/InsertHeaderData",
            data: JSON.stringify(param),
            datatype: "json"
        });

        return response;
    }

    this.svc_ConfirmStationary = function (header, detail) {
        var param = {
            'header': header,
            'detail': detail,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/InsertHeaderData",
            data: JSON.stringify(param),
            datatype: "json"
        })

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

    this.RolesData = function () {
        return $http({
            method: 'get',
            url: "/WebServices/StationaryRequest.asmx/GetRoles"
        }).then(function (response) {
            return response.data;
        });
    };

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

})

app.controller('ctrl', function ($scope, $cookies, svc) {
    $scope.header_data = {
        folio_no: '',
        applicant: '',
        department: '',
        role: '',
        employee_id: 1,
        employee_name: 'Dhani',
        extension: '',
        status_id: 1,
        remarks: '',
        created_by: 'Dhani',
        created_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        modified_by: 'Dhani',
        modified_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        approver_target_role_id: 0,
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

    $scope.InsertDataHeader = function () {
        var detail = []
        for (var i = 0; i < $scope.rows.length; i++) {
            detail.push({
                item_name: $scope.rows[i].item_name,
                no: i + 1,
                uom: $scope.rows[i].uom,
                request_qty: $scope.rows[i].request_qty,
                reason: $scope.rows[i].reason,
            })
        }

        $scope.created_date = new moment().format("DD-MMM-YYYY");
        $scope.created_dateFormatted = new moment($scope.created_date, "DD-MMM-YYYY").format("YYYY-MM-DD HH:mm:ss");
        if ($scope.approver == "Internal Section Head") {
            $scope.header_data.approver_target_role_id = 1
        }
        else if ($scope.approver == "Internal Dept Head") {
            $scope.header_data.approver_target_role_id = 2
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
                created_date: $scope.created_dateFormatted,
                modified_by: $scope.header_data.modified_by,
                modified_date: $scope.created_dateFormatted,
                approver_target_role_id: $scope.header_data.approver_target_role_id,
            },
            detail: detail,
        }

        console.log(params);
        svc.svc_InsertHeaderData(params.header, params.detail).
            then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                console.log(resp_data);
                if (resp_data.ProcessSuccess) {
                    window.alert("Successfully Insert/Update data, Status : " + resp_data.InfoMessage.toString());
                    window.location.href = '/Home.aspx';
                }
                else {
                    window.alert("Error : " + resp_data.InfoMessage);
                }
            });
    }

    $scope.ConfirmStationary = function () {
        var detail = []
        for (var i = 0; i < $scope.rows.length; i++) {
            detail.push({
                item_name: $scope.rows[i].item_name,
                no: i + 1,
                uom: $scope.rows[i].uom,
                request_qty: $scope.rows[i].request_qty,
                reason: $scope.rows[i].reason,
            })
        }

        $scope.created_date = new moment().format("DD-MMM-YYYY");
        $scope.created_dateFormatted = new moment($scope.created_date, "DD-MMM-YYYY").format("YYYY-MM-DD HH:mm:ss");
        if ($scope.approver == "Internal Section Head") {
            $scope.header_data.approver_target_role_id = 1
        }
        else if ($scope.approver == "Internal Dept Head") {
            $scope.header_data.approver_target_role_id = 2
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
                status_id: 6,
                remarks: $scope.header_data.remarks,
                created_by: $scope.header_data.created_by,
                created_date: $scope.created_dateFormatted,
                modified_by: $scope.header_data.modified_by,
                modified_date: $scope.created_dateFormatted,
                approver_target_role_id: $scope.header_data.approver_target_role_id,
            },
            detail: detail,
        }

        svc.svc_ConfirmStationary(params.header, params.detail).
            then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                console.log(resp_data);
                if (resp_data.ProcessSuccess) {
                    window.alert("Successfully Insert/Update data, Status : " + resp_data.InfoMessage.toString());
                    window.location.href = '/Home.aspx';
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
                        window.alert("Successfully Insert/Update data, Status : " + resp_data.InfoMessage.toString());
                        window.location.href = '/Home.aspx';
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
            console.log($scope.rows.length + ', ' + i.uom + ', ' + i.request_qty + ', ' + i.reason);
        }

        //for (var i = 0; i < $scope.rows.length; i++){
        //    console.log('Index : ' + (i + 1) + ', Item name : ' + $scope.rows[i].item_name)
        //}

        if (($scope.approver == "Section Head") || ($scope.approver == "Dept Head")) {
            $scope.header_data.status_id = 1
        }
        $scope.created_date = new moment().format("DD-MMM-YYYY").toString();
        $scope.created_dateFormatted = new moment($scope.created_date, "DD-MMM-YYYY").format("YYYY-MM-DD HH:mm:ss").toString();

        /*console.log($scope.header_data.status_id + ', ' + $scope.created_dateFormatted + ', ' + $scope.approve_value);*/
    }

    $scope.rows = [{
        item_name: '',
        no: '',
        uom: '',
        request_qty: 0,
        reason: ''
    }];

    $scope.itemNames = ['A4 Paper', 'Pencil', 'Marker', 'Envelope'];
    $scope.uoms = ["Rim", "Piece"];

    $scope.addRow = function () {
        $scope.rows.push({
            item_name: '',
            no: '',
            uom: '',
            request_qty: 0,
            reason: ''
        });
    };


    $scope.insertData = function () {
        $scope.InsertDataHeader();
        $scope.InsertDataDetail();
    }

    $scope.role_id = '';

    $scope.roles = ["Internal Section Head", "Internal Dept Head", "GA Staff", "GA Section Head", "Requestor"]
    $scope.approver = '';

    $scope.approver_list = ["Internal Section Head", "Internal Dept Head"];

    $scope.approve_value = '';

    $scope.GetData = function () {
        var appr = document.getElementById("approver");
        var approval = document.getElementById("approval");
        var submit = document.getElementById("submit");
        var close = document.getElementById("close");
        var delivered = document.getElementById("delivered");

        console.log(window.localStorage.getItem('email'));
        console.log(window.localStorage.getItem('role_id'));
        $scope.role_id = window.localStorage.getItem('role_id');
        console.log($scope.role_id);

        if ($scope.role_id === '0') {
            console.log($scope.role_id);
            approval.style.display = "none";

        }
        else if (($scope.role_id === '1') || ($scope.role_id === '2')) {
            console.log($scope.role_id);
            appr.style.display = "none";
        }

        else if (($scope.role_id === '3') || ($scope.role_id === '4')) {
            console.log($scope.role_id);
            appr.style.display = "none";
        }

        var folio_no = GetQueryString()["folio_no"];
        var proc = svc.svc_GetData(folio_no);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);
            if (data.ProcessSuccess) {
                var h = data._header;
                $scope.header_data = h;
                $scope.rows = data._detail;
                console.log(data._header);
                console.log(data._detail);

            }
            else {
                console.log(data.InfoMessage);
            }
        })




    }

    $scope.GetCookie = function () {
        console.log($cookies.get('email'));
    }

    $scope.LogOut = function () {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role_id');
        window.location.href = "/Login.aspx";
    }

    $scope.GetData();
})