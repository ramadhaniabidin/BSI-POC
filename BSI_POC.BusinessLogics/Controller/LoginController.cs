using BSI_POC.BusinessLogics.Common;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace BSI_POC.BusinessLogics.Controller
{
    public class LoginController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;

        DatabaseManager db = new DatabaseManager();
        SqlConnection conn = new SqlConnection();
        DataTable dt = new DataTable();

        public bool WriteSession(string key, string value)
        {
            try
            {
                HttpContext context = HttpContext.Current;
                context.Session[key] = value;
                return true;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Tuple<int, string> GetRoleId(string email)
        {
            //string email = (string)context.Session["email"];
            int role_id = 0;
            string email_account = "";
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand("dbo.getRoleId", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@email", email);
            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                role_id = reader.GetInt32(0);
                email_account = reader.GetString(1);
            }

            Console.WriteLine(email_account);
            return new Tuple<int, string>(role_id, email_account);
        }

        //public int GetRoleId(string email)
        //{

        //    int role_id = 0;
        //    SqlConnection con = new SqlConnection(connectionString);
        //    SqlCommand cmd = new SqlCommand("dbo.getRoleId", con);
        //    cmd.CommandType = CommandType.StoredProcedure;

        //    cmd.Parameters.AddWithValue("@email", email);
        //    con.Open();

        //    SqlDataReader reader = cmd.ExecuteReader();

        //    while (reader.Read())
        //    {
        //        role_id = reader.GetInt32(0);
        //    }

        //    return role_id;

        //}
    }
}
