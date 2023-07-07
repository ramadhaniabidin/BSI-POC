<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="BSI_POC.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Assets/css/Home.css" rel="stylesheet"/>


    <script src="Assets/Library/Home.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
    <script src="Assets/Home.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <div id="mySidenav" class="sidenav" style="display: none">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a runat="server" href="~/">Home</a>
        <a runat="server" href="/About">About</a>
        <a runat="server" href="/Contact">Contact</a>
        <a runat="server" href="/Pages/StationaryRequest">Stationary Request</a>
    </div>

    <span style="font-size:20px;cursor:pointer; display:none" onclick="openNav()">&#9776; Menu</span>

    <table class="table" ng-app="app" ng-controller="ctrl">
      <thead class="thead-dark">
        <tr style="background-color:darkgray">
          <th scope="col">#</th>
          <th scope="col">Folio No.</th>
          <th scope="col">Status</th>
          <th scope="col">Submission Date</th>
        </tr>
      </thead>
      <tbody>
          <tr ng-repeat="i in Items">
              <td>{{$index+1}}</td>
              <td><a href="/Pages/StationaryRequest.aspx?folio_no={{i.folio_no}}" target="_blank">{{i.folio_no}}</a></td>
              <td>{{i.status_id}}</td>
              <td>{{i.created_date}}</td>
          </tr>
      </tbody>
    </table>


</asp:Content>
