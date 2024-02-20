using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Logs the user in. Checks to see if the user exists with the correct credentials,
        /// if it cannot find the credentials or they don't match, it will trigger the 
        /// Unauthorized from the BaseController (MVC). Otherwise it will authorize the
        /// User to login along with providing a JWT Token.
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns>UserDto with Token.</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        /// <summary>
        /// Registering a User. Checks to see if the User's username OR email already exists
        /// via Microsoft.AspNetCore.Identity -> (IdentityError -> IdentityErrorDecriber) and
        /// will loop over all possible errors for the checks not being valid.
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns>Fails from Identity : Validation Error |--| Success from Identity : Adds user with role.</returns>
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User{UserName = registerDto.UserName, Email = registerDto.Email};

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        // The authorize attribute will protect this end point.
        // Can't use Authorize for all methods because Register
        // Login need to be accessed anonymously of course.
        /// <summary>
        /// Purpose of this method is to get the currently logged in user. Gets the user
        /// information from the token that is sent up with the request. It then uses the token
        /// to get the user from the database. Can only do this when genuinally authenticated.
        /// </summary>
        /// <returns>UserDto with the token.</returns>
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Gets the Name Claim from the token.
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }
    }
}