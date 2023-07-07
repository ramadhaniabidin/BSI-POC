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

namespace BSI_POC.BusinessLogics.Controller
{
    public class StationaryRequestController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
        DatabaseManager db = new DatabaseManager();
        SqlConnection conn = new SqlConnection();
        SqlDataReader reader = null;
        DataTable dt = new DataTable();
        public bool InsertHeaderData(StationaryRequestHeaderModel header)
        {
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

        //public StationaryRequestHeaderModel GetDataHeader(string folio_no)
        //{
        //    try
        //    {
        //        dt = new DataTable();
        //        db.OpenConnection(ref conn);
        //        db.cmd.CommandText = "dbo.get_header_data_by_folio_no";
        //        db.cmd.CommandType = CommandType.StoredProcedure;
        //        db.cmd.Parameters.Clear();
        //        db.AddInParameter(db.cmd, "@folio_no", folio_no);
        //        reader = db.cmd.ExecuteReader();
        //        dt.Load(reader);
        //        db.CloseDataReader(reader);
        //        db.CloseConnection(ref conn);

        //        if (dt.Rows.Count > 0)
        //        {
        //            return Utility.ConvertDataTableToList<StationaryRequestHeaderModel>(dt)[0];
        //        }
        //        else
        //        {
        //            return new StationaryRequestHeaderModel();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        db.CloseConnection(ref conn);
        //        throw ex;
        //    }
        //}

        public StationaryRequestHeaderModel GetDataHeader(string folio_no)
        {
            StationaryRequestHeaderModel header = null;

            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.get_header_data_by_folio_no", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@folio_no", folio_no);

            con.Open();
            SqlDataReader reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                header = new StationaryRequestHeaderModel();
                header.id = Convert.ToInt32(reader["id"]);
                header.folio_no = reader["folio_no"].ToString();
                header.applicant = reader["applicant"].ToString();
                header.department = reader["department"].ToString();
                header.role = reader["role"].ToString();
                header.employee_id = reader["employee_id"].ToString();
                header.employee_name = reader["employee_name"].ToString();
                header.extension = reader["extension"].ToString();
                header.status_id = Convert.ToInt32(reader["status_id"]);
                header.remarks = reader["remarks"].ToString();
                header.created_by = reader["created_by"].ToString();

                string dateString = reader["created_date"].ToString();
                long timeStamp = long.Parse(dateString.Substring(6, dateString.Length - 8));
                DateTime created_date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(timeStamp);
                DateTime modified_date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(timeStamp);


                header.created_date = created_date;
                header.modified_by = reader["modified_by"].ToString();
                header.modified_date = modified_date;
            }
            reader.Close();
            con.Close();
            return header;

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
    }
}