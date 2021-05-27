using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WishList.Domains;
using WishList.Interfaces;
using WishList.Repositories;
using WishList.ViewModels;

namespace WishList.Controllers
{
    [Produces("Application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Post(LoginViewModel login)
        {
            try
            {
                Usuario userLogin = _usuarioRepository.Login(login.Email, login.Senha);

                if (userLogin == null)
                {
                    return NotFound("Email ou senha Inválidos");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, userLogin.Email),

                    new Claim(JwtRegisteredClaimNames.Jti, userLogin.IdUsuario.ToString()),

                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("WishList_chave_de_autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "WishList",
                    audience: "WishList",
                    claims: claims,
                    expires: DateTime.Now.AddHours(2),
                    signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
