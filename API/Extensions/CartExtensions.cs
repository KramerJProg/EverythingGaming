using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDto MapCartToDto(this Cart cart)
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