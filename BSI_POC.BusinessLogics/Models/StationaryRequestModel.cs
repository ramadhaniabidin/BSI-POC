using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BSI_POC.BusinessLogics.Models
{
    class StationaryRequestModel
    {
    }

    public class StationaryRequestHeaderModel
    {
        public int id { get; set; }
        public string folio_no { get; set; }
        public string applicant { get; set; }
        public string department { get; set; }
        public string role { get; set; }
        public string employee_id { get; set; }
        public string employee_name { get; set; }
        public string extension { get; set; }
        public int status_id { get; set; }
        public string remarks { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public string modified_by { get; set; }
        public DateTime modified_date { get; set; }
        public int approver_target_role_id { get; set; }
    }

    public class StationaryRequestDetailModel
    {
        public int id { get; set; }
        public int header_id { get; set; }
        public int no { get; set; }
        public string item_name { get; set; }
        public string uom { get; set; }
        public int stock { get; set; }
        public int request_qty { get; set; }
        public string reason { get; set; }
    }
}
