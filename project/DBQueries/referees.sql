-- Create a new table called 'referees' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('referees', 'U') IS NOT NULL
DROP TABLE referees
GO
-- Create the table in the specified schema
CREATE TABLE referees
(
    refereeID INT IDENTITY(1,1) PRIMARY KEY,
    userID INT NOT NULL FOREIGN KEY REFERENCES users(userID),
    -- primary key column
    qualification [NVARCHAR](50) NOT NULL,
    -- specify more columns here
);
GO