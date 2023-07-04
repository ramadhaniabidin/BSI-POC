using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BSI_POC.BusinessLogics.Models
{
    public class HomeModel
    {
        public int id { get; set; }
        public string folio_no { get; set; }
        public int status_id { get; set; }
        public DateTime created_date { get; set; }
    }
}
