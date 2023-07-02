<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="../Assets/Library/MyJavaScript.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
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
                    <asp:TextBox ID="folio_no" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Applicant</label>
                    <asp:TextBox ID="applicant" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Department</label>
                    <asp:TextBox ID="department" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
        </div>
        <div class="col-1">
        </div>
        <div class="col-5">
            <div class="row">
                <div class="col">
                    <label>Role</label>
                    <asp:TextBox ID="role" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Employee ID</label>
                    <asp:TextBox ID="employee_id" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Extension</label>
                    <asp:TextBox ID="extension" runat="server" CssClass="header-input"></asp:TextBox>
                    <%--<input class="header-input" type="text"/>--%>
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="justify-content:center; width:75%;">
        <label class="myLabel-detail" style="font-size:large">Request Detail</label>
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
                <tr>
                    <td>
                        <input class="myInput" type="text">
                    </td>
                    <td>
                        <select style="width: 90%;">
                            <option disabled="disabled" selected="selected" style="text-align:center"> == Select Stationary Item == </option>
                            <option>A4 Paper</option>
                            <option>Pencil</option>
                            <option>Pencil</option>
                            <option>Marker</option>
                            <option>Envelope</option>
                        </select>
                    </td>
                    <td><input class="myInput" type="text"></td>
                    <td><input class="myInput" type="text"></td>
                    <td><textarea id="reason" style="width: 100%" oninput="adjustHeight()"></textarea></td>
                </tr>
            </tbody>
            <caption id="add" style="caption-side: bottom; cursor:pointer; color:black; width:10%; font-weight:bold" onclick="addRow()"><span>&#43</span> Add New Row</caption> 
        </table>
    </div>
    <div class="row">
        <p style="text-align:center; border:solid thin; width:74.4%">&copy; <%: DateTime.Now.Year %> - PT Mitsubishi Motors Krama Yudha Sales Indonesia</p>
    </div>
    <div class="row">
        <button class="btn" style="width:5%; background-color:green; color:white">Submit</button>
        <button class="btn btn-danger" style="width:5%; color:white">Close</button>
    </div>
</asp:Content>

    