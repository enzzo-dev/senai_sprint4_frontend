using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Repositories;
using WishList.Domains;
using Microsoft.AspNetCore.Authorization;
using WishList.Interfaces;

namespace WishList.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        /// <summary>
        /// O objeto _usuarioRepository recebe todos os métodos criados na interface
        /// </summary>
        private IUsuarioRepository _usuarioRepository { get; set; }

        /// <summary>
        /// Instancia o objeto _usuarioRepossitoey para que haja a referência aos métodos
        /// </summary>
        public UsuarioController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        /// <summary>
        ///Lista todos os tipos de usuários cadastrados no sistema
        /// </summary>
        /// <returns>Uma lista de usuários e um status code Ok - 200</returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {

                return Ok(_usuarioRepository.ListarTodos());

            } catch(Exception e)
            {

                return BadRequest(e);

            }
        }


        /// <summary>
        /// Método POST irá Cadastrar usuários via JSON com o POSTMAN
        /// </summary>
        /// <param name="novoUsuario">Obejto para instanciar um novo objeto usuário com todas as suas propriedades</param>
        /// <returns>Retorna um status code de 201 - está tudo certo</returns>
        [HttpPost]
        public IActionResult Post(Usuario novoUsuario)
        {
            try
            {

                _usuarioRepository.Cadastrar(novoUsuario);

                return StatusCode(201);

            } catch(Exception e)
            {

                return BadRequest(e);

            }
        }

        /// <summary>
        /// Atualiza um usuários que já está cadastrado no sistema
        /// </summary>
        /// <param name="id">id informado para achar o usuário desejado</param>
        /// <param name="usuarioAtualizado">Objeto para armazenar as novas informações</param>
        /// <returns>Retorna um Satus code informando se tudo ocorreu bem, caso não tenha ocorrido retorna um bad request</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, Usuario usuarioAtualizado)
        {
            try
            {

                _usuarioRepository.Atualizar(id, usuarioAtualizado);

                return StatusCode(204);

            } catch(Exception e)
            {
                return BadRequest(e);
            }
        }


        /// <summary>
        /// Deleta um usuário já cadastrado no sistema
        /// </summary>
        /// <param name="id">parâmetro usado para encontrar o usuário desejado</param>
        /// <returns>Deleta o usuário desejado caso você tenha permissão e um StatusCode caso dê certo, caso contrário gera um BadRequest</returns>
        [Authorize]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {

                _usuarioRepository.Deletar(id);

                return StatusCode(204);

            } catch(Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
