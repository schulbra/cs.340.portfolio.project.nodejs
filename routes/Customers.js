/*...................................................................................................
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


...................................................................................................*/

// Instructs node.js to export the below/following functions:


module.exports = function() {
    // Defines and creates a route module that is then used in Express application
    // compononet of project.
    var express = require('express');
    var router = express.Router();

    // Function for searching for and returning individual customer idNum, fname, 
    // lname values on Customers.hbs: 
    function getCustomers(res, mysql, context, complete){
    // Query to select data from Customers table.
    mysql.pool.query("Select customerID, fname, lname FROM Customers", function(error, results, fields){
        if(error){
            console.log("ERROR");
            res.write(JSON.stringify(error));
            res.end();
        }
        context.Customers = results;
        //context.Customes = 
        complete();
    });
}

/* -------------------------------------------------------------------------------------------------/
- Function for displaying all customer's idNum, fname, lname values on Customers.hbs: 
---------------------------------------------------------------------------------------------------*/
 router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.err = false;
    var mysql = req.app.get('mysql');
    getCustomers(res, mysql, context, complete);
    function complete(){
        callbackCount++; 
        if(callbackCount >= 1){
            res.render('Customers', context);
        }

    }
 });


/* -------------------------------------------------------------------------------------------------/
- Function for inserting/removing and updating customer data to customer's entity table on 
- Customers.hbs: 
---------------------------------------------------------------------------------------------------*/

 router.post('/', function(req, res)
 {
    var mysql = req.app.get('mysql');
    if(req.body.formType == "add")
    {
     console.log("Inserting Customer Data Into Customers Table...");
      console.log(req.body);
       var sql = "INSERT INTO Customers (fname, lname) VALUES (?,?)";
       var inserts = [req.body.fname, req.body.lname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
           if(error){
                console.log(JSON.stringify(error))
               res.write(JSON.stringify(error));
               res.end();
            }
            
            else
            {
               res.redirect('/Customers');
           }
        });
    }


   else if(req.body.formType == "update"){
        console.log("Updating Customers Table Data...");
          console.log(req.body);
            var sql = "UPDATE Customers SET fname=?, lname=? WHERE customerID=?";
            var inserts = [req.body.fname, req.body.lname, req.body.increaseID];
              sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                  console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
                 }else{
                  res.redirect('/Customers');
                  }
      });
  }

  else if(req.body.formType == "delete"){
      console.log("Deleting Customer Data From Customers Table...");
      console.log(req.body);
      var sql = "DELETE FROM Customers WHERE customerID=?";
      var inserts = [];
      var delVals = req.body;
      for (const property in delVals) {
          if(/delVal/.test(property)){
              inserts.push(parseInt(`${delVals[property]}`));
              sql = sql + " OR customerID=?";
          }
      }
      inserts.push(null);
      console.log(sql);
      console.log(inserts);
      
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/Customers');
          }
      });
  }


  else{
      console.log("Error: Input Validation Failure");
      console.log(req.body);
      res.redirect('/Customers');
  }
 });

return router;
}();



   