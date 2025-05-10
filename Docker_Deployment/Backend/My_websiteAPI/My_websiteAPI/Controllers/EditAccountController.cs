﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using My_websiteAPI.Data;
using My_websiteAPI.ModelView;
using System.Collections.Generic;
using System.Security.Claims;

namespace My_websiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditAccountController : ControllerBase
    {
        private readonly MyDBcontext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static int Page_SIZE { get; set; } = 10;


        public EditAccountController
            (
            MyDBcontext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager
            )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

        }
        [HttpDelete]
        [Authorize(Roles = $"{Phanquyen.Admin},{Phanquyen.Custommer}")]
        public async Task<IActionResult> DeleteAccount(string iduser)
        {
            
            var user =await _userManager.FindByIdAsync(iduser);
            if (user == null) 
                {
                return NotFound(new { message = "Người dùng không tồn tại!" });
            }
        var result=    await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Xóa tài khoản thất bại!", errors = result.Errors });
            }

            return Ok(new { message = "Xóa tài khoản thành công!" });

        }
        [HttpGet]
      
        public async Task<IActionResult> GetAllAccount(int page=1)
        {
           
            var custommer =await  _context.Roles.FirstOrDefaultAsync(r => r.Name == Phanquyen.Custommer);
            var sotaikhoannguoidung = await _context.Users.Where(pp =>  _context.UserRoles.Any(p => p.UserId == pp.Id && p.RoleId == custommer.Id)).CountAsync();
            if (custommer == null)
            {
                return NotFound(new { message = "Không tìm thấy người dùng nào!" });
            }

            var users = _context.Users.Where(pp=>_context.UserRoles.Any(p=> p.UserId==pp.Id &&p.RoleId== custommer.Id)).AsQueryable();

            var totalItems = users.Count();
            if (totalItems == 0)
            {
                return Ok(new { mesage = "Không tìm thấy tài khoản nào!" });
            }
            var totalPages = (int)Math.Ceiling((double)totalItems / Page_SIZE);
            users = users.Skip((page - 1) * Page_SIZE).Take(Page_SIZE);


            var list = await users.Select(p => new
            {
                Iduser = p.Id,
                p.UserName,
                p.Email,
               
            }).ToListAsync();

            return Ok(new
            {
                items = list,
                sotaikhoannguoidung= sotaikhoannguoidung,
                totalPages = totalPages
            });
        }
        [HttpGet("searchAccount")]
        [Authorize(Roles =Phanquyen.Admin)]
        public async Task<IActionResult> TimkiemAccount(string email)
        {
            var custommer = await _context.Roles.FirstOrDefaultAsync(r => r.Name == Phanquyen.Custommer);

            if (custommer == null)
            {
                return NotFound(new { message = "Không tìm thấy vai trò Admin!" });
            }
         

            var user = _context.Users.Where(pp =>pp.Email.ToLower().Contains(email.ToLower()) && _context.UserRoles.Any(p => p.UserId == pp.Id && p.RoleId == custommer.Id))
            .Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email
            })
            .FirstOrDefault();

                if (user == null)
                {
                
                return Ok(new{   message = "Không tìm thấy tài khoản!",
                  

                });
                
                }

                return Ok(user);
        }
        [HttpPut("datlaimk")]
        [Authorize(Roles = Phanquyen.Admin)]
        public async Task<IActionResult> Datlaimk(string iduser)
        {

            var user = await _userManager.FindByIdAsync(iduser);
            if (user == null)
            {
                return NotFound(new { message = "Người dùng không tồn tại!" });
            }

            if (user == null)
            {

                return Ok(new{   message = "Không tìm thấy tài khoản!",  });

            }


            string newPassword = "Ictu123@";

          
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);

            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Lỗi khi đặt lại mật khẩu!", errors = result.Errors });
            }

            return Ok(new { message = "Đặt lại mật khẩu thành công! Mật khẩu mới là: Ictu123@" });
        }
        [HttpPut("customer")]
        [Authorize(Roles =Phanquyen.Custommer)]
        public async Task<IActionResult> ChangPasswordcustom(DoimatkhauMV model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized(new {message="Vui lòng đăng nhập trước"});
            }
            var user =await _userManager.FindByIdAsync(userId);
          
            if (user == null)
            {
                return NotFound(new { message = "Người dùng không tồn tại!" });
            }
           
            var checkpass = await _userManager.CheckPasswordAsync(user, model.oldPasss);
            if (!checkpass)
            {
                return Unauthorized(new { message = "Mật khẩu không chính xác!, vui lòng thử lại!" });
            }
        var result =    await _userManager.ChangePasswordAsync(user, model.oldPasss, model.newPasss);
            if (result.Succeeded)
            {
                return Ok(new {message="Đổi mật khẩu thành công!"});
            }
            return BadRequest(new { message = "Đổi mật khẩu thất bại!" });

        }

        [HttpPut("admin")]
        [Authorize(Roles = Phanquyen.Admin)]
        public async Task<IActionResult> ChangPassword(DoimatkhauMVA model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized(new { message = "Vui lòng đăng nhập trước" });
            }
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = "Người dùng không tồn tại!" });
            }

            var checkpass = await _userManager.CheckPasswordAsync(user, model.oldPasss);
            if (!checkpass)
            {
                return Unauthorized(new { message = "Mật khẩu không chính xác!, vui lòng thử lại!" });
            }
            var result = await _userManager.ChangePasswordAsync(user, model.oldPasss, model.newPasss);
            if (result.Succeeded)
            {
                return Ok(new { message = "Đổi mật khẩu thành công!" });
            }
            return BadRequest(new { message = "Đổi mật khẩu thất bại!" });

        }
















    }
}
