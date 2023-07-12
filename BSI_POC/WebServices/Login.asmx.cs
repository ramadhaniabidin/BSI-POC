using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.SessionState;
using BSI_POC.BusinessLogics.Controller;

namespace BSI_POC.WebServices
{
    /// <summary>
    /// Summary description for Login
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Login : System.Web.Services.WebService
    {
        LoginController controller = new LoginController();

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public string WriteSession(string key, string value)
        {
            bool status = controller.WriteSession(key, value);
            if (status == true)
            {
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    sessionKey = key,
                    sessionEmail = value
                };
                return new JavaScriptSerializer().Serialize(result);
            }

            else
            {
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = "Error"
                };
                return new JavaScriptSerializer().Serialize(result);
            }
        }


        [WebMethod]
        public string GetRoleId(string email)
        {
            //string email = (string)session["email"];


            try
            {
                int role_id = controller.GetRoleId(email).Item1;
                string email_account = controller.GetRoleId(email).Item2;
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    id = role_id,
                    email_account
                };
                return new JavaScriptSerializer().Serialize(result);
            }
            catch (Exception ex)
            {
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.Message
                };
                return new JavaScriptSerializer().Serialize(result);
            }
        }

    }
}
