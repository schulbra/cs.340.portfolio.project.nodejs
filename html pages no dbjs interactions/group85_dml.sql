-- -------------------------------------------------------------------------------
-- Group 85                                                                     -- 
-- Brandon Schultz, Robert Collins                                              -- 
-- Database: `cs340_schulbra`                                                   --                                
-- Project Step 4 Draft Version: DML  Queries (Group on Ed Discussion )         --
-- Document uses canvas sample.sql file style to denote non-SQL data management --
-- -------------------------------------------------------------------------------


-- ----------------------------------------------------------------------------------------
-- Insert functions:                                                                     --
-- ----------------------------------------------------------------------------------------

-- Query used for adding new row representing "Customer" to DB:
INSERT INTO Customers (fname, lname)
    VALUES (:fname_Input, :lname_Input);

-- Query used for adding new row representing "CustomerRecords" to DB:
INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
    VALUES (':customerID_Input', 'medID_Input', :prescriptionCount_Input, :prescriptionDosage_Input);

-- Query used for adding new row representing "Medications" to DB:
INSERT INTO Medications (medID, medName) 
    VALUES ('medID_Input', :medName_Input);

-- Query used for adding new row representing "DiseasesTreated" to DB:
INSERT INTO DiseasesTreated (medID, disease) 
    VALUES ('medID_Input', :disease_Input);

-- Query used for adding new row representing "SideEffects" to DB:
INSERT INTO SideEffects (medID, sideEffect) 
    VALUES ('medID_Input', :sideEffect_Input);

-- Query used for adding new row representing "Inventories" to DB:
INSERT INTO Inventories (medID, stock) 
    VALUES ('medID_Input', :stock_Input);


-- ----------------------------------------
-- Delete Functions:                     --
-- ----------------------------------------

-- Delete a customer row:
DELETE FROM Customers
WHERE customerID = :customerID_Input;

-- Delete a CustomerRecords row:
DELETE FROM CustomerRecords
WHERE recordID = :recordID_Input;

-- Delete a Medications row:
DELETE FROM Medications
WHERE medID = :medID_Input;

-- Delete a DiseasesTreated row:
DELETE FROM DiseasesTreated
WHERE diseaseID = :diseaseID_Input;

-- Delete a SideEffects row:
DELETE FROM SideEffects
WHERE effectID = :effectID_Input;

-- Delete a CustomerRecords row:
DELETE FROM Inventories
WHERE inventoryID = :inventoryID_Input;


-- ---------------------------------------------------------------------
-- Update Functions:                                                  --
-- ---------------------------------------------------------------------

-- Update query used in Customers table after addition of new user:
UPDATE Customers
SET 
    fname = :fname_Input,
    lname = :lname_Input
WHERE customerID = :customerID__recordID_Input_Selected_Row;


-- Update query used in CustomerRecords table:
UPDATE CustomerRecords
SET
    customersID = :customersID_Input
    medID = :medID_Input
    prescriptionCount = :prescriptionCount_Input
    prescriptionDosage = :prescriptionDosage_Input
WHERE recordID = :recordID_Input_Selected_Row;


-- Update query used in Medications table:
UPDATE Medications
SET 
    medName = :medName_Input
WHERE medID = :medID_Input_Selected_Row;


-- Update query used in DiseasesTreated table:
UPDATE DiseasesTreated
SET 
    medID = :medID_Input,
    disease = :disease_Input
WHERE diseaseID = :diseaseID_Input_Selected_Row;


-- Update query used in SideEffects table:
UPDATE SideEffects
SET 
    medID = :medID_Input,
    sideEffect = :sideEffect_Input
WHERE effectID = :effectID_Input_Selected_Row;

-- Update query used in SideEffects table:
UPDATE Inventories
SET 
    medID = :medID_Input,
    stock = :stockEffect_Input
WHERE inventoryID = :inventoryID_Input_Selected_Row;

-- --------------------------------------------------------------------------
-- Select and Search Functions:                                            --
-- --------------------------------------------------------------------------

SELECT * FROM Customers;    -- selects all Customers
SELECT * FROM Customers     -- select one Customer using ID number
    WHERE customerID = :customerID__recordID_Input_Selected_Row;

SELECT * FROM CustomerRecords;    -- selects all records
SELECT * FROM CustomerRecords     -- select one Custrecordomer using ID number
    WHERE recordID = :recordID_Input_Selected_Row;

SELECT * FROM Medications;    -- selects all medications
SELECT * FROM Medications     -- select one medications using ID number
    WHERE medID = :medID_Input_Selected_Row;

SELECT * FROM DiseasesTreated;    -- selects all diseases
SELECT * FROM DiseasesTreated     -- select one medications using ID number
    WHERE diseaseID = :diseaseID_Input_Selected_Row;

SELECT * FROM SideEffects;    -- selects all Side Effects
SELECT * FROM SideEffects     -- select one Side Effects using ID number
    WHERE effectID = :effectID_Input_Selected_Row;

SELECT * FROM Inventories;    -- selects all items from inventory
SELECT * FROM Inventories     -- select one item from invenotry using ID number
    WHERE inventoryID = :inventoryID_Input_Selected_Row;

