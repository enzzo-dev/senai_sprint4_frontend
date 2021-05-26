using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WishList.Domains;

#nullable disable

namespace WishList.Contexts
{
    public partial class WishListContext : DbContext
    {
        public WishListContext()
        {
        }

        public WishListContext(DbContextOptions<WishListContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Desejo> Desejos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-AJCTALD\\SQLEXPRESS; initial catalog=WishList; user Id=sa; pwd=15w21a30");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Desejo>(entity =>
            {
                entity.HasKey(e => e.IdDesejo)
                    .HasName("PK__Desejos__5DB1341FE462BB1F");

                entity.Property(e => e.IdDesejo).HasColumnName("idDesejo");

                entity.Property(e => e.DataCriacao).HasColumnType("date");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Desejos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Desejos__idUsuar__3C69FB99");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__645723A6F0446088");

                entity.HasIndex(e => e.Email, "UQ__Usuarios__AB6E6164088037E8")
                    .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("senha");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
