using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;

namespace WishList.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Método irá listar todos os usúários cadastrados no sistema
        /// </summary>
        /// <returns></returns>
        List<Usuario> ListarTodos();

        /// <summary>
        /// Método que irá cadastrar novos usuários no sistema
        /// </summary>
        /// <param name="novoUsuario"></param>
        void Cadastrar(Usuario novoUsuario);

        /// <summary>
        /// Método que irá atualizar um usuário existente no sistema por meio do id fornecido
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usuarioAtualizado"></param>
        void Atualizar(int id, Usuario usuarioAtualizado);

        /// <summary>
        /// Método que irá deletar um usuário do sistema por meio do id fornecido
        /// </summary>
        /// <param name="id"></param>
        void Deletar(int id);

        /// <summary>
        /// Método será utilizado para realizar o login no sistema
        /// </summary>
        /// <param name="email"></param>
        /// <param name="senha"></param>
        /// <returns></returns>
        Usuario Login(string email, string senha);
    }

}
