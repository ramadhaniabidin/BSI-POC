<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="BSI_POC.Login" %>
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
    </div>
</asp:Content>
