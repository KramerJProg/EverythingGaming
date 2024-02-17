using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    // To lighten the load on the parameters when GetProducts func is called
    // inside ProductsController
    public class ProductParams : PaginationParams
    {
        // Orders product by name.
        public string OrderBy { get; set; }

        // Search product by name.
        public string SearchTerm { get; set; }

        // Filter product by brand.
        public string Brands { get; set; }

        // Filter product by type.
        public string Types { get; set; }
    }
}