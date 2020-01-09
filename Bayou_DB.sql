USE [master]
GO
/****** Object:  Database [Bayou]    Script Date: 2020-01-09 14:58:10 ******/
CREATE DATABASE [Bayou]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Bayou', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\Bayou.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Bayou_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\Bayou_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Bayou] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Bayou].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Bayou] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Bayou] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Bayou] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Bayou] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Bayou] SET ARITHABORT OFF 
GO
ALTER DATABASE [Bayou] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Bayou] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Bayou] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Bayou] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Bayou] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Bayou] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Bayou] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Bayou] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Bayou] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Bayou] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Bayou] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Bayou] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Bayou] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Bayou] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Bayou] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Bayou] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Bayou] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Bayou] SET RECOVERY FULL 
GO
ALTER DATABASE [Bayou] SET  MULTI_USER 
GO
ALTER DATABASE [Bayou] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Bayou] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Bayou] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Bayou] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Bayou] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Bayou', N'ON'
GO
USE [Bayou]
GO
/****** Object:  Table [dbo].[Ability]    Script Date: 2020-01-09 14:58:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ability](
	[id] [int] NOT NULL,
	[name] [nvarchar](30) NOT NULL,
	[description] [text] NULL,
	[monster_id] [int] NOT NULL,
	[hp_mod] [int] NULL,
	[strength_mult] [float] NULL,
	[toughness_mult] [float] NULL,
	[smartness_mult] [float] NULL,
	[cooldown] [int] NOT NULL,
 CONSTRAINT [PK_Ability] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Intruder]    Script Date: 2020-01-09 14:58:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Intruder](
	[id] [int] NOT NULL,
	[name] [nvarchar](30) NOT NULL,
	[hp_init] [int] NOT NULL,
	[strength_init] [int] NOT NULL,
	[toughness_init] [int] NOT NULL,
	[smartness_init] [int] NOT NULL,
	[lvl_min] [int] NOT NULL,
	[picture] [image] NOT NULL,
 CONSTRAINT [PK_Intruder] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Monster]    Script Date: 2020-01-09 14:58:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Monster](
	[id] [int] NOT NULL,
	[name] [nvarchar](25) NOT NULL,
	[hp_init] [int] NOT NULL,
	[strength_init] [int] NOT NULL,
	[toughness_init] [int] NOT NULL,
	[smartness_init] [int] NOT NULL,
	[description] [text] NULL,
	[picture] [image] NULL,
 CONSTRAINT [PK_Monster] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Ability]  WITH CHECK ADD  CONSTRAINT [monster_id] FOREIGN KEY([monster_id])
REFERENCES [dbo].[Monster] ([id])
GO
ALTER TABLE [dbo].[Ability] CHECK CONSTRAINT [monster_id]
GO
USE [master]
GO
ALTER DATABASE [Bayou] SET  READ_WRITE 
GO
