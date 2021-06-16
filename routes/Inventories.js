/*..............................................................................
- Brandon Schultz
- 5-28-21   
- Customer.js
- Router-containing file for handling requests received on the /Customer page of portfolio project for OSU's Introduction to Databases (CS340) course.

- Sources:
    - https://www.tutorialspoint.com/expressjs/expressjs_routing.htm
    - https://expressjs.com/en/guide/routing.html
    - https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
    - https://www.freecodecamp.org/news/node-module-exports-explained-with-javascript-export-function-examples/
    - https://www.jquery-az.com/sql-if-else-begin-end-statement/
    - https://www.tutorialspoint.com/updating-a-record-in-mysql-using-nodejs
    - https://www.sqlshack.com/how-to-update-from-a-select-statement-in-sql-server/
    - https://dev.to/lisahjung/beginner-s-guide-to-using-mysql-database-in-a-node-js-app-49li
    - https://dev.to/lisahjung/beginner-s-guide-to-building-a-server-with-express-js-29c3


..............................................................................*/

module.exports = function() {
  // Defines and creates a route module that is then used in Express application
  // compononet of project.
  var express = require('express');
  var router = express.Router();

  //-------------------------------------------------------------------//
  // Function for searching for and returning individual customer idNum, fname, 
  // lname values on Inventories.hbs: 
  function getInventories(res, mysql, context, complete){
      // Query to select data from Inventories table.
      mysql.pool.query("SELECT inventoryID, medID, stock FROM Inventories", 
      function(err, returned, /*fields*/){
          if(error){
              console.log("ERROR");
              res.write(JSON.stringify(error));
              res.end();
          }
          context.Inventories = returned;
          //context.Customes = 
          complete();
      });
  }

  router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.err = false;
    var mysql = req.app.get('mysql');
    getInventories(res, mysql, context, completed);
    function completed(){
        callbackCount++; 
        if(callbackCount >= 5){
            res.render('Inventories', context);
        }

    }
});


  /*-------------------------------------------------------------------//
  // Function for searching for and returning individual customer record data toCustomerRecords.hbs: */
  /*function getCustomerRecords(res, mysql, context, complete){
  // Query to select data from CustomerRecords table.
  mysql.pool.query("SELECT id, customerID, medID, prescriptionCount, prescriptionDosage FROM CustomerRecords", function(error, results, fields){
      if(error){
          console.log("ERROR");
          res.write(JSON.stringify(error));
          res.end();
      }
      context.CustomerRecords = results;
      //context.CustomerRecords = CustomerRecords
      complete();
   });
  }

  // Function for interacting with Medications table.
  function getMedications(res, mysql, context, complete){
  // Query to select data from Medications table.
  //id = medID
  mysql.pool.query("SELECT id, medName FROM Medications", function(error, results, fields){
      if(error){
          console.log("ERROR");
          res.write(JSON.stringify(error));
          res.end();
      }
      context.Medications = results;
      //context.Customes = 
      complete();
  });
}*/

/* -------------------------------------------------------------------------------------------------/
- Function for displayingInventories entity :
---------------------------------------------------------------------------------------------------*/

/*
router.get('/', function(req, res){
  var callbackCount = 0;
  var context = {};
  context.err = false;
  var mysql = req.app.get('mysql');
  getCustomerRecords(res, mysql, context, complete);
  getInventories(res, mysql, context, complete);
  getMedications(res, mysql, context, complete);
  function complete(){
      callbackCount++; 
      if(callbackCount >= 5){
          res.render('CustomerRecords', context);
      }

  }
});*/
  
return router;
}();
