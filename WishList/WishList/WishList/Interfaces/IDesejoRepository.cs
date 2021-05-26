using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Domains;

namespace WishList.Interfaces
{
    interface IDesejoRepository
    {
        /// <summary>
        /// Lista todos os desejos cadastrados no sistema
        /// </summary>
        /// <returns></returns>
        List<Desejo> ListarTodos();

        /// <summary>
        /// Cria um novo desejo com suas devidas propriedades
        /// </summary>
        /// <param name="novoDesejo"></param>
        void Cadastrar(Desejo novoDesejo);

        /// <summary>
        /// Atualiza um desejo pelo id que foi passado e salva no objeto especificado
        /// </summary>
        /// <param name="id"></param>
        /// <param name="desejoAtualizado"></param>
        void Atualizar(int id, Desejo desejoAtualizado);

        /// <summary>
        /// Deleta um desejo por meio do id passado
        /// </summary>
        /// <param name="id"></param>
        void Deletar(int id);

    }
}
