using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BSI_POC.BusinessLogics.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace BSI_POC.BusinessLogics.Controller
{
    public class StationaryRequestController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
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

            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();

            return true;
        }

        public bool InsertDetailData(List<StationaryRequestDetailModel> detail)
        {
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.insertDetailData", con);

            foreach (var i in detail)
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@no", i.no);
                cmd.Parameters.AddWithValue("@item_name", i.item_name);
                cmd.Parameters.AddWithValue("@uom", i.uom);
                cmd.Parameters.AddWithValue("@request_qty", i.request_qty);
                cmd.Parameters.AddWithValue("@reason", i.reason);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            return true;
        }
    }
}