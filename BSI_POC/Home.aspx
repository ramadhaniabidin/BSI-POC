<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="BSI_POC.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Assets/Library/angular.min.js"></script>
    <script src="Assets/Library/Home.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <table class="table" ng-app="app" ng-controller="ctrl">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Form No.</th>
        </tr>
      </thead>
      <tbody>
          <tr ng-repeat="i in Items">
              <td>{{$index+1}}</td>
              <td><a href="/Pages/StationaryRequest.aspx?folio_no={{i.folio_no}}" target="_blank">{{i.folio_no}}</a></td>
          </tr>
      </tbody>
    </table>
</asp:Content>
