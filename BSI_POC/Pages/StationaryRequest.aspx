<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <script src="../Assets/Library/angular-filter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-cookies.js"></script>
    <script src="../Assets/Library/StationaryRequest.js"></script>
    <script src="../Assets/Library/moment.js/moment-with-locales.min.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
    <script src="../Assets/Library/BaseLogic.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div ng-app="app" ng-controller="ctrl">
        <div class="row" style="padding-left: 10px">
            <div class="row" style="width: 90%;">
                <div class="col" style="display:flex;">
                    <div class="row";>
                        <div class="col-2">
                            <img class="logo" src="../Assets/images/logo.png"/>
                        </div>
                        <div class="col">
                            <p id="logo_atas">Mitsubishi Motors Authorized Distributor</p>
                            <p id="logo_bawah">PT Mitsubishi Motors Krama Yudha Sales Indonesia</p>
                        </div>

                    </div>
                    <p class="myParagraph">Stationary Request</p>
                </div>

            </div>
            <div class="row" style="justify-content:center; width:90%;">
                <label class="myLabel">Application ID</label>
                <hr class="separator"/>
                <div class="col-5">
                    <div class="row">
                        <div class="col">
                            <label>Folio No</label>
                            <input id="folio_no" class="header-input" type="text" runat="server" ng-model="header_data.folio_no"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Applicant</label>
                            <input id="applicant" class="header-input" type="text" runat="server" ng-model="header_data.applicant"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Department</label>
                            <input id="department" class="header-input" type="text" ng-model="header_data.department" runat="server"/>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                </div>
                <div class="col-5">
                    <div class="row">
                        <div class="col">
                            <label>Role</label>
                            <input id="role" class="header-input" type="text" runat="server" ng-model="header_data.role"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Employee ID</label>
                            <input id="employee_id" class="header-input" type="text" runat="server" ng-model="header_data.employee_id"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Extension</label>
                            <input id="extension" class="header-input" type="text" runat="server" ng-model="header_data.extension"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" style="justify-content: center; width:90%">
                <label class="myLabel-detail">Request Detail</label>
                <hr class="separator"/>
                <table class="myTable" id="semprot_lahan">
                    <thead>
                        <tr>
                            <th style="width: 3%">No.</th>
                            <th style="width: 25%">Item Name</th>
                            <th style="width: 10%">​​​​UOM</th>
                            <th style="width: 10%">Stock</th>
                            <th style="width: 10%">Request QTY</th>
                            <th style="width: 20%">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="row in rows">
                            <td>
                                <p style="text-align:center">{{ $index + 1 }}</p>
                            </td>
                            <td>
<%--                                <select style="width: 90%;" ng-model="row.item_name" ng-options="item for item in itemNames" ng-change="CekItemName({{$index}})">
                                    <option selected="selected" invisible="invisible" style="text-align:center" value=""> == Select Stationary Item == </option>
                                </select>--%>
                                <select style="width: 90%;" ng-model="row.item_name" ng-change="CekItemName({{$index}})">
                                    <option value="" selected disabled style="text-align:center"> == Select Stationary Item == </option>
                                    <option ng-repeat="item in itemNames" value="{{item}}">{{item}}</option>
                                </select>
                            </td>
                            <td>
                                <input ng-model="row.uom"/>
                            </td>
                            <td><input type="text" ng-model="row.stock" readonly="readonly"/></td>
                            <td>
                                <p ng-show="row.WarningMessage" style="color:red; margin-bottom:0px;">Permintaan Anda melebihi stok</p>
                                <input class="myInput" type="number" ng-model="row.request_qty" ng-change="CekRequestQty({{$index}})">
                            </td>

                            <td><textarea id="reason" style="width: 100%" oninput="adjustHeight()" ng-model="row.reason"></textarea></td>
                        </tr>
                    </tbody>
                    <caption id="add" style="caption-side: bottom; cursor:pointer; color:black; width:10%; font-weight:bold" ng-click="addRow()"><span>&#43</span> Add New Row</caption>
                </table>
            </div>

            <div class="row" style=" width:90%; height:70px" id="approval">
                <label class="myLabel" style="font-size:large">Approval Action</label>
                <hr style="width: 100%; background-color: black; height:2px; margin-bottom:0%";/>
                <div class="col">
                    <input type="radio" id="approve" value="Approve" name="action" ng-model="approve_value"/><label for="approve" style="width:5%; padding-left:3px; padding-bottom: 3px; color:green; margin-right:5%">Approve</label>
                    <input type="radio" id="reject" value="Reject" name="action" ng-model="approve_value"/><label for="reject" style="width:5%; padding-left:3px; padding-bottom: 3px; color:red">Reject</label>
<%--                    <label style="width: 50%">Comments: </label>
                    <textarea style="width:50%"></textarea>--%>
<%--                    <div class="row" style="display:flex">
                        <label style="width: 50%">Comments: </label>
                        <textarea style="width:50%"></textarea>
                    </div>--%>
                </div>
                <div class="col">
                    <label style="width: 50%; padding-left: 0px; padding-bottom: 0px">Comments: </label>
                    <textarea style="width:100%; height:100%" ng-model="comment"></textarea>
                </div>
            </div>
            <div class="row" style=" width:90%; display:flex">
                <div class="col" id="approver">
                    <strong> Next Approval : </strong>
<%--                    <select style="margin-bottom: 10px" ng-options="i for i in approver_list" ng-model="approver">
                        
                    </select>--%>
                    <select style="margin-bottom: 10px" ng-model="approver">
                        <option value="" selected disabled style="text-align:center"> == Choose The Next Approver ==</option>
                        <option ng-repeat="i in approver_list" value="{{i}}">{{i}}</option>
                    </select>
                </div>

            </div>
            <div class="row">
                <div class="col" style="display:flex">
                    <button id="submit" class="btn" ng-click="InsertDataHeader()">Submit</button><br />
                    <button id="approve_action" class="btn" ng-click="ApproveRequest()">Submit</button>
                    <button id="close" class="btn btn-danger" ng-click="ConfirmStationary()">Close</button><br />
                    <button id="delivered" class="btn btn-primary" style="width:5%; color:white; display:none" ng-click="DeliverStationary()">Delivered</button>
                </div>
            </div>
            <div class="row">
                <button id="LogOut" class="btn btn-danger" style="width:5%; color:white" ng-click="LogOut()">LogOut</button>
            </div>

            <div class="row" style=" width:90%;" id="workflow_history">
                <label class="myLabel" style="font-size:large">Approval History</label>
                <hr style="width: 100%; background-color: black; height:2px; margin-bottom:5px";/>
                <table class="myTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Action Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="i in workflow_history">
                            <td>{{$index + 1}}</td>
                            <td>{{i.pic_name}}</td>
                            <td>{{i.comment}}</td>
                            <td>{{i.action_name}}</td>
                            <td>{{i.action_date}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
              
            <div class="row" style="width:90%; margin-top:10px">
                <p style="text-align:center; border:solid thin;">&copy; <%: DateTime.Now.Year %> - PT Mitsubishi Motors Krama Yudha Sales Indonesia</p>
            </div>
        </div>
    </div>

    

</asp:Content>

    