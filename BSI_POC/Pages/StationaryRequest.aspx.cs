using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BSI_POC.BusinessLogics.Models;
using BSI_POC.BusinessLogics.Controller;

namespace BSI_POC.Pages
{
    public partial class StationaryRequest : System.Web.UI.Page
    {
        StationaryRequestController controller = new StationaryRequestController();
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //protected void btnInsert(object sender, EventArgs e)
        //{
        //    StationaryRequestHeaderModel header = new StationaryRequestHeaderModel
        //    {
        //        folio_no = folio_no.Text,
        //        applicant = applicant.Text,
        //        department = department.Text,
        //        role = role.Text,
        //        employee_id = employee_id.Text,
        //        employee_name = "dhani",
        //        extension = extension.Text,
        //        created_by = "dhani",
        //        created_date = DateTime.Now.Date,
        //        modified_by = "dhani",
        //        modified_date = DateTime.Now.Date
        //    };

        //    controller.InsertData(header);

        //    folio_no.Text = "";
        //    applicant.Text = "";
        //    department.Text = "";
        //    role.Text = "";
        //    employee_id.Text = "";
        //    extension.Text = "";
        //}
    }
}