using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class Metadata
    {
        // Display what the current page is.
        public int CurrentPage { get; set; }

        // Display the total number of pages.
        public int TotalPages { get; set; }

        // Display number of products on page. 
        public int PageSize { get; set; }

        // A total of items that area vailable in the list before the query.
        public int TotalCount { get; set; }
    }
}