using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;
using WishList.Interfaces;
using WishList.Repositories;

namespace WishList.Controllers
{
    [Produces("Application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DesejoController : ControllerBase
    {
        private IDesejoRepository _desejoRepository { get; set; }

        public DesejoController()
        {
            _desejoRepository = new DesejoRepository();
        }

        /// <summary>
        /// Irá listar todos os desejos em JSON NO PostMan
        /// </summary>
        /// <returns>Se tudo der certo ira retornar os desejos e um OK</returns>
        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {

                return Ok(_desejoRepository.ListarTodos());

            } catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Irá cadastrar um novo desejo no banco de dados via JSON
        /// </summary>
        /// <param name="novoDesejo"></param>
        /// <returns>Se tudo der certo irá retornar um StatusCode de 202</returns>
        //[Authorize]
        [HttpPost]
        public IActionResult Post(Desejo novoDesejo)
        {
            try
            {

                _desejoRepository.Cadastrar(novoDesejo);

                return StatusCode(202);

            } catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Irá atualizar um desejo já cadastrado por meio de seu id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="desejoAtualizado"></param>
        /// <returns>Se tudo der certo irá retornar um StatusCode de 201</returns>
        //[Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Desejo desejoAtualizado)
        {
            try
            {

                _desejoRepository.Atualizar(id, desejoAtualizado);

                return StatusCode(201);

            }catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        /// <summary>
        /// Irá deletar um desejo solicitado por meio do id fornecido
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Irá retornar um StatusCode de 204 caso dê tudo certo</returns>
        //[Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {

                _desejoRepository.Deletar(id);

                return StatusCode(204);

            }catch(Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
