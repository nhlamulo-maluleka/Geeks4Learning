﻿using G4L.UserManagement.BL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace G4L.UserManagement.DA
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        // SQL Tables/Entity
        public DbSet<User> Users { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Leave> Leaves { get; set; }

/*        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>()
                .Property(e => e.Career)
                .HasConversion(
                    v => v.ToString(),
                    v => (Career)Enum.Parse(typeof(Career), v));

            modelBuilder
               .Entity<User>()
               .Property(e => e.Roles)
               .HasConversion(
                   v => v.ToString(),
                   v => (Roles)Enum.Parse(typeof(Roles), v));
        }*/


    }



    
    

        
}
