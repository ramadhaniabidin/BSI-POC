<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
    <script src="../Assets/Library/MyJavaScript.js"></script>
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
        <label class="myLabel-detail" style="font-size:large">Request Detail</label>
        <table class="myTable" id="semprot_lahan">   
            <caption id="add" style="caption-side: bottom; cursor:pointer; color:black; width:3px" onclick="addRow()">+</caption>  
            <thead>                            
                <tr>                                                                                                   
                    <th>No.</th>                                                                                                   
                    <th>Item Name</th>                                                                                                   
                    <th>​​​​UOM</th>                                                                                                   
                    <th>Request QTY</th>                                                                                                   
                    <th>Reason</th>                                                                                                                                                               
                </tr>                               
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select style="width: 90%;">
                            <option disabled="disabled" selected="selected"> == Select Stationary Item == </option>
                            <option>A4 Paper</option>
                            <option>Pencil</option>
                            <option>Pencil</option>
                            <option>Marker</option>
                            <option>Envelope</option>
                        </select>
                    </td>
                    <td><input class="myInput" type="text"></td>
                    <td><input class="myInput" type="text"></td>
                    <td><input class="myInput" type="text"></td>
                    <td><input class="myInput" type="text"></td>
                </tr>
            </tbody>
        </table>
    </div>
</asp:Content>

    