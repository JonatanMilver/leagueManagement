-- -- Insert rows into table 'Users'
-- INSERT INTO Users
-- ( -- columns to insert data into
--  [username], [firstName], [lastName], [pswd], [email]
-- )
-- VALUES
-- ( -- first row: values for the columns in the list above
--  'galagas', 'gal', 'agasi', 'thePassword', 'galagas@post.bgu.ac.il'
-- ),
-- ( -- second row: values for the columns in the list above
--  'guyzaid', 'guy', 'zaidmen', 'thePassword', 'guyzaid@post.bgu.ac.il'
-- ),
-- ( -- third row: values for the columns in the list above
--  'tomerkel', 'tomer', 'kelner', 'thePassword', 'tomerkel@post.bgu.ac.il'
-- ),
-- ( -- forth row: values for the columns in the list above
--  'milver', 'jonatan', 'milver', 'thePassword', 'milver@post.bgu.ac.il'
-- )
-- -- add more rows here
-- GO


-- Insert rows into table 'AssociationRepresentative'
INSERT INTO AssociationRepresentative
( -- columns to insert data into
    [userId]
)
VALUES
( -- first row: values for the columns in the list above
    1
)
GO

-- Insert rows into table 'Referees'
INSERT INTO Referees
( -- columns to insert data into
    [userId], [qualification], [isHeadReferee]
)
VALUES
( -- first row: values for the columns in the list above
    4, 'International', 1
),
( -- second row: values for the columns in the list above
    3, 'Master', 1
)
GO

-- Insert rows into table 'League'
INSERT INTO League
( -- columns to insert data into
    [LeagueName]
)
VALUES
( -- first row: values for the columns in the list above
    'League1'
),
( -- second row: values for the columns in the list above
    'League2'
)
GO

-- Insert rows into table 'GamePolicy'
INSERT INTO GamePolicy
( -- columns to insert data into
    [GamePolicyId],[title], [description]
)
VALUES
( -- first row: values for the columns in the list above
    1, 'One Game', 'Each team play against all the other teams in the league once'
),
( -- second row: values for the columns in the list above
    2, 'Two Games', 'Each team play against all the other teams in the league twice'
)
GO

-- Insert rows into table 'Season'
INSERT INTO Season
( -- columns to insert data into
    [LeagueId], [GamePolicyId]
)
VALUES
( -- first row: values for the columns in the list above
    1, 1
),
( -- second row: values for the columns in the list above
    2, 2
)
GO

