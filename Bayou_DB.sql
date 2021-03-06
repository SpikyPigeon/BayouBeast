USE [master]
GO
/****** Object:  Database [Bayou]    Script Date: 2020-01-09 14:58:10 ******/
CREATE DATABASE [Bayou]
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
