using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WishList.Interfaces;
using WishList.Contexts;
using WishList.Domains;

namespace WishList.Repositories
{
    public class DesejoRepository : IDesejoRepository
    {
        WishListContext ctx = new WishListContext();

        public void Atualizar(int id, Desejo desejoAtualizado)
        {
            Desejo desejoBuscado = ctx.Desejos.Find(id);

            if(desejoBuscado.Descricao != null)
            {
                desejoBuscado.Descricao = desejoAtualizado.Descricao;
            }

            ctx.Desejos.Update(desejoBuscado);

            ctx.SaveChanges();
        }

        public void Cadastrar(Desejo novoDesejo)
        {
            ctx.Desejos.Add(novoDesejo);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Desejo desejoBuscado = ctx.Desejos.Find(id);

            ctx.Desejos.Remove(desejoBuscado);

            ctx.SaveChanges();
        }

        public List<Desejo> ListarTodos()
        {
            return ctx.Desejos.ToList();
        }
    }
}
