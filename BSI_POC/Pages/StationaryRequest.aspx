﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <script src="../Assets/Library/angular.min.js"></script>
    <script src="../Assets/Library/StationaryRequest.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div ng-app="app" ng-controller="ctrl">
        <div class="row" style="width: 75%;">
            <div class="col" style="display:flex;">
                <div class="row";>
                    <div class="col-2">
                        <img class="logo" src="../Assets/images/logo.png"/>
                    </div>
                    <div class="col">
                        <p style="text-align:left; font-size:9px; font-weight:bold; margin-bottom: 0px; padding-top: 5px;">Mitsubishi Motors Authorized Distributor</p>
                        <p style="text-align:left; font-size:13px; font-weight:bold; ">PT Mitsubishi Motors Krama Yudha Sales Indonesia</p>
                    </div>

                </div>
                <p class="myParagraph">Stationary Request</p>
            </div>

        </div>
        <br />
        <div class="row" style="justify-content:center; width:75%;">
            <label class="myLabel" style="font-size:large">Application ID</label>
            <hr style="width: 100%; background-color: black; height:2px;"/>
            <div class="col-5">
                <div class="row">
                    <div class="col">
                        <label>Folio No</label>
                        <%--<asp:TextBox ID="folio_no" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.folio_no"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Applicant</label>
                        <%--<asp:TextBox ID="applicant" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.applicant"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Department</label>
                        <%--<asp:TextBox ID="department" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" ng-model="header_data.department" runat="server"/>
                    </div>
                </div>
            </div>
            <div class="col-1">
            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col">
                        <label>Role</label>
                        <%--<asp:TextBox ID="role" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.role"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Employee ID</label>
                        <%--<asp:TextBox ID="employee_id" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.employee_id"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Extension</label>
                        <%--<asp:TextBox ID="extension" runat="server" CssClass="header-input"></asp:TextBox>--%>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.extension"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="justify-content: center; width:75%">
            <label class="myLabel-detail" style="font-size:large">Request Detial</label>
            <hr style="width: 100%; background-color: black; height:2px;"/>
            <table class="myTable" id="semprot_lahan">
                <thead>
                    <tr>
                        <th style="width: 3%">No.</th>
                        <th style="width: 25%">Item Name</th>
                        <th style="width: 10%">​​​​UOM</th>
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
                            <select style="width: 90%;" ng-model="row.item_name" ng-options="item for item in itemNames">
                                <option disabled="disabled" selected="selected" style="text-align:center"> == Select Stationary Item == </option>
                            </select>
                        </td>
                        <td>
                            <%--<input class="myInput" type="text" ng-model="row.uom">--%>
                            <select style="width:95%" ng-model="row.uom" ng-options="i for i in uoms">

                            </select>
                        </td>
                        <td><input class="myInput" type="number" ng-model="row.request_qty"></td>
                        <td><textarea id="reason" style="width: 100%" oninput="adjustHeight()" ng-model="row.reason"></textarea></td>
                    </tr>
                </tbody>
                <caption id="add" style="caption-side: bottom; cursor:pointer; color:black; width:10%; font-weight:bold" ng-click="addRow()"><span>&#43</span> Add New Row</caption>
            </table>
        </div>
        <div class="row">
            <p style="text-align:center; border:solid thin; width:74.4%">&copy; <%: DateTime.Now.Year %> - PT Mitsubishi Motors Krama Yudha Sales Indonesia</p>
        </div>
        <div class="row" style=" width:75%;">
            <label class="myLabel" style="font-size:large">Approval Action</label>
            <hr style="width: 100%; background-color: black; height:2px; margin-bottom:0%";/>
            <div class="col">
                <input type="radio" id="approve" value="approve" name="action"/><label for="approve" style="width:5%; padding-left:3px; padding-bottom: 3px; color:green">Approve</label>
                <input type="radio" id="reject" value="reject" name="action"/><label for="reject" style="width:5%; padding-left:3px; padding-bottom: 3px; color:red">Reject</label>
            </div>
        </div>
        <div class="row" style=" width:75%;">
            <div class="col">
                <strong> Next Approval : </strong>
                <select style="margin-bottom: 10px" ng-options="i for i in approver_list" ng-model="approver">

                </select>
            </div>
        </div>
        <div class="row">
            <button class="btn" style="width:5%; background-color:green; color:white" ng-click="insertData()">Submit</button>
            <button class="btn btn-danger" style="width:5%; color:white" ng-click="CekTabel()">Cek</button>
        </div>
    </div>

</asp:Content>

    