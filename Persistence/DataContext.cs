using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)  //  add connectionstring
        {

        }

        public DbSet<Activity> Activities { get; set; } //get the entity/table


    }
}