/*- -----------------------------------------------------------------------------
-- Group 85                                                                   -- 
-- Brandon Schultz, Robert Collins                                            -- 
-- Database: `cs340_schulbra`                                                 --                                
-- Project Step 4 Draft Version: DDL Queries                                  --
-- Document is heavily based off sample_database_ddq_file posted to canavs.   --
-- ---------------------------------------------------------------------------*/

/*DROP TABLE IF EXISTS "Customers";
DROP TABLE IF EXISTS "Medications";
DROP TABLE IF EXISTS "CustomerRecords";
DROP TABLE IF EXISTS "DiseasesTreated";
DROP TABLE IF EXISTS "SideEffects";
DROP TABLE IF EXISTS "Inventories";*/

/*-------------------------------------------------------\
| Table structure for Customers entity table.             |
\-------------------------------------------------------*/
CREATE TABLE Customers(customerID INTEGER AUTO_INCREMENT,
fname VARCHAR(255) NOT NULL, 
lname VARCHAR(255) NOT NULL,
PRIMARY KEY (customerID));


/* --------------------------------------------------\
| Table structure for table Medications               |
\---------------------------------------------------*/
CREATE TABLE Medications(medID INTEGER AUTO_INCREMENT,
medName varchar(255) NOT NULL,
PRIMARY KEY (medID));


/* --------------------------------------------------------------------------\
| Table structure for table CustomerRecords                                   |
\---------------------------------------------------------------------------*/
CREATE TABLE CustomerRecords(recordID INTEGER AUTO_INCREMENT,
customerID integer, 
medID integer,
prescriptionCount varchar(255) NOT NULL,
prescriptionDosage varchar(255) NOT NULL,
PRIMARY KEY (recordId),
FOREIGN KEY (customerID) REFERENCES Customers (customerID) ON DELETE CASCADE,
FOREIGN KEY (medID) REFERENCES Medications (medID) ON DELETE CASCADE);


/* ----------------------------------------------------------------------\
| Table structure for DiseasesTreated entity table.                       |
\-----------------------------------------------------------------------*/
CREATE TABLE DiseasesTreated(diseaseID INTEGER AUTO_INCREMENT,
medID integer, 
disease VARCHAR(255) NOT NULL,
PRIMARY KEY (diseaseID),
FOREIGN KEY (medID) REFERENCES Medications (medID) ON DELETE CASCADE);


/* ----------------------------------------------------------------------\
|- Table structure for SideEffects entity table.                          |
\ ----------------------------------------------------------------------*/
CREATE TABLE SideEffects(effectID INTEGER AUTO_INCREMENT,
medID integer, 
sideEffect varchar(255) NOT NULL,
PRIMARY KEY (effectID),
FOREIGN KEY (medID) REFERENCES Medications (medID) ON DELETE CASCADE);


/* ----------------------------------------------------------------------\
|- Table structure for Inventories entity table.                        -|
\ ----------------------------------------------------------------------*/
CREATE TABLE Inventories(inventoryID INTEGER AUTO_INCREMENT,
medID integer,
stock varchar(255) NOT NULL,
PRIMARY KEY (inventoryID),
FOREIGN KEY (medID) REFERENCES Medications (medID) ON DELETE CASCADE);


/* ----------------------------------------------------------------------\
|  - b) Sample Data:                                                     -- 
\ ----------------------------------------------------------------------*/


-- -------------------------------------------------- 
-- Insert table rows (sample data) for `Customers` -- 
-- --------------------------------------------------
INSERT INTO Customers (fname, lname) VALUES ("Kanye", "West");
INSERT INTO Customers (fname, lname) VALUES ("MC", "RIDE");
INSERT INTO Customers (fname, lname) VALUES ("William", "Rosecrans");


-- ----------------------------------------------------------
-- Insert table rows (sample data) for `Medications`       -- 
-- ----------------------------------------------------------
INSERT INTO Medications (medName) VALUES ("Buspirone");
INSERT INTO Medications (medName) VALUES ("Anadrol");
INSERT INTO Medications (medName) VALUES ("Revivalodeine");


-- ------------------------------------------------------------------------------------------
-- Insert table rows (sample data) for `CustomerRecords`                                   -- 
-- ------------------------------------------------------------------------------------------
INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage) VALUES
    (1, 1, 100, 2),
    (2, 2, 50, 2),
    (3, 3, 1, 1);

/*    INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
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
*/

-- ------------------------------------------------------------------------------------------------
-- Insert table rows (sample data) for `DiseasesTreated`                                         -- 
-- ------------------------------------------------------------------------------------------------
INSERT INTO DiseasesTreated (medID, disease) VALUES
    (1, "Anxiety"),
    (2, "Anemia"),
    (3, "Lack of Vitality");
                            
/* INSERT INTO DiseasesTreated (medID, disease) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Buspirone"), 
    "Anxiety");

INSERT INTO DiseasesTreated (medID, disease)  
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Anadrol"), 
    "Anemia");

INSERT INTO DiseasesTreated (medID, disease)
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Revivalodeine"), 
    "Lack of Vitality"); */


-- ------------------------------------------------------------------------------------------------------
-- Insert table rows (sample data) for `SideEffects`                                                   -- 
-- ------------------------------------------------------------------------------------------------------
INSERT INTO SideEffects (medID, sideEffect) VALUES
    (1, "Chest pain, feeling nervous or excited."),
    (2, "Swelling, increased aggression, noided."),
    (3, "Reanimation, incessable thirst quenched by orange soda.");


/*  INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Buspirone"),
    "Chest pain, feeling nervous or excited.");

INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Anadrol"),
    "Swelling, increased aggression, noided.");

INSERT INTO SideEffects (medID,sideEffect)
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Revivalodeine"),
    "Reanimation, incessable thirst quenched by orange soda.");
*/

-- ------------------------------------------------------------------------ 
-- Insert table rows (sample data) for `Inventories`                     -- 
-- ------------------------------------------------------------------------
INSERT INTO Inventories (medID,stock) VALUES
    (1, 808),
    (2, 4547),
    (3, 78);

/*
INSERT INTO Inventories (medID,stock) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Anadrol"),
    "4547");

INSERT INTO Inventories (medID,stock) 
    VALUES ( (SELECT medID FROM Medications WHERE medName = "Revivalodeine"),
    "78");
*/