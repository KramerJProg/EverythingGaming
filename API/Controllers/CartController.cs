using API.Data;
using API.DTOs;
using API.Entities;
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
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();
            return MapCartToDto(cart);
        }

        

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            // Get Cart OR Create Cart
            var cart = await RetrieveCart();
            if (cart == null) cart = CreateCart();
            // Get Product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found!"});
            // Add Item to Cart
            cart.AddItem(product, quantity);
            // Save Changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCart", MapCartToDto(cart)); 

            return BadRequest(new ProblemDetails{Title = "Problem saving Item to Cart."});
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            // Get Cart
            var cart = await RetrieveCart();
            if (cart == null) return NotFound();
            // Remove Item or Reduce Quantity
            cart.RemoveItem(productId, quantity);
            // Save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return  BadRequest(new ProblemDetails{Title = "Problem removing item from the cart"});
        }

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Cart CreateCart()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var cart = new Cart{BuyerId = buyerId};
            _context.Carts.Add(cart);
            return cart;
        }

        private CartDto MapCartToDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

    }
}