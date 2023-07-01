<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1>Stationary Request</h1>
    <br />
    <div class="row" style="justify-content:center">
        <label class="myLabel">Application ID</label>
        <div class="col-5">
            <div class="row">
                <div class="col">
                    <label>Folio No</label>
                    <input type="text"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Applicant</label>
                    <input type="text"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Department</label>
                    <input type="text"/>
                </div>
            </div>
        </div>
        <div class="col-1">
        </div>
        <div class="col-5">
            <div class="row">
                <div class="col">
                    <label>Role</label>
                    <input type="text"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Employee ID</label>
                    <input type="text"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Extension</label>
                    <input type="text"/>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="justify-content:center">
        <label class="myLabel-detail">Request Detail</label>
        <table class="myTable" id="semprot_lahan">   
            <caption style="caption-side: top;">Semprot Lahan</caption>  
            <thead>                            
                <tr>                                                                                                   
                    <th>No.</th>                                                                                                   
                    <th>Persil</th>                                                                                                   
                    <th>​​​​Ha</th>                                                                                                   
                    <th>KCB</th>                                                                                                   
                    <th>HOK</th>                                                                                                                                                               
                </tr>                               
            </thead>
            <tbody>
                <tr>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                </tr>
            </tbody>
        </table>
    </div>
</asp:Content>

    