﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="BSI_POC.Login" %>
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
        <div class="row" style="justify-content:center; width:100%;">
            <label class="myLabel" style="font-size:large; text-align:center">Login</label>
            <hr style="width: 100%; background-color: black; height:2px;"/>
            <div class="col-5">
                <div class="row">
                    <div class="col">
                        <label>Name</label>
                        <input class="header-input" type="text" runat="server" ng-model="header_data.folio_no"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>Role</label>
                        <select style="width: 90%;" ng-model="row.item_name" ng-options="role for role in roles">
                            <option disabled="disabled" selected="selected" style="text-align:center"> == Select Stationary Item == </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-1">
            </div>
        </div>
    </div>
</asp:Content>
