﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using My_websiteAPI.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace My_websiteAPI.Migrations
{
    [DbContext(typeof(MyDBcontext))]
    [Migration("20250414163003_My_WebsiteV14")]
    partial class My_WebsiteV14
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("My_websiteAPI.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("My_websiteAPI.Model.BannerThree", b =>
                {
                    b.Property<int>("BannerThreeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("BannerThreeId"));

                    b.Property<string>("Image1")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Image2")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Image3")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("BannerThreeId");

                    b.ToTable("BannerThrees");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Danhcho", b =>
                {
                    b.Property<int>("DanhchoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DanhchoId"));

                    b.Property<string>("Doituong")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("DanhchoId");

                    b.ToTable("Danhcho");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Danhgia", b =>
                {
                    b.Property<int>("DanhgiaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DanhgiaId"));

                    b.Property<int>("DiadiemId")
                        .HasColumnType("integer");

                    b.Property<int>("Diem")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Ngay_add")
                        .HasColumnType("date");

                    b.Property<string>("Noidung")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("character varying(300)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("DanhgiaId");

                    b.HasIndex("DiadiemId");

                    b.HasIndex("UserId");

                    b.ToTable("Danhgias");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Diadiem", b =>
                {
                    b.Property<int>("DiadiemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DiadiemId"));

                    b.Property<int>("DanhchoId")
                        .HasColumnType("integer");

                    b.Property<string>("DateOC")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Diachi")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Gia")
                        .HasColumnType("integer");

                    b.Property<string>("Image1")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image2")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image3")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image4")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image5")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Imagemain")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int>("LoaiHinhId")
                        .HasColumnType("integer");

                    b.Property<int>("Loaisukien")
                        .HasColumnType("integer");

                    b.Property<int>("Luotxem")
                        .HasColumnType("integer");

                    b.Property<string>("Mocuadongcua")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Motangan")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Noidung")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Tieude")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<int>("TinhThanhId")
                        .HasColumnType("integer");

                    b.Property<bool>("Tinhtrang")
                        .HasColumnType("boolean");

                    b.Property<string>("urlmap")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("DiadiemId");

                    b.HasIndex("DanhchoId");

                    b.HasIndex("LoaiHinhId");

                    b.HasIndex("TinhThanhId");

                    b.ToTable("Diadiem");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Donggop", b =>
                {
                    b.Property<int>("DonggopId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DonggopId"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<string>("Noidung")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Tieude")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<int>("trangthai")
                        .HasColumnType("integer");

                    b.HasKey("DonggopId");

                    b.ToTable("Donggop");
                });

            modelBuilder.Entity("My_websiteAPI.Model.LichsuTrainghiem", b =>
                {
                    b.Property<int>("LichsuTrainghiemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("LichsuTrainghiemId"));

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LichsuTrainghiemId");

                    b.HasIndex("UserId");

                    b.ToTable("LichsuTrainghiem");
                });

            modelBuilder.Entity("My_websiteAPI.Model.ListAwait", b =>
                {
                    b.Property<int>("ListAwaitId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ListAwaitId"));

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ListAwaitId");

                    b.HasIndex("UserId");

                    b.ToTable("ListAwait");
                });

            modelBuilder.Entity("My_websiteAPI.Model.LoaiHinh", b =>
                {
                    b.Property<int>("LoaiHinhId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("LoaiHinhId"));

                    b.Property<string>("TenLoai")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("LoaiHinhId");

                    b.ToTable("LoaiHinh");
                });

            modelBuilder.Entity("My_websiteAPI.Model.SukienTintuc", b =>
                {
                    b.Property<int>("SukienId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SukienId"));

                    b.Property<int>("DanhchoId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateClose")
                        .HasColumnType("date");

                    b.Property<DateTime>("DateOpen")
                        .HasColumnType("date");

                    b.Property<string>("Diachi")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Gia")
                        .HasColumnType("integer");

                    b.Property<string>("Image1")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image2")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image3")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image4")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Image5")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Imagemain")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<int>("LoaiHinhId")
                        .HasColumnType("integer");

                    b.Property<int>("Loaisukien")
                        .HasColumnType("integer");

                    b.Property<string>("Mota1")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Motangan")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Tieude")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<int>("TinhThanhId")
                        .HasColumnType("integer");

                    b.HasKey("SukienId");

                    b.HasIndex("DanhchoId");

                    b.HasIndex("LoaiHinhId");

                    b.HasIndex("TinhThanhId");

                    b.ToTable("SukienTintuc");
                });

            modelBuilder.Entity("My_websiteAPI.Model.TinhThanh", b =>
                {
                    b.Property<int>("TinhThanhId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TinhThanhId"));

                    b.Property<string>("TenTinh")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("TinhThanhId");

                    b.ToTable("TinhThanh");
                });

            modelBuilder.Entity("My_websiteAPI.Model.itemLichsuTrainghiem", b =>
                {
                    b.Property<int>("itemLichsuTrainghiemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("itemLichsuTrainghiemId"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<int>("DiadiemId")
                        .HasColumnType("integer");

                    b.Property<int>("LichsuTrainghiemId")
                        .HasColumnType("integer");

                    b.HasKey("itemLichsuTrainghiemId");

                    b.HasIndex("DiadiemId");

                    b.HasIndex("LichsuTrainghiemId");

                    b.ToTable("itemLichsuTrainghiem");
                });

            modelBuilder.Entity("My_websiteAPI.Model.itemListAwait", b =>
                {
                    b.Property<int>("itemListAwaitId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("itemListAwaitId"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("date");

                    b.Property<int>("DiadiemId")
                        .HasColumnType("integer");

                    b.Property<int>("ListAwaitId")
                        .HasColumnType("integer");

                    b.HasKey("itemListAwaitId");

                    b.HasIndex("DiadiemId");

                    b.HasIndex("ListAwaitId");

                    b.ToTable("itemListAwait");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("My_websiteAPI.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("My_websiteAPI.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("My_websiteAPI.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("My_websiteAPI.Model.Danhgia", b =>
                {
                    b.HasOne("My_websiteAPI.Model.Diadiem", "Diadiem")
                        .WithMany()
                        .HasForeignKey("DiadiemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Diadiem");

                    b.Navigation("User");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Diadiem", b =>
                {
                    b.HasOne("My_websiteAPI.Model.Danhcho", "Danhcho")
                        .WithMany("diadiems")
                        .HasForeignKey("DanhchoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.LoaiHinh", "LoaiHinhDL")
                        .WithMany("diadiems")
                        .HasForeignKey("LoaiHinhId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.TinhThanh", "TinhThanh")
                        .WithMany("Diadiems")
                        .HasForeignKey("TinhThanhId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Danhcho");

                    b.Navigation("LoaiHinhDL");

                    b.Navigation("TinhThanh");
                });

            modelBuilder.Entity("My_websiteAPI.Model.LichsuTrainghiem", b =>
                {
                    b.HasOne("My_websiteAPI.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("My_websiteAPI.Model.ListAwait", b =>
                {
                    b.HasOne("My_websiteAPI.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("My_websiteAPI.Model.SukienTintuc", b =>
                {
                    b.HasOne("My_websiteAPI.Model.Danhcho", "Danhcho")
                        .WithMany()
                        .HasForeignKey("DanhchoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.LoaiHinh", "LoaiHinhDL")
                        .WithMany()
                        .HasForeignKey("LoaiHinhId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.TinhThanh", "TinhThanh")
                        .WithMany("SukienTintucs")
                        .HasForeignKey("TinhThanhId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Danhcho");

                    b.Navigation("LoaiHinhDL");

                    b.Navigation("TinhThanh");
                });

            modelBuilder.Entity("My_websiteAPI.Model.itemLichsuTrainghiem", b =>
                {
                    b.HasOne("My_websiteAPI.Model.Diadiem", "Diadiem")
                        .WithMany()
                        .HasForeignKey("DiadiemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.LichsuTrainghiem", "LichsuTrainghiem")
                        .WithMany("itemLichsuTrainghiems")
                        .HasForeignKey("LichsuTrainghiemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Diadiem");

                    b.Navigation("LichsuTrainghiem");
                });

            modelBuilder.Entity("My_websiteAPI.Model.itemListAwait", b =>
                {
                    b.HasOne("My_websiteAPI.Model.Diadiem", "Diadiem")
                        .WithMany()
                        .HasForeignKey("DiadiemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("My_websiteAPI.Model.ListAwait", "ListAwait")
                        .WithMany("itemListAwaits")
                        .HasForeignKey("ListAwaitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Diadiem");

                    b.Navigation("ListAwait");
                });

            modelBuilder.Entity("My_websiteAPI.Model.Danhcho", b =>
                {
                    b.Navigation("diadiems");
                });

            modelBuilder.Entity("My_websiteAPI.Model.LichsuTrainghiem", b =>
                {
                    b.Navigation("itemLichsuTrainghiems");
                });

            modelBuilder.Entity("My_websiteAPI.Model.ListAwait", b =>
                {
                    b.Navigation("itemListAwaits");
                });

            modelBuilder.Entity("My_websiteAPI.Model.LoaiHinh", b =>
                {
                    b.Navigation("diadiems");
                });

            modelBuilder.Entity("My_websiteAPI.Model.TinhThanh", b =>
                {
                    b.Navigation("Diadiems");

                    b.Navigation("SukienTintucs");
                });
#pragma warning restore 612, 618
        }
    }
}
