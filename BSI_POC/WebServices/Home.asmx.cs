using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using BSI_POC.BusinessLogics.Controller;
using Newtonsoft.Json;

namespace BSI_POC.WebServices
{
    /// <summary>
    /// Summary description for Home
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [ScriptService]
    public class Home : System.Web.Services.WebService
    {
        HomeController controller = new HomeController();
        readonly StationaryRequestController stationaryRequestController = new StationaryRequestController();

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ListData()
        {
            try
            {
                var list = controller.ListData();

                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    items = list,
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

        [WebMethod]
        public string ListDataByID(int current_approver_role)
        {
            try
            {
                var data = controller.ListDataByID(current_approver_role);
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    items = data,
                };
                return new JavaScriptSerializer().Serialize(result);
            }
            catch(Exception ex)
            {
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.Message
                };
                return new JavaScriptSerializer().Serialize(result);
            }
        }


        [WebMethod]
        public string GetTasksList(string assignee)
        {
            try
            {
                var tasks = stationaryRequestController.GetTasks();
                var tasksJson = JsonConvert.SerializeObject(tasks);
                var task = tasks.FirstOrDefault(t => t["taskAssignments"][0]["assignee"].ToString().Contains($"{assignee}"));
                var taskJson = JsonConvert.SerializeObject(task);
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    tasksJson
                };
                return new JavaScriptSerializer().Serialize(result);
            }
            catch(Exception ex)
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
