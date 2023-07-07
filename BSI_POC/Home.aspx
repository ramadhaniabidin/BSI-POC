<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="BSI_POC.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="Assets/css/Home.css" rel="stylesheet"/>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-cookies.js"></script>
    <script src="Assets/Library/Home.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
    <script src="Assets/Home.js"></script>
    <script src="Assets/Library/BaseLogic.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div ng-app="app" ng-controller="ctrl">

        

        <div class="row" style="padding-top: 5px;">
            <table class="table">
              <thead class="thead-dark">
                <tr style="background-color:darkgray">
                  <th scope="col">#</th>
                  <th scope="col">Folio No.</th>
                  <th scope="col">Status</th>
                  <th scope="col">Submitted By</th>
                  <%--<th scope="col">Submitted Date</th>--%>
                </tr>
              </thead>
              <tbody>
                  <tr ng-repeat="i in Items">
                      <td>{{$index+1}}</td>
                      <td><a href="/Pages/StationaryRequest.aspx?folio_no={{i.folio_no}}" target="_blank">{{i.folio_no}}</a></td>
                      <td>{{i.status_id}}</td>
                      <td>{{i.created_by}}</td>
                      <%--<td>{{i.created_date}}</td>--%>
                  </tr>
              </tbody>
            </table>

            
        </div>

    </div>




</asp:Content>
