using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using BSI_POC.BusinessLogics.Models;
using BSI_POC.BusinessLogics.Controller;


namespace BSI_POC.WebServices
{
    /// <summary>
    /// Summary description for StationaryRequest
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    [System.Web.Script.Services.ScriptService]
    public class StationaryRequest : WebService
    {
        readonly StationaryRequestController controller = new StationaryRequestController();

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }


        [WebMethod]
        public string InsertHeaderData(StationaryRequestHeaderModel header)
        {
            var outputString = "";
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                if (header != null)
                {
                    var retID = controller.InsertHeaderData(header);
                    if (retID == true)
                    {
                        var result = new
                        {
                            ProcessSuccess = true,
                            InfoMessage = $"{retID}"
                        };
                        outputString = jsSerializer.Serialize(result);
                    }
                    else
                    {
                        var result = new
                        {
                            ProcessSuccess = false,
                            InfoMessage = $"{retID}"
                        };
                        outputString = jsSerializer.Serialize(result);
                    }
                }
                else
                {
                    var result = new
                    {
                        ProcessSuccess = false,
                        InfoMessage = $"{typeof(ArgumentException).Name}, header is empty"
                    };
                    outputString = jsSerializer.Serialize(result);
                }
            }
            catch (Exception ex)
            {
                var currDT = $"[{DateTime.Now.ToString(("dd-MM-yyyy HH:mm:ss.fff"))}]";
                var currMt = $"{GetType().Namespace}.{GetType().Name} {nameof(InsertHeaderData)}()";
                Debug.WriteLine($"{currDT}{currMt}|{ex.GetType().Name},{ex.Message}\n Source: {ex.Source}\n{ex.StackTrace}");
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.GetType().Name + ", " + ex.Message
                };
                outputString = jsSerializer.Serialize(result);
            }

            return outputString;
        }

        [WebMethod]
        public string InsertDetailData(List<StationaryRequestDetailModel> details)
        {
            var outputString = "";
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                if (details != null)
                {
                    var retID = controller.InsertDetailData(details);
                    if (retID == true)
                    {
                        var result = new
                        {
                            ProcessSuccess = true,
                            InfoMessage = $"{retID}"
                        };
                        outputString = jsSerializer.Serialize(result);
                    }
                    else
                    {
                        var result = new
                        {
                            ProcessSuccess = false,
                            InfoMessage = $"{retID}"
                        };
                        outputString = jsSerializer.Serialize(result);
                    }
                }
                else
                {
                    var result = new
                    {
                        ProcessSuccess = false,
                        InfoMessage = $"{typeof(ArgumentException).Name}, header is empty"
                    };
                    outputString = jsSerializer.Serialize(result);
                }
            }
            catch (Exception ex)
            {
                var currDT = $"[{DateTime.Now.ToString(("dd-MM-yyyy HH:mm:ss.fff"))}]";
                var currMt = $"{GetType().Namespace}.{GetType().Name} {nameof(InsertHeaderData)}()";
                Debug.WriteLine($"{currDT}{currMt}|{ex.GetType().Name},{ex.Message}\n Source: {ex.Source}\n{ex.StackTrace}");
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.GetType().Name + ", " + ex.Message
                };
                outputString = jsSerializer.Serialize(result);
            }

            return outputString;
        }

    }
}