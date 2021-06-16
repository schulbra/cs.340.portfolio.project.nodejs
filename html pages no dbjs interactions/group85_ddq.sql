
-- -----------------------------------------------------------------------------
-- Group 85                                                                   -- 
-- Brandon Schultz, Robert Collins                                            -- 
-- Database: `cs340_schulbra`                                                 --                                
-- Project Step 4 Draft Version: DDL Queries                                  --
-- Document is heavily based off sample_database_ddq_file posted to canavs.   --
-- -----------------------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
    `customerID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `fname` varchar(255) NOT NULL,
    `lname` varchar(255) NOT NULL
);


-- -------------------------------------------------
-- Table structure for table `Medications`        -- 
-- -------------------------------------------------
DROP TABLE IF EXISTS `Medications`;
CREATE TABLE `Medications` (
    `medID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `medName` varchar(255) NOT NULL
);

-- ------------------------------------------------------------------------------------
-- Table structure for table `CustomerRecords`                                       --
-- -fk constraint structure was inspired using:                                      --
--  https://docs.oracle.com/cd/E17952_01/mysql-5.6-en/create-table-foreign-keys.html --
-- ------------------------------------------------------------------------------------
DROP TABLE IF EXISTS `CustomerRecords`;
CREATE TABLE `CustomerRecords` (
  `recordID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `customerID` int NOT NULL,
  `medID` int NOT NULL,
  `prescriptionCount` varchar(255) NOT NULL,
  `prescriptionDosage`varchar(255) NOT NULL,
  FOREIGN KEY (`customerID`) 
		REFERENCES `Customers` (`customerID`)
		ON DELETE cascade
		ON UPDATE CASCADE,
  FOREIGN KEY (`medID`) 
		REFERENCES `Medications` (`medID`)
		ON DELETE cascade
		ON UPDATE CASCADE
-- CONSTRAINT `customerID` FOREIGN KEY (`customerID`) 
--      REFERENCES `Customers` (`customerID`) ON DELETE CASCADE ON UPDATE CASCADE,
-- CONSTRAINT `medID` FOREIGN KEY (`medID`) 
--      REFERENCES `Medications` (`medID`) ON DELETE CASCADE ON UPDATE CASCADE
);



-- -----------------------------------------------------
-- Table structure for table `DiseasesTreated`        -- 
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DiseasesTreated`;
CREATE TABLE `DiseasesTreated` (
    `diseaseID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `medID` int,
    `disease` varchar(255) NOT NULL,
    FOREIGN KEY (`medID`) 
	    REFERENCES `Medications` (`medID`)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

-- ----------------------------------------------------
-- Table structure for table `SideEffects`           -- 
-- ----------------------------------------------------
DROP TABLE IF EXISTS `SideEffects`;
CREATE TABLE `SideEffects` (
    `effectID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `medID` int,
    `sideEffect` varchar(255) NOT NULL,
    FOREIGN KEY (`medID`) 
	    REFERENCES `Medications` (`medID`)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);


-- -------------------------------------------------------
-- Table structure for table `Inventories`              -- 
-- -------------------------------------------------------
DROP TABLE IF EXISTS `Inventories`;
CREATE TABLE `Inventories` (
    `inventoryID` int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `medID` int,
    `stock` varchar(255) NOT NULL,
    FOREIGN KEY (`medID`) 
	    REFERENCES `Medications` (`medID`)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

-- -------------------------------------------------------
-- b) Sample Data:                                      -- 
-- -------------------------------------------------------

-- -------------------------------------------------- 
-- Insert table rows (sample data) for `Customers` -- 
-- --------------------------------------------------
INSERT INTO Customers (fname, lname)
    VALUES ('Kanye', 'West');

INSERT INTO Customers (fname, lname)
    VALUES ('MC', 'RIDE');

INSERT INTO Customers (fname, lname)
    VALUES ('William', 'Rosecrans');

-- -----------------------------------------------------------------------------------
-- Insert table rows (sample data) for `CustomerRecords`                            -- 
-- -----------------------------------------------------------------------------------
INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
    	VALUES ( (SELECT customerID FROM Customers WHERE fname = 'Kanye'),
		(SELECT medID FROM Medications WHERE medName = 'Buspirone'),
        '100', '2');
    
INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
    	VALUES ( (SELECT customerID FROM Customers WHERE fname = 'MC'),
		(SELECT medID FROM Medications WHERE medName = 'Anadrol'),
        '100', '4');

INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
    	VALUES ( (SELECT customerID FROM Customers WHERE fname = 'William'),
		(SELECT medID FROM Medications WHERE medName = 'Revivalodeine'),
        '1', '1');

-- ----------------------------------------------------------
-- Insert table rows (sample data) for `Medications`       -- 
-- ----------------------------------------------------------
INSERT INTO Medications (medName) VALUES ('Buspirone');
INSERT INTO Medications (medName) VALUES ('Anadrol');
INSERT INTO Medications (medName) VALUES ('Revivalodeine');

-- ------------------------------------------------------------------------------------------------
-- Insert table rows (sample data) for `DiseasesTreated`                                         -- 
-- ------------------------------------------------------------------------------------------------
INSERT INTO DiseasesTreated (medID, disease) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Buspirone'), 
    'Anxiety');

INSERT INTO DiseasesTreated (medID, disease)  
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Anadrol'), 
    'Anemia');

INSERT INTO DiseasesTreated (medID, disease)
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Revivalodeine'), 
    'Lack of Vitality');
    

-- ------------------------------------------------------------------------------------------------------
-- Insert table rows (sample data) for `SideEffects`                                                   -- 
-- ------------------------------------------------------------------------------------------------------
INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Buspirone'),
    'Chest pain, feeling nervous or excited.');

INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Anadrol'),
    'Swelling, increased aggression, noided.');

INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Revivalodeine'),
    'Reanimation, incessable thirst quenched by orange soda.');

-- ------------------------------------------------------------------------ 
-- Insert table rows (sample data) for `Inventories`                     -- 
-- ------------------------------------------------------------------------
INSERT INTO Inventories (medID,stock) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Buspirone'),
    '808');

INSERT INTO Inventories (medID,stock) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Anadrol'),
    '4547');

INSERT INTO Inventories (medID,stock) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = 'Revivalodeine'),
    '78');