/*
* Group 4
* Natasha Pavelek
* Ryan Szwast
*/

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS DEVELOPERS, LANGUAGES, PLATFORMS, TECHNOLOGIES, COUNTRIES,
    DEVELOPER_LANGUAGES, DEVELOPER_PLATFORMS, DEVELOPER_TECHNOLOGIES;

/* Create tables for strong entities */
-- Records demographic information about surveyed developers
CREATE TABLE DEVELOPERS (
    DeveloperId int PRIMARY KEY,
    CountryId int,
    DevType varchar(255),
    Age varchar(255),
    EdLevel varchar(255),
    YearsCodePro int,
    CompTotal int,
    ConvertedCompYearly int
);

-- Records various programming language names
CREATE TABLE LANGUAGES (
    LanguageId int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) UNIQUE NOT NULL
);

-- Records the names of various software platforms
CREATE TABLE PLATFORMS (
    PlatformId int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) UNIQUE NOT NULL
);

-- Records the name of various software technologies
CREATE TABLE TECHNOLOGIES (
    TechnologyId int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) UNIQUE NOT NULL
);

-- Records various facts about the country of each developer
CREATE TABLE COUNTRIES (
    CountryId int PRIMARY KEY AUTO_INCREMENT,
    Name varchar(255) UNIQUE NOT NULL,
    Population int,
    CurrencyName varchar(255),
    InnovationIndex decimal(10, 2)
);

-- Add foreign key from COUNTRIES to DEVELOPERS
ALTER TABLE DEVELOPERS
    ADD FOREIGN KEY (CountryId)
        REFERENCES COUNTRIES(CountryId)
        ON UPDATE CASCADE
        ON DELETE SET NULL;

/* Create tables for weak entities */
-- Resolves M:M between DEVELOPERS and LANGUAGES
CREATE TABLE DEVELOPER_LANGUAGES (
    DeveloperId int,
    LanguageId int,
    HaveWorkedWith tinyint DEFAULT 0,
    WantToWorkWith tinyint DEFAULT 0,
    PRIMARY KEY (DeveloperId, LanguageId),
    FOREIGN KEY (DeveloperId)
        REFERENCES DEVELOPERS(DeveloperId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (LanguageId)
        REFERENCES LANGUAGES(LanguageId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (HaveWorkedWith IN (1, 0)),
    CHECK (WantToWorkWith IN (1, 0))
);

-- Resolves M:M between DEVELOPERS and PLATFORMS
CREATE TABLE DEVELOPER_PLATFORMS (
    DeveloperId int,
    PlatformId int,
    HaveWorkedWith tinyint DEFAULT 0,
    WantToWorkWith tinyint DEFAULT 0,
    PRIMARY KEY (DeveloperId, PlatformId),
    FOREIGN KEY (DeveloperId)
        REFERENCES DEVELOPERS(DeveloperId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (PlatformId)
        REFERENCES PLATFORMS(PlatformId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (HaveWorkedWith IN (1, 0)),
    CHECK (WantToWorkWith IN (1, 0))
);

-- Resolves M:M between DEVELOPERS and TECHNOLOGIES
CREATE TABLE DEVELOPER_TECHNOLOGIES (
    DeveloperId int,
    TechnologyId int,
    HaveWorkedWith tinyint DEFAULT 0,
    WantToWorkWith tinyint DEFAULT 0,
    PRIMARY KEY (DeveloperId, TechnologyId),
    FOREIGN KEY (DeveloperId)
        REFERENCES DEVELOPERS(DeveloperId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (TechnologyId)
        REFERENCES TECHNOLOGIES(TechnologyId)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (HaveWorkedWith IN (1, 0)),
    CHECK (WantToWorkWith IN (1, 0))
);

/* Record insertions */
INSERT INTO DEVELOPERS (
    DeveloperId,
    CountryId,
    DevType,
    Age,
    EdLevel,
    YearsCodePro,
    CompTotal,
    ConvertedCompYearly
)
VALUES (
    2,
    1,
    "Senior Executive (C-Suite, VP, etc.)",
    "25-34 years old",
    "Bachelor’s degree (B.A., B.S., B.Eng., etc.)",
    9,
    285000,
    285000
),
(
    12,
    2,
    "Developer, full-stack",
    "25-34 years old",
    "Bachelor’s degree (B.A., B.S., B.Eng., etc.)",
    9,
    118000,
    78003
),
(
    15,
    3,
    "Developer, full-stack",
    "25-34 years old",
    "Master’s degree (M.A., M.S., M.Eng., MBA, etc.)",
    7,
    175000,
    187407
);

INSERT INTO LANGUAGES (Name)
VALUES
    ("HTML/CSS"),
    ("Bash/Shell (all shells)"),
    ("C#");

INSERT INTO PLATFORMS (Name)
VALUES
    ("Amazon Web Services (AWS)"),
    ("Digital Ocean"),
    ("Fly.io");

INSERT INTO TECHNOLOGIES (Name)
VALUES
    ("Docker"),
    ("Gradle"),
    ("Kubernetes");

INSERT INTO COUNTRIES (
    Name,
    Population,
    CurrencyName,
    InnovationIndex
)
VALUES
    ("United States of America", 333.3 * POWER(10, 6), "USD", 1.88),
    ("Australia", 26.01 * POWER(10, 6), "AUD", 1.02),
    ("Netherlands", 17.7 * POWER(10, 6), "EUR", 1.55);

INSERT INTO DEVELOPER_LANGUAGES (
    DeveloperId,
    LanguageId,
    HaveWorkedWith,
    WantToWorkWith
)
VALUES
    (2, 2, 0, 1),
    (12, 3, 1, 1),
    (15, 1, 0, 0);

INSERT INTO DEVELOPER_PLATFORMS (
    DeveloperId,
    PlatformId,
    HaveWorkedWith,
    WantToWorkWith
)
VALUES
    (2, 1, 1, 0),
    (12, 2, 1, 0),
    (15, 3, 0, 0);

INSERT INTO DEVELOPER_TECHNOLOGIES (
    DeveloperId,
    TechnologyId,
    HaveWorkedWith,
    WantToWorkWith
)
VALUES
    (2, 1, 1, 0),
    (12, 2, 1, 0),
    (15, 3, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;

