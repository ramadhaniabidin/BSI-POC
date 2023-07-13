using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BSI_POC.BusinessLogics.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using BSI_POC.BusinessLogics.Common;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Script.Serialization;

namespace BSI_POC.BusinessLogics.Controller
{
    public class StationaryRequestController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
        DatabaseManager db = new DatabaseManager();
        SqlConnection conn = new SqlConnection();
        SqlDataReader reader = null;
        DataTable dt = new DataTable();
        public int InsertHeaderData(StationaryRequestHeaderModel header, List<StationaryRequestDetailModel> detail)
        {
            int header_id = 0;
            //string connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.insertHeaderData", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@folio_no", header.folio_no);
            cmd.Parameters.AddWithValue("@applicant", header.applicant);
            cmd.Parameters.AddWithValue("@department", header.department);
            cmd.Parameters.AddWithValue("@role", header.role);
            cmd.Parameters.AddWithValue("@employee_id", header.employee_id);
            cmd.Parameters.AddWithValue("@employee_name", header.employee_name);
            cmd.Parameters.AddWithValue("@extension", header.extension);
            cmd.Parameters.AddWithValue("@created_by", header.created_by);
            cmd.Parameters.AddWithValue("@created_date", header.created_date);
            cmd.Parameters.AddWithValue("@modified_by", header.modified_by);
            cmd.Parameters.AddWithValue("@modified_date", header.modified_date);
            cmd.Parameters.AddWithValue("@status_id", header.status_id);
            cmd.Parameters.AddWithValue("@approver_target_role_id", header.approver_target_role_id);
            cmd.Parameters.AddWithValue("@current_approver_role", header.current_approver_role);

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                header_id = reader.GetInt32(0);
            }

            //int header_id = reader.GetInt32(0);

            reader.Close();
            con.Close();

            foreach (var d in detail)
            {

                cmd = new SqlCommand("dbo.insertDetailData", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@folio_no", header.folio_no);
                cmd.Parameters.AddWithValue("@header_id", header_id);
                cmd.Parameters.AddWithValue("@no", d.no);
                cmd.Parameters.AddWithValue("@item_name", d.item_name);
                cmd.Parameters.AddWithValue("@uom", d.uom);
                cmd.Parameters.AddWithValue("@request_qty", d.request_qty);
                cmd.Parameters.AddWithValue("@reason", d.reason);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }



            return header_id;
        }

