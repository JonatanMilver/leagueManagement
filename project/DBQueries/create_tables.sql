-- -- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    -- primary key column
    userId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    username [NVARCHAR](50) NOT NULL UNIQUE,
    firstName [NVARCHAR](50) NOT NULL,
    lastName [NVARCHAR](50) NOT NULL,
    country [NVARCHAR](50),
    pswd [NVARCHAR](MAX) NOT NULL,
    email [NVARCHAR](50) NOT NULL,
    imgUrl [NVARCHAR](MAX),
    favourites INT
);
GO

-- Create a new table called 'Referees' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Referees', 'U') IS NOT NULL
DROP TABLE dbo.Referees
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Referees
(
    refereeId INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL FOREIGN KEY REFERENCES Users(userId),
    qualification [NVARCHAR](50) NOT NULL,
    isHeadReferee BIT NOT NULL,
);
GO




-- Create a new table called 'AssociationRepresentative' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.AssociationRepresentative', 'U') IS NOT NULL
DROP TABLE dbo.AssociationRepresentative
GO
-- Create the table in the specified schema
CREATE TABLE dbo.AssociationRepresentative
(
    AssociationRepresentativeId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    -- primary key column
    userId INT FOREIGN KEY REFERENCES Users(userId),
);
GO


-- Create a new table called 'Admins' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Admins', 'U') IS NOT NULL
DROP TABLE dbo.Admins
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Admins
(
    adminId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    -- primary key column
    userId INT FOREIGN KEY REFERENCES Users(userId),
    -- specify more columns here
);
GO


-- Create a new table called 'UsersFavoriteGames' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.UsersFavoriteGames', 'U') IS NOT NULL
DROP TABLE dbo.UsersFavoriteGames
GO
-- Create the table in the specified schema
CREATE TABLE dbo.UsersFavoriteGames
(
    userId INT NOT NULL ,
    gameId INT NOT NULL,
    PRIMARY KEY(userId, gameId)
    -- specify more columns here
);
GO

-- Create a new table called 'GamePolicy' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.GamePolicy', 'U') IS NOT NULL
DROP TABLE dbo.GamePolicy
GO
-- Create the table in the specified schema
CREATE TABLE dbo.GamePolicy
(
    GamePolicyId INT NOT NULL PRIMARY KEY, -- primary key column
    title [NVARCHAR](50) NOT NULL,
    description [NVARCHAR](70) NOT NULL
    -- specify more columns here
);
GO

-- Create a new table called 'League' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.League', 'U') IS NOT NULL
DROP TABLE dbo.League
GO
-- Create the table in the specified schema
CREATE TABLE dbo.League
(
    LeagueId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    LeagueName [NVARCHAR](50) NOT NULL
);
GO

-- Create a new table called 'Season' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Season', 'U') IS NOT NULL
DROP TABLE dbo.Season
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Season
(
    SeasonId INT IDENTITY(1,1) PRIMARY KEY, -- primary key column
    LeagueId INT NOT NULL FOREIGN KEY REFERENCES League(LeagueId),
    GamePolicyId INT FOREIGN KEY REFERENCES GamePolicy(GamePolicyId)
    -- specify more columns here
);
GO

-- -- -- Create a new table called 'Games' in schema 'dbo'
-- -- -- Drop the table if it already exists
IF OBJECT_ID('dbo.Games', 'U') IS NOT NULL
DROP TABLE dbo.Games
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Games
(
    -- primary key column
    gameId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    homeTeam INT NOT NULL,
    awayTeam INT NOT NULL,
    gameDateTime DATETIME NOT NULL,
    field [NVARCHAR](50) NOT NULL,
    homeTeamScore INT,
    awayTeamScore INT,
    refereeId INT REFERENCES Referees(refereeId),
    seasonId INT NOT NULL REFERENCES Season(SeasonId)
);
GO

-- Create a new table called 'SeasonReferees' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.SeasonReferees', 'U') IS NOT NULL
DROP TABLE dbo.SeasonReferees
GO
-- Create the table in the specified schema
CREATE TABLE dbo.SeasonReferees
(
    RefereeId INT NOT NULL FOREIGN KEY REFERENCES Referees(RefereeId), -- primary key column
    SeasonId INT NOT NULL FOREIGN KEY REFERENCES Season(SeasonId),
    PRIMARY KEY(RefereeId, SeasonId)
);
GO