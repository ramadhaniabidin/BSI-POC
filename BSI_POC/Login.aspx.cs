using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace BSI_POC
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btn_Login(object sender, EventArgs e)
        {
            try
            {
                Response.Redirect("Home.aspx");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}