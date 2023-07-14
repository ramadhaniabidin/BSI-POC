
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

    this.svc_UpdateStock = function (request_detail) {
        var param = {
            'request_detail': request_detail
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/UpdateStock",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }

    this.getStock = function (item_name) {
        var url = "/WebServices/StationaryRequest.asmx/GetStockAndUom"
        var param = {
            item_name: item_name
        }

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ProcessSuccess) {
                    return data.data;
                } else {
                    throw new Error(data.InfoMessage);
                }
            });
    }

    this.svc_GetWorkflowHistory = function (folio_no) {
        var param = {
            'folio_no': folio_no
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetWorkflowHistory",
            data: JSON.stringify(param),
            /*data: {},*/
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        })

        return response;
    }

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

    this.svc_GetCurrentLoginData = function (role_id) {
        var param = {
            'role_id': role_id,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetCurrentLoginData",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }

    this.svc_GetStockAndUom = function (item_name) {
        var param = {
            'item_name': item_name,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetStockAndUom",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }

    this.svc_GetDataByID = function (header_id) {
        var param = {
            header_id: header_id,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/GetDataByID",
            data: JSON.stringify(param),
            dataType: "json"
        })

        return response;
    }

    this.svc_ApproveRequest = function (approval_value, task_id, assignmnet_id) {
        var param = {
            'approval_value': approval_value,
            'task_id': task_id,
            'assignment_id': assignmnet_id
        }

        var config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        var url = "/WebServices/StationaryRequest.asmx/ApproveRequest";
        var response = $http.post(url, param, config);
        console.log(response);

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

    this.svc_InsertWorkflowHistory = function (input_data) {
        var param = {
            'input_data': input_data
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/InsertToWorkflowHistory",
            data: JSON.stringify(param),
            datatype: "json"
        })

        return response;
    }

    this.svc_DeliverStationary = function (header_id) {
        var param = {
            'header_id': header_id,
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/DeliverStationary",
            data: JSON.stringify(param),
            datatype: "json"
        });

        console.log(param);

        return response;
    }

    this.svc_ConfirmStationary = function (header_id) {
        var param = {
            'header_id': header_id
        }

        var response = $http({
            method: "post",
            url: "/WebServices/StationaryRequest.asmx/ConfirmStationary",
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

app.controller('ctrl', function ($scope, svc) {
    $scope.GetCurrentLoginData = function () {
        var role_id = parseInt(window.localStorage.getItem("role_id"));

        var proc = svc.svc_GetCurrentLoginData(role_id);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);
            console.log(data);
            $scope.header_data.applicant = data.data.name;
            $scope.header_data.department = data.data.department;
            $scope.header_data.role = data.data.role;
            $scope.header_data.employee_id = data.data.id;
            /*console.log($scope.header_data.applicant);*/
/*            console.log(data.data.name);*/
        })
    }


    $scope.WorkflowHistoryLog = function () {
        var folio_no = GetQueryString()["folio_no"];
        var proc = svc.svc_GetWorkflowHistory(folio_no);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);
            console.log(data.history);
            for (i of data.history) {
                i.action_date = new Date(parseInt(i.action_date.substring(6)))
                i.action_date = i.action_date.toLocaleString()
            }

            $scope.workflow_history = data.history;
        })
    }

    $scope.header_data = {
        folio_no: 'Generated on submit',
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
        current_approver_role: 0,
    };

    $scope.details_data = {
        header_id: '',
        no: '',
        item_name: '',
        uom: '',
        request_qty: '',
        reason: '',
    }
    $scope.task_id = '';
    $scope.assignment_id = '';
    $scope.token = '';

    $scope.Items = [];

    $scope.DeliverStationary = function () {
        var header_id = $scope.header_data.id;

        console.log(header_id);

        var proc = svc.svc_DeliverStationary(header_id);
        proc.then(function (response) {
            var data = JSON.parse(response.data.d);
            console.log(data);
            if (data.ProcessSuccess) {
                window.alert("Successfully Delivering stationary to the requestor, Status : " + data.InfoMessage.toString());
                window.location.href = '/Home.aspx';
            }
            else {
                window.alert("Error : " + data.InfoMessage);
            }
        })
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
                console.log($scope.token);
            }
            else {
                console.log(data.InfoMessage);
            }
        })
    }

    $scope.InsertDataHeader = function () {
        var isError = true
        var detail = []
        for (var i = 0; i < $scope.rows.length; i++) {
            detail.push({
                item_name: $scope.rows[i].item_name,
                no: i + 1,
                uom: $scope.rows[i].uom,
                stock: $scope.rows[i].stock,
                request_qty: $scope.rows[i].request_qty,
                reason: $scope.rows[i].reason,
            })
        }

        $scope.created_date = new moment().format("DD-MMM-YYYY");
        $scope.created_dateFormatted = new moment($scope.created_date, "DD-MMM-YYYY").format("YYYY-MM-DD HH:mm:ss");
        if ($scope.approver == "Internal Section Head") {
            $scope.header_data.approver_target_role_id = 1
            $scope.header_data.current_approver_role = 1
        }
        else if ($scope.approver == "Internal Dept Head") {
            $scope.header_data.approver_target_role_id = 2
            $scope.header_data.current_approver_role = 2
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
                created_date: new Date(),
                modified_by: $scope.header_data.modified_by,
                modified_date: new Date(),
                approver_target_role_id: $scope.header_data.approver_target_role_id,
                current_approver_role: $scope.header_data.current_approver_role,
            },
            detail: detail,
        }

        for (i of params.detail) {
            if ((i.item_name === null) || (i.item_name === undefined) || (i.item_name === '')) {
                isError = true;
                alert("Please Select Stationary Item");
                /*window.location.href = "/Pages/StationaryRequest.aspx"*/
            }
            /*console.log(i.item_name);*/

            else if ((params.header.current_approver_role == 0) || (params.header.current_approver_role === undefined) || (params.header.current_approver_role === null)) {
                isError = true;
                alert("Please select the next approver");
                /*window.location.href = "/Pages/StationaryRequest.aspx"*/
            }


            if (i.request_qty === 0) {
                isError = true;
                alert("Please insert the amount of request")
            }



            else {
                isError = false;
            }

        }

        if (isError == false) {
            svc.svc_InsertHeaderData(params.header, params.detail).
                then(function (response) {
                    var resp_data = JSON.parse(response.data.d);
                    console.log(resp_data);
                    if (resp_data.ProcessSuccess) {
                        /*window.alert("Successfully submitting request, Status : " + resp_data.InfoMessage.toString());*/
                        window.location.href = '/Home.aspx';
                    }
                    else {
                        window.alert("Error : " + resp_data.InfoMessage);
                    }
                });
        }




    





        /*console.log(params);*/

        /*if (params.detail)*/
        //svc.svc_InsertHeaderData(params.header, params.detail).
        //    then(function (response) {
        //        var resp_data = JSON.parse(response.data.d);
        //        console.log(resp_data);
        //        if (resp_data.ProcessSuccess) {
        //            window.alert("Successfully submitting request, Status : " + resp_data.InfoMessage.toString());
        //            window.location.href = '/Home.aspx';
        //        }
        //        else {
        //            window.alert("Error : " + resp_data.InfoMessage);
        //        }
        //    });
    }

    

    $scope.ConfirmStationary = function () {
        var header_id = $scope.header_data.id;
        console.log("header_id: " + header_id);

        console.log($scope.rows);
        console.log($scope.rows[0].header_id);

        svc.svc_UpdateStock($scope.rows)
            .then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                console.log(resp_data);
            })

        svc.svc_ConfirmStationary(header_id).
            then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                console.log(resp_data);
                if (resp_data.ProcessSuccess) {
                    window.alert("Successfully closing request, Status : " + resp_data.InfoMessage.toString());
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
        stock: '',
        request_qty: 0,
        reason: '',
        WarningMessage: false
    }];

    $scope.workflow_history = [];

    $scope.itemNames = ['A4 Paper', 'Pencil', 'Marker', 'Envelope'];
    $scope.uoms = ["Rim", "Piece"];

    $scope.addRow = function () {
        $scope.rows.push({
            item_name: '',
            no: '',
            uom: '',
            stock: '',
            request_qty: 0,
            reason: '',
            WarningMessage: false
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
        var folio_no = document.getElementById("ContentPlaceHolder1_folio_no");
        var applicant = document.getElementById("ContentPlaceHolder1_applicant");
        var department = document.getElementById("ContentPlaceHolder1_department");
        var role = document.getElementById("ContentPlaceHolder1_role");
        var employee_id = document.getElementById("ContentPlaceHolder1_employee_id");
        var extension = document.getElementById("ContentPlaceHolder1_extension");
        var details = document.getElementById("semprot_lahan");
        var btn_submit = document.getElementById("submit");
        var btn_approve = document.getElementById("approve_action");
        var workflow_history = document.getElementById("workflow_history");
        var next_approver = document.getElementById("approver");

        $scope.role_id = window.localStorage.getItem('role_id');
        folio_no.setAttribute('readonly', 'readonly');

        applicant.setAttribute('readonly', 'readonly');
        department.setAttribute('readonly', 'readonly');
        role.setAttribute('readonly', 'readonly');
        employee_id.setAttribute('readonly', 'readonly');


        

        if ($scope.role_id === '0') {
            approval.style.display = "none";
            btn_approve.style.display = "none";
            /*workflow_history.style.display = "none";*/

        }
        else if (($scope.role_id === '1') || ($scope.role_id === '2') || ($scope.role_id === '3') || ($scope.role_id === '4')) {
            appr.style.display = "none";
            extension.setAttribute('readonly', 'readonly');
            details.style.pointerEvents = "none";
            btn_submit.style.display = "none";
        }


        var folio_no = GetQueryString()["folio_no"];

        console.log(folio_no);

        if ((folio_no === undefined) || (folio_no === null) || (folio_no === '')) {
            console.log("Folio no: undefined, masukkan data baru");
            delivered.style.display = "none";
        }

        else {

            var proc = svc.svc_GetData(folio_no);
            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                if (data.ProcessSuccess) {
                    var h = data._header;
                    $scope.header_data = h;
                    $scope.rows = data._detail;
                    console.log(data._header);
                    console.log(data._detail);

                    console.log("Folio No:" + folio_no);
                    console.log("status_id: " + $scope.header_data.status_id);

                    //Jika status_id = 3 dan yang current login role_id = 4 maka tombol deliver akan dimunculkan;

                    if (($scope.header_data.status_id === 3) && (((window.localStorage.getItem("role_id") === "4")) || (window.localStorage.getItem("role_id") === "3"))) {
                        delivered.style.display = "block";
                        approval.style.display = "none";
                        btn_approve.style.display = "none";
                    }

                    //if (($scope.header_data.status_id !== 3) && (window.localStorage.getItem("role_id") === "0")) {
                    //    delivered.style.display = "none";
                    //}

                    if ($scope.header_data.status_id !== 5) {
                        close.style.display = "none";
                    }

                    if ($scope.header_data.status_id === 5) {
                        submit.style.display = "none";
                        next_approver.style.display = "none";
                        details.style.pointerEvents = "none";
                    }


                    if (window.localStorage.getItem("role_id") === "0") {
                        approval.style.display = "none";
                    }

                    $scope.Cek_Aproval();

                }
                else {
                    console.log(data.InfoMessage);
                }
            })
        }
        
    }


    $scope.LogOut = function () {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role_id');
        window.location.href = "/Login.aspx";
    }

    $scope.Cek_Aproval = function () {
        /*console.log($scope.approve_value);*/
        
        var proc = svc.svc_GetTaskAndAssignmentID($scope.header_data.id);
        proc.then(function (response) {

            var data = JSON.parse(response.data.d);
            console.log(data);
            if (data.ProcessSuccess) {
                $scope.task_id = data.task_id;
                $scope.assignment_id = data.assignment_id;

                console.log($scope.task_id);
                console.log($scope.assignment_id);

            }
            else {
                console.log(data.InfoMessage);
            }
        })
        console.log($scope.header_data.id);
    }

    $scope.comment = ''

    $scope.ApproveRequest = function () {
        var header_id = $scope.header_data.id;
        var approval_value = $scope.approve_value;
        var folio_no = GetQueryString()['folio_no'];

        var action_date = new moment().format("DD-MMM-YYYY");
        var action_date_formatted = new moment(action_date, "DD-MMM-YYYY").format("YYYY-MM-DD HH:mm:ss");
        var input_data;

        var role_id = parseInt(window.localStorage.getItem("role_id"));
        var prom = svc.svc_GetCurrentLoginData(role_id)
            .then(function (response) {
                var resp_data = JSON.parse(response.data.d);
                input_data = {
                    folio_no: folio_no,
                    pic_name: resp_data.data.role,
                    comment: $scope.comment,
                    action_name: $scope.approve_value,
                    action_date: new Date()
                }
            })


        prom.then(function () {
            console.log(input_data);
            if ((approval_value === null) || (approval_value === undefined) || (approval_value === '')) {
                window.alert("Please choose the approval action");
                window.location.href = "/Pages/StationaryRequest.aspx?folio_no=" + folio_no;
            }

            else {
                svc.svc_InsertWorkflowHistory(input_data)
                    .then(function (response) {
                        var resp_data = JSON.parse(response.data.d);
                        console.log(resp_data);
                    });

                svc.svc_ApproveRequest(approval_value, $scope.task_id, $scope.assignment_id).
                    then(function (response) {
                        var resp_data = JSON.parse(response.data.d);
                        console.log(resp_data);
                        if (resp_data.ProcessSuccess) {
                            if (approval_value == "Approve") {
                                window.alert("Successfully Approving Request");
                            }

                            else if (approval_value == "Reject") {
                                window.alert("Successfully Rejecting Request");
                            }

                            window.location.href = '/Home.aspx';
                        }
                        else {
                            console.log("Error : " + resp_data.InfoMessage);
                        }
                    })
                    .catch(function (error) {
                        console.log("Error: " + error.statusText);
                    })
            }


        })

        

    }

    $scope.Cek = function () {
        console.log($scope.task_id);
        console.log($scope.assignment_id);
    }

    $scope.CekItemName = function (index) {
        var item_name = $scope.rows[index].item_name;
        var proc = svc.svc_GetStockAndUom(item_name);
            proc.then(function (response) {
                var data = JSON.parse(response.data.d);
                $scope.rows[index].uom = data.data.uom;
                $scope.rows[index].stock = data.data.stock;
                console.log($scope.rows[index].uom);
            })
    }


    $scope.WarningMessage = false;
    $scope.CekRequestQty = function (index) {
        var value = $scope.rows[index].request_qty;
        $scope.rows[index].WarningMessage = isNaN(value) || value > $scope.rows[index].stock;
    }



    /*setInterval($scope.GetData, 1000);*/
    if (window.localStorage)

    $scope.GetData();
    $scope.GetCurrentLoginData();
    $scope.WorkflowHistoryLog();
 })