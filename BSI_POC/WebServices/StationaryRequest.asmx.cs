using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using BSI_POC.BusinessLogics.Models;
using BSI_POC.BusinessLogics.Controller;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Text;

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
        public void CallNWC(int header_id)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            NintexWorkflowCloud nwc = new NintexWorkflowCloud();
            nwc.url = "https://npp-elistec.workflowcloud.com/api/v1/workflow/published/65d09917-4464-4c39-8bb8-78e4c993fc20/instances?token=B6F2ShnEku4f1N8wygGKDlB5OHsFRxaDeAh31JUUfRdaHiwBcZkxM38wE97R5vCQljAThp";
            Task.Run(async () => { await controller.startWorkFlow(nwc, header_id); }).Wait();
        }


        [WebMethod]
        public string InsertHeaderData(StationaryRequestHeaderModel header, List<StationaryRequestDetailModel> detail)
        {
            var outputString = "";
            var jsSerializer = new JavaScriptSerializer();
            try
            {
                if (header != null)
                {
                    int retID = controller.InsertHeaderData(header, detail);
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    NintexWorkflowCloud nwc = new NintexWorkflowCloud();
                    nwc.url = "https://npp-elistec.workflowcloud.com/api/v1/workflow/published/65d09917-4464-4c39-8bb8-78e4c993fc20/instances?token=B6F2ShnEku4f1N8wygGKDlB5OHsFRxaDeAh31JUUfRdaHiwBcZkxM38wE97R5vCQljAThp";
                    Task.Run(async () => { await controller.startWorkFlow(nwc, retID); }).Wait();
                    Console.Write(retID);

                    if (retID != 0)
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
        public string UpdateStock(List<StationaryRequestDetailModel> request_detail)
        {
            try
            {
                bool status = controller.UpdateStock(request_detail);
                if(status == true)
                {
                    var result = new
                    {
                        ProcessSuccess = true,
                        InfoMessage = "OK"
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
            catch(Exception ex)
            {
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.GetType().Name + ", " + ex.Message
                };

                return new JavaScriptSerializer().Serialize(result);
            }
        }

        [WebMethod]
        public string ConfirmStationary(int header_id)
        {
            try
            {
                bool condition;
                condition = controller.ConfirmStationary(header_id);

                if(condition == true)
                {
                    var result = new
                    {
                        ProcessSuccess = true,
                        InfoMessage = "OK"
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
            catch(Exception ex)
            {
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.GetType().Name + ", " + ex.Message
                };

                return new JavaScriptSerializer().Serialize(result);
            }
        }


        [WebMethod]
        public string DeliverStationary(int header_id)
        {
            try
            {
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                NintexWorkflowCloud nwc = new NintexWorkflowCloud();
                nwc.url = "https://npp-elistec.workflowcloud.com/api/v1/workflow/published/65d09917-4464-4c39-8bb8-78e4c993fc20/instances?token=B6F2ShnEku4f1N8wygGKDlB5OHsFRxaDeAh31JUUfRdaHiwBcZkxM38wE97R5vCQljAThp";
                Task.Run(async () => { await controller.startWorkFlow(nwc, header_id); }).Wait();

                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK"
                };

                return new JavaScriptSerializer().Serialize(result);
            }
            catch(Exception ex)
            {
                var currDT = $"[{DateTime.Now.ToString(("dd-MM-yyyy HH:mm:ss.fff"))}]";
                var currMt = $"{GetType().Namespace}.{GetType().Name} {nameof(InsertHeaderData)}()";
                Debug.WriteLine($"{currDT}{currMt}|{ex.GetType().Name},{ex.Message}\n Source: {ex.Source}\n{ex.StackTrace}");
                var result = new
                {
                    ProcessSuccess = false,
                    InfoMessage = ex.GetType().Name + ", " + ex.Message
                };

                return new JavaScriptSerializer().Serialize(result);
            }
        }

        [WebMethod]
        public string InsertDetailData(StationaryRequestDetailModel details)
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

        [WebMethod]
        public List<string> GetRoles()
        {
            List<string> roles = controller.GetRoleData();

            return roles;
        }

        [WebMethod]
        public string GetDataByFolioNo(string folio_no)
        {
            try
            {
                var header = controller.GetDataHeader(folio_no);
                var detail = controller.GetDataDetails(folio_no);

                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    _header = header,
                    _detail = detail,
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
        public string GetCurrentLoginData(int role_id)
        {
            try
            {
                var data = controller.GetCurrentLoginData(role_id);
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    data = data
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
        public string InsertToWorkflowHistory(WorkFlowHistoryLogModel input_data)
        {
            try
            {
                bool status = controller.InsertWorflowHistory(input_data);
                if(status == true)
                {
                    var result = new
                    {
                        ProcessSuccess = true,
                        InfoMessage = "OK"
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
        public string GetStockAndUom(string item_name)
        {
            try
            {
                var data = controller.GetStockAndUom(item_name);
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    data = data
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
        public string GetWorkflowHistory(string folio_no)
        {
            try
            {
                var history = controller.GetWorkflowHistory(folio_no);
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    history
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
        public string GetDataByID(int header_id)
        {
            try
            {
                var header = controller.GetDataHeaderByID(header_id);
                var detail = controller.GetDataDetailByID(header_id);

                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    _header = header,
                    _detail = detail,
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
        public string GetTaskAndAssignmentID(int header_id)
        {
            try
            {
                //string token = controller.GetToken();
                var tasks = controller.GetTasks();
                Console.WriteLine(JsonConvert.SerializeObject(tasks));
                var task = tasks.FirstOrDefault(t => t.name.ToString().Contains($"{header_id}"));

                string task_id = Convert.ToString(task["id"]);
                string assignmentID = Convert.ToString(task["taskAssignments"][0]["id"]);
                
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    task_id = task_id,
                    assignment_id = assignmentID
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
        public string ApproveRequest(string approval_value, string task_id, string assignment_id)
        {
            
            try
            {
                string token = controller.GetToken();
                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var payload = new { outcome = approval_value };
                var jsonPayload = JsonConvert.SerializeObject(payload);
                var stringContent = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                string url = $"https://us.nintex.io/workflows/v2/tasks/{task_id}/assignments/{assignment_id}";


                var request = new HttpRequestMessage(new HttpMethod("PATCH"), url);
                request.Content = stringContent;

                var response = client.SendAsync(request).Result;

              
                var responseBody = response.Content.ReadAsStringAsync();
 
                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK"
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
        public string GetToken(string client_id, string client_secret, string grant_type)
        {
            string url = "https://us.nintex.io/authentication/v1/token";
            try
            {
                HttpClient client = new HttpClient();
                var requestBody = new
                {
                    client_id = client_id,
                    client_secret = client_secret,
                    grant_type = grant_type
                };

                var jsonBody = JsonConvert.SerializeObject(requestBody);
                var HttpContent = new StringContent(jsonBody, Encoding.UTF8, "application/json");
                var response = client.PostAsync(url, HttpContent).Result;
                var responseJson = response.Content.ReadAsStringAsync().Result;
                var responseObject = JsonConvert.DeserializeObject<dynamic>(responseJson);

                string accessToken = responseObject.access_token;

                var result = new
                {
                    ProcessSuccess = true,
                    InfoMessage = "OK",
                    token = accessToken
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