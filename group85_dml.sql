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
INSERT INTO Customers (fname, lname) VALUES ($fname, $lname);

/*-- Query used for adding new row representing "CustomerRecords" to DB:
INSERT INTO CustomerRecords (customerID, medID, prescriptionCount, prescriptionDosage)
    VALUES (':customerID_Input', 'medID_Input', :prescriptionCount_Input, :prescriptionDosage_Input);*/

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
DELETE FROM Customers WHERE customerID = $customerID;

/*-- Delete a CustomerRecords row:
DELETE FROM CustomerRecords
WHERE recordID = :recordID_Input;*/

-- Delete a Medications row:
DELETE FROM Medications WHERE medID = $medID;

-- Delete a DiseasesTreated row:
DELETE FROM DiseasesTreated WHERE diseaseID = $diseaseID;

-- Delete a SideEffects row:
DELETE FROM SideEffects WHERE effectID = $effectID;

-- Delete a CustomerRecords row:
DELETE FROM Inventories WHERE inventoryID = $inventoryID;


-- ---------------------------------------------------------------------
-- Update Functions:                                                  --
-- ---------------------------------------------------------------------

-- Update query used in Customers table after addition of new user:
UPDATE Customers
SET 
    fname = $fname,
    lname = $lname
WHERE customerID = $customerID;


/*-- Update query used in CustomerRecords table:
UPDATE CustomerRecords
SET
    customersID = :customersID_Input
    medID = :medID_Input
    prescriptionCount = :prescriptionCount_Input
    prescriptionDosage = :prescriptionDosage_Input
WHERE recordID = :recordID_Input_Selected_Row;*/


-- Update query used in Medications table:
UPDATE Medications
SET 
    medName = $medName
WHERE medID = $medID;


-- Update query used in DiseasesTreated table:
UPDATE DiseasesTreated
SET 
    medID = $medID,
    disease = $disease
WHERE diseaseID = $diseaseID;


-- Update query used in SideEffects table:
UPDATE SideEffects
SET 
    medID = $medID,
    sideEffect = $sideEffect
WHERE effectID = $effectID;

-- Update query used in SideInventoriesEffects table:
UPDATE Inventories
SET 
    medID = $medID,
    stock = $stock
WHERE inventoryID = $inventoryID;

-- --------------------------------------------------------------------------
-- Select and Search Functions:                                            --
-- --------------------------------------------------------------------------

SELECT * FROM Customers ORDER BY lname;    -- selects all Customers, displaying them by last name
SELECT * FROM Customers     -- select one Customer using ID number
    WHERE customerID = $customerID;

SELECT * FROM CustomerRecords ORDER BY recordID;    -- selects all records displaying them by recordID
SELECT * FROM CustomerRecords     -- select one Custrecordomer using ID number
    WHERE recordID = $recordID;

SELECT * FROM Medications ORDER BY medID;    -- selects all medications, displaying and ordering by medID
SELECT * FROM Medications     -- select one medications using ID number
    WHERE medID = $medID;

SELECT * FROM DiseasesTreated;    -- selects all diseases
SELECT * FROM DiseasesTreated     -- select one medications using ID number
    WHERE diseaseID = $diseaseID;

SELECT * FROM SideEffects;    -- selects all Side Effects
SELECT * FROM SideEffects     -- select one Side Effects using ID number
    WHERE effectID = $effectID;

SELECT * FROM Inventories;    -- selects all items from inventory
SELECT * FROM Inventories     -- select one item from invenotry using ID number
    WHERE inventoryID = $inventoryID;