        public bool ConfirmStationary(int header_id)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.ConfirmStationary", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@header_id", header_id);

            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();

            return true;
        }

        public bool InsertDetailData(StationaryRequestDetailModel detail)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.insertDetailData", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@item_name", detail.item_name);
            cmd.Parameters.AddWithValue("@uom", detail.uom);
            cmd.Parameters.AddWithValue("@request_qty", detail.request_qty);
            cmd.Parameters.AddWithValue("@reason", detail.reason);

            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
            return true;
        }

        public List<string> GetRoleData()
        {
            List<string> roles = new List<string>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT name FROM BSI_POC.dbo.master_roles";
                SqlCommand cmd = new SqlCommand(query, con);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    string roleName = reader.GetString(0);
                    roles.Add(roleName);
                }

                reader.Close();
            }

            return roles;
        }

        public StationaryRequestHeaderModel GetDataHeaderByID(int header_id)
        {
            try
            {
                dt = new DataTable();
                db.OpenConnection(ref conn);
                db.cmd.CommandText = "dbo.get_header_data_by_id";
                db.cmd.CommandType = CommandType.StoredProcedure;
                db.cmd.Parameters.Clear();
                db.AddInParameter(db.cmd, "header_id", header_id);
                reader = db.cmd.ExecuteReader();
                dt.Load(reader);
                db.CloseDataReader(reader);
                db.CloseConnection(ref conn);

                if (dt.Rows.Count > 0)
                {
                    return Utility.ConvertDataTableToList<StationaryRequestHeaderModel>(dt)[0];
                }
                else
                {
                    return new StationaryRequestHeaderModel();
                }
            }
            catch (Exception ex)
            {
                db.CloseConnection(ref conn);
                throw ex;
            }
        }

        public StationaryRequestHeaderModel GetDataHeader(string folio_no)
        {
            try
            {
                dt = new DataTable();
                db.OpenConnection(ref conn);
                db.cmd.CommandText = "dbo.get_header_data_by_folio_no";
                db.cmd.CommandType = CommandType.StoredProcedure;
                db.cmd.Parameters.Clear();
                db.AddInParameter(db.cmd, "folio_no", folio_no);
                reader = db.cmd.ExecuteReader();
                dt.Load(reader);
                db.CloseDataReader(reader);
                db.CloseConnection(ref conn);

                if (dt.Rows.Count > 0)
                {
                    return Utility.ConvertDataTableToList<StationaryRequestHeaderModel>(dt)[0];
                }
                else
                {
                    return new StationaryRequestHeaderModel();
                }
            }
            catch (Exception ex)
            {
                db.CloseConnection(ref conn);
                throw ex;
            }
        }

        public CurrentLoginModel GetCurrentLoginData(int role_id)
        {
            try
            {
                dt = new DataTable();
                db.OpenConnection(ref conn);
                db.cmd.CommandText = "dbo.GetCurrentLoginData";
                db.cmd.CommandType = CommandType.StoredProcedure;
                db.cmd.Parameters.Clear();
                db.AddInParameter(db.cmd, "role_id", role_id);
                reader = db.cmd.ExecuteReader();
                dt.Load(reader);
                db.CloseDataReader(reader);
                db.CloseConnection(ref conn);

                if (dt.Rows.Count > 0)
                {
                    return Utility.ConvertDataTableToList<CurrentLoginModel>(dt)[0];
                }
                else
                {
                    return new CurrentLoginModel();
                }
            }
            catch(Exception ex)
            {
                db.CloseConnection(ref conn);
                throw ex;
            }
        }

        public List<StationaryRequestDetailModel> GetDataDetailByID(int header_id)
        {
            try
            {
                dt = new DataTable();
                db.OpenConnection(ref conn);
                db.cmd.CommandText = "dbo.get_data_details_by_id";
                db.cmd.CommandType = CommandType.StoredProcedure;
                db.cmd.Parameters.Clear();
                db.AddInParameter(db.cmd, "header_id", header_id);
                reader = db.cmd.ExecuteReader();
                dt.Load(reader);
                db.CloseDataReader(reader);
                db.CloseConnection(ref conn);
                if (dt.Rows.Count > 0)
                    return Utility.ConvertDataTableToList<StationaryRequestDetailModel>(dt);
                else
                    return new List<StationaryRequestDetailModel>();
            }
            catch (Exception ex)
            {
                db.CloseConnection(ref conn);
                throw ex;
            }
        }

        public List<StationaryRequestDetailModel> GetDataDetails(string folio_no)
        {
            try
            {
                dt = new DataTable();
                db.OpenConnection(ref conn);
                db.cmd.CommandText = "dbo.get_detail_data_by_folio_no";
                db.cmd.CommandType = CommandType.StoredProcedure;
                db.cmd.Parameters.Clear();
                db.AddInParameter(db.cmd, "folio_no", folio_no);
                reader = db.cmd.ExecuteReader();
                dt.Load(reader);
                db.CloseDataReader(reader);
                db.CloseConnection(ref conn);
                if (dt.Rows.Count > 0)
                    return Utility.ConvertDataTableToList<StationaryRequestDetailModel>(dt);
                else
                    return new List<StationaryRequestDetailModel>();
            }
            catch (Exception ex)
            {
                db.CloseConnection(ref conn);
                throw ex;
            }
        }

        public async Task<string> startWorkFlow(NintexWorkflowCloud nwc, int header_id)
        {
            try
            {
                nwc.param = new NWCParamModel();
                nwc.param.startData = new StartData();
                nwc.param.startData.se_transactionid = header_id;

                //string sBody = JsonConvert.SerializeObject(nwc.param);
                string sBody = new JavaScriptSerializer().Serialize(nwc.param);

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(nwc.url);

                client.DefaultRequestHeaders
                    .Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json")); //ACCEPT Header

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, nwc.url);
                request.Content = new StringContent(sBody, Encoding.UTF8, "application/json");

                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var result = await response.Content.ReadAsStringAsync();
                    return result; //instance guid
                }
            }
            catch (AggregateException ex)
            {
                throw ex;
            }
        }

        public string GetToken()
        {
            string url = "https://us.nintex.io/authentication/v1/token";

            HttpClient client = new HttpClient();
            var requestBody = new
            {
                client_id = "f7bbb84b-b114-4120-9a5f-b0557b6dbee2",
                client_secret = "sNNtUWsKIRJtSsOtTsJPLtSsMNJMLtUsMPtUsI2VsJtWsINMtPsNtW2MtVsRtUUsFRtSTWsFMtTVsPFtRsK2osFtTsP2jsLOKtRsMM2p",
                grant_type = "client_credentials"
            };
            var jsonBody = JsonConvert.SerializeObject(requestBody);
            var HttpContent = new StringContent(jsonBody, Encoding.UTF8, "application/json");
            var response = client.PostAsync(url, HttpContent).Result;
            var responseJson = response.Content.ReadAsStringAsync().Result;
            var responseObject = JsonConvert.DeserializeObject<dynamic>(responseJson);
            string accessToken = responseObject.access_token;


            return accessToken;
        }

        public IEnumerable<dynamic> GetTasks()
        {
            string url = "https://us.nintex.io/workflows/v2/tasks";
            string token = GetToken();

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");

            var response = client.GetAsync(url).Result;

            var responseJson = response.Content.ReadAsStringAsync().Result;

            dynamic responseObject = JsonConvert.DeserializeObject(responseJson);

            var tasks = responseObject.tasks;

            return tasks;
        }
    }
}