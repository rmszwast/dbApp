/*
* Group 4
* Natasha Pavelek
* Ryan Szwast
*/

-- SELECT queries

-- Get all surveyed developers
SELECT a.DeveloperId, a.DevType, b.Name AS Country, a.Age, a.EdLevel,
    a.YearsCodePro, a.CompTotal, a.ConvertedCompYearly
FROM DEVELOPERS AS a
JOIN COUNTRIES AS b ON a.CountryId = b.CountryId;

-- Get all programming languages
SELECT *
FROM LANGUAGES;

-- Get all software platforms
SELECT *
FROM PLATFORMS;

-- Get all software technologies
SELECT *
FROM TECHNOLOGIES;

-- Get all countries for surveyed developers
SELECT *
FROM COUNTRIES;

-- Get all languages used by developers
SELECT a.DeveloperId, b.DevType, a.LanguageId,
    c.Name, a.HaveWorkedWith, a.WantToWorkWith
FROM DEVELOPER_LANGUAGES AS a
JOIN DEVELOPERS AS b ON a.DeveloperId = b.DeveloperId
JOIN LANGUAGES AS c ON a.LanguageId = c.LanguageId;

-- Get all platforms used by developers
SELECT a.DeveloperId, b.DevType, a.PlatformId,
    c.Name, a.HaveWorkedWith, a.WantToWorkWith
FROM DEVELOPER_PLATFORMS AS a
JOIN DEVELOPERS AS b ON a.DeveloperId = b.DeveloperId
JOIN PLATFORMS AS c ON a.PlatformId = c.PlatformId;

-- Get all technologies used by developers
SELECT a.DeveloperId, b.DevType, a.TechnologyId,
    c.Name, a.HaveWorkedWith, a.WantToWorkWith
FROM DEVELOPER_TECHNOLOGIES AS a
JOIN DEVELOPERS AS b ON a.DeveloperId = b.DeveloperId
JOIN TECHNOLOGIES AS c ON a.TechnologyId = c.TechnologyId;


-- INSERT queries
-- '$var' denotes vals passed by backend

INSERT INTO DEVELOPERS (DeveloperId, DevType, CountryId, Age, EdLevel,
    YearsCodePro, CompTotal, ConvertedCompYearly)
VALUES
(
    $DeveloperId,
    $DevType,
    (SELECT CountryId FROM COUNTRIES WHERE Name = $Country),
    $Age,
    $EdLevel,
    $YearsCodePro,
    $CompTotal,
    $ConvertedCompYearly
);

INSERT INTO LANGUAGES (Name)
VALUES ($Name);

INSERT INTO PLATFORMS (Name)
VALUES ($Name);

INSERT INTO TECHNOLOGIES (Name)
VALUES ($Name);

INSERT INTO COUNTRIES (Name, Population, CurrencyName, InnovationIndex)
VALUES ($Name, $Population, $CurrencyName, $InnovationIndex);

INSERT INTO DEVELOPER_LANGUAGES (DeveloperId, LanguageId, HaveWorkedWith,
    WantToWorkWith)
VALUES
(
    $DeveloperId,
    (SELECT LanguageId FROM LANGUAGES WHERE Name = $Name),
    $HaveWorkedWith,
    $WantToWorkWith
);

INSERT INTO DEVELOPER_PLATFORMS (DeveloperId, PlatformId, HaveWorkedWith,
    WantToWorkWith)
VALUES
(
    $DeveloperId,
    (SELECT PlatformId FROM PLATFORMS WHERE Name = $Name),
    $HaveWorkedWith,
    $WantToWorkWith
);

INSERT INTO DEVELOPER_TECHNOLOGIES (DeveloperId, TechnologyId, HaveWorkedWith,
    WantToWorkWith)
VALUES
(
    $DeveloperId,
    (SELECT TechnologyId FROM TECHNOLOGIES WHERE Name = $Name),
    $HaveWorkedWith,
    $WantToWorkWith
);


-- UPDATE queries
-- '$var' denotes vals passed by backend

UPDATE DEVELOPERS
SET DevType = $DevType,
    CountryId = (SELECT CountryId FROM COUNTRIES WHERE Name = $Country),
    Age = $Age,
    EdLevel = $EdLevel,
    YearsCodePro = $YearsCodePro,
    CompTotal = $CompTotal,
    ConvertedCompYearly = $ConvertedCompYearly
WHERE DeveloperId = $DeveloperId;

UPDATE LANGUAGES
SET Name=$Name
WHERE LanguageId=$LanguageId;

UPDATE PLATFORMS
SET Name = $Name
WHERE PlatformId = $PlatformId;

UPDATE TECHNOLOGIES
SET Name=$Name
WHERE TechnologyId=$TechnologyId;

UPDATE COUNTRIES
SET Name = $Name,
    Population = $Population,
    CurrencyName = $CurrencyName,
    InnovationIndex = $InnovationIndex
WHERE CountryId=$CountryId;

UPDATE DEVELOPER_LANGUAGES
SET DeveloperId = $DeveloperId,
    LanguageId = $LanguageId,
    HaveWorkedWith = $HaveWorkedWith,
    WantToWorkWith = $WantToWorkWith;

UPDATE DEVELOPER_PLATFORMS
SET DeveloperId = $DeveloperId,
    PlatformId = $PlatformId,
    HaveWorkedWith = $HaveWorkedWith,
    WantToWorkWith = $WantToWorkWith;

UPDATE DEVELOPER_TECHNOLOGIES
SET DeveloperId = $DeveloperId,
    TechnologyId = $TechnologyId,
    HaveWorkedWith = $HaveWorkedWith,
    WantToWorkWith = $WantToWorkWith;


-- DELETE queries
-- '$var' denotes vals passed by backend

DELETE FROM DEVELOPERS
WHERE DeveloperId = $DeveloperId;

DELETE FROM LANGUAGES
WHERE LanguageId = $LanguageId;

DELETE FROM PLATFORMS
WHERE PlatformId = $PlatforId;

DELETE FROM TECHNOLOGIES
WHERE TechnologyId = $TechnologyId;

DELETE FROM COUNTRIES
WHERE CountryId = $CountryId;

DELETE FROM DEVELOPER_LANGUAGES
WHERE DeveloperId = $DeveloperId AND LanguageId = $LanguageId;

DELETE FROM PLATFORMS
WHERE DeveloperId = $DeveloperId AND PlatformId = $PlatformId;

DELETE FROM DEVELOPER_TECHNOLOGIES
WHERE DeveloperId = $DeveloperId AND TechnologyId = $TechnologyId;

