<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StationaryRequest.aspx.cs" Inherits="BSI_POC.Pages.StationaryRequest" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="../Assets/css/bootstrap/bootstrap_importer.css"/>
    <link rel="stylesheet" href="../Assets/css/myOwnStyle.css"/>
    <%--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">--%>
    <link href="Assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">


    <script src="../Assets/Library/angular-filter.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-cookies.js"></script>
    <script src="../Assets/Library/StationaryRequest.js"></script>
    <script src="../Assets/Library/moment.js/moment-with-locales.min.js"></script>
    <script src="../Assets/Library/MyJavaScript.js"></script>
    <script src="../Assets/Library/BaseLogic.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div ng-app="app" ng-controller="ctrl">
        <nav class="navbar navbar-expand navbar-light bg-white topbar static-top shadow" style="margin-bottom:10px">
            <!-- Sidebar Toggle (Topbar) -->
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>
            <!-- Topbar Search -->
            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
                <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                <li class="nav-item dropdown no-arrow d-sm-none">
                    <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-search fa-fw"></i>
                    </a>
                    <!-- Dropdown - Messages -->
                    <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                        <div class="form-inline mr-auto w-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- Nav Item - Alerts -->
<%--                <li class="nav-item dropdown no-arrow mx-1">
                    <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-bell fa-fw"></i>
                        <!-- Counter - Alerts -->
                        <span class="badge badge-danger badge-counter">3+</span>
                    </a>
                    <!-- Dropdown - Alerts -->
                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                        <h6 class="dropdown-header">Alerts Center</h6>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-primary">
                                    <i class="fas fa-file-alt text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 12, 2019</div>
                                <span class="font-weight-bold">A new monthly report is ready to download!</span>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-success">
                                    <i class="fas fa-donate text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 7, 2019</div>
                                $290.29 has been deposited into your account!
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="mr-3">
                                <div class="icon-circle bg-warning">
                                    <i class="fas fa-exclamation-triangle text-white"></i>
                                </div>
                            </div>
                            <div>
                                <div class="small text-gray-500">December 2, 2019</div>
                                Spending Alert: We've noticed unusually high spending for your account.
                            </div>
                        </a>
                        <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                </li>
                <!-- Nav Item - Messages -->
                <li class="nav-item dropdown no-arrow mx-1">
                    <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-envelope fa-fw"></i>
                        <!-- Counter - Messages -->
                        <span class="badge badge-danger badge-counter">7</span>
                    </a>
                    <!-- Dropdown - Messages -->
                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                        <h6 class="dropdown-header">Message Center</h6>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="/Assets/images/undraw_profile_1.svg" alt="...">
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div class="font-weight-bold">
                                <div class="text-truncate">
                                    Hi there! I am wondering if you can help me with a problem I've been having.
                                </div>
                                <div class="small text-gray-500">Emily Fowler · 58m</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="/Assets/images/undraw_profile_2.svg" alt="...">
                                <div class="status-indicator"></div>
                            </div>
                            <div>
                                <div class="text-truncate">
                                    I have the photos that you ordered last month, how would you like them sent to you?
                                </div>
                                <div class="small text-gray-500">Jae Chun · 1d</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="/Assets/images/undraw_profile_3.svg" alt="...">
                                <div class="status-indicator bg-warning"></div>
                            </div>
                            <div>
                                <div class="text-truncate">
                                    Last month's report looks great, I am very happy with the progress so far, keep up the good work!
                                </div>
                                <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                            </div>
                        </a>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <div class="dropdown-list-image mr-3">
                                <img class="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="...">
                                <div class="status-indicator bg-success"></div>
                            </div>
                            <div>
                                <div class="text-truncate">
                                    Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...
                                </div>
                                <div class="small text-gray-500">Chicken the Dog · 2w</div>
                            </div>
                        </a>
                        <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                </li>
                <div class="topbar-divider d-none d-sm-block"></div>--%>
                <li class="nav-item dropdown no-arrow">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{username}}</span>
                        <img class="img-profile rounded-circle" src="/Assets/images/undraw_profile.svg">
                    </a>
                    <!-- Dropdown - User Information -->
                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>

        <form>
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
                        <select style="margin-bottom: 10px" ng-model="approver" required>
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
                    <button id="LogOut" class="btn btn-danger" style="width:5%; color:white; display:none" ng-click="LogOut()">LogOut</button>
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
                                <th>Time</th>
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
        </form>

    </div>

    

</asp:Content>

    