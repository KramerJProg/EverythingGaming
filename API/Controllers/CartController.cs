using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        public StoreContext _context { get; }

        public CartController(StoreContext context)
        {
            _context = context;
            
        }

        // Endpoints
        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await RetrieveCart(GetBuyerId());

            if (cart == null) return NotFound();
            return cart.MapCartToDto();
        }

        

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            // Get Cart OR Create Cart
            var cart = await RetrieveCart(GetBuyerId());
            if (cart == null) cart = CreateCart();
            // Get Product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found!"});
            // Add Item to Cart
            cart.AddItem(product, quantity);
            // Save Changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCart", cart.MapCartToDto()); 

            return BadRequest(new ProblemDetails{Title = "Problem saving Item to Cart."});
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            // Get Cart
            var cart = await RetrieveCart(GetBuyerId());
            if (cart == null) return NotFound();
            // Remove Item or Reduce Quantity
            cart.RemoveItem(productId, quantity);
            // Save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return  BadRequest(new ProblemDetails{Title = "Problem removing item from the cart"});
        }

        /// <summary>
        /// Retrieves the cart based on the buyerId. If a buyerId is
        /// null, then it will delete any existing cookies and return
        /// the buyerId. Else, it will return the cart if the buyerId
        /// is found.
        /// </summary>
        /// <param name="buyerId"></param>
        /// <returns></returns>
        private async Task<Cart> RetrieveCart(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        /// <summary>
        /// Checks to see if a username (buyerId) exists, if not, then 
        /// it will check if a cookie exists with buyerId and if not that, 
        /// then the buyerId will be null.
        /// </summary>
        /// <returns></returns>
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        /// <summary>
        /// If the user is logged in and this method triggers, it will set
        /// the buyerId to their username, if not, then it will set to a Guid
        /// because they won't be logged in and working with an anonymous cart.
        /// </summary>
        /// <returns></returns>
        private Cart CreateCart()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            
            var cart = new Cart{BuyerId = buyerId};
            _context.Carts.Add(cart);
            return cart;
        }

    }
}