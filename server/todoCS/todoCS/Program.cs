using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using todoCS.Data;
using todoCS.Entities;
using todoCS.Interfaces;
using todoCS.Repository;
using todoCS.Services;


var builder = WebApplication.CreateBuilder(args);

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//add identity
builder.Services.AddIdentity<UserEntity, IdentityRole<int>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 6;
}).AddEntityFrameworkStores<ApplicationDBContext>().AddDefaultTokenProviders();

//jwt auth
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var jwt = context.Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(jwt))
            {
                context.Token = jwt;
            }

            return Task.CompletedTask;
        }
    };
});

//add cookie auth
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.SlidingExpiration = true;
});


builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo() {Title = "Demo API", Version = "v1"});
   
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<JwtService>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

//File upload Test swagger

// option.OperationFilter<FileUploadOperation>();

// public class FileUploadOperation : IOperationFilter
// {
//     public void Apply(OpenApiOperation operation, OperationFilterContext context)
//     {
//         if (operation.RequestBody != null)
//         {
//             foreach (var mediaType in operation.RequestBody.Content)
//             {
//                 if (mediaType.Key == "multipart/form-data")
//                 {
//                     mediaType.Value.Schema = new OpenApiSchema
//                     {
//                         Type = "object",
//                         Properties = new Dictionary<string, OpenApiSchema>
//                         {
//                             { "file", new OpenApiSchema { Type = "string", Format = "binary" } }
//                         }
//                     };
//                 }
//             }
//         }
//     }
// }

// curl -X POST ^
//     More?   "http://localhost:8000/Account/upload-avatar" ^
//             More?   -H "accept: */*" ^
//     More?   -H "Authorization: Bearer token" ^
//     More?   -H "Content-Type: multipart/form-data" ^
//     More?   -F "avatarFile=@C:\Users\User\Downloads\Reverend insanity.jpg;type=image/jpeg"