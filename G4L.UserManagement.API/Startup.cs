using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.API.Middleware;
using G4L.UserManagement.BL;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.DA;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Repositories;
using G4L.UserManagement.Infrustructure.Services;
using G4L.UserManagement.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Reflection;
using System.Text.Json.Serialization;

namespace G4L.UserManagement.API
{
    public class Startup
    {

        public string myAllowSpecifyOrigin = "_myAllowSpecifyOrigin";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // configure strongly typed settings objects
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );

            services.AddControllers();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "G4L.UserManagement.API", Version = "v1" });
            });

            // convert enum to string
            services.AddControllersWithViews()
                .AddJsonOptions(options =>
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        //builder.WithOrigins("http://localhost:4200", "https://g4l.netlify.app", "https://g4l-api.azure-api.net")
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILeaveService, LeaveService>();
            services.AddScoped<ILeaveRepository, LeaveRepository>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "G4L.UserManagement.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
