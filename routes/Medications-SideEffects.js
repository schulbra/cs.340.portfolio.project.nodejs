// Med-SideEffects.js
//SE direct copy paste doesnt work due to time constraints.:
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
/*...................................................................................................
- Brandon Schultz
- 5-28-21   
- Medication.js
- Router-containing file for handling requests received on the /Medication page of portfolio project for OSU's Introduction to Databases (CS340) course.

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

  // Function for interacting with Medications table.
  function getMedications(res, mysql, context, complete){
  // Query to select data from Medications table.
//id = medID
  mysql.pool.query("SELECT id, medName FROM Medications", function(err, resu, /*fields*/){
      if(err){
          console.log("err");
          res.write(JSON.stringify(err));
          res.end();
      }
      context.Medications = resu;
      //context.Customes = 
      complete();
  });

  
    // Function for searching for and returning individual customer idNum, fname, 
    // lname values on Customers.hbs: 
    function getSideEffects(res, mysql, context, complete){
        // Query to select data from SideEffects table.
        mysql.pool.query("SELECT id, medID, sideEffect FROM SideEffects", function(err, returned, /*fields*/){
        if(err){
            console.log("err");
            res.write(JSON.stringify(err));
            res.end();
        }
            context.SideEffects = returned;
            //context.Customes = 
            complete();
    });
  }
}

/* -------------------------------------------------------------------------------------------------/
- Function for displaying all entity items and their properties in Medications.hbs: 
---------------------------------------------------------------------------------------------------*/
router.get('/', function(req, res){
  var callbackCount = 0;
  var context = {};
  context.err = false;
  var mysql = req.app.get('mysql');
  getMedications(res, mysql, context, completed);
  function completed(){
      callbackCount++; 
      if(callbackCount >= 5){
          res.render('Medications', context);
      }

  }
});


/* -------------------------------------------------------------------------------------------------/
- Function for inserting/removing and updating Medication data to Medication's entity table on 
- Medications.hbs: 
---------------------------------------------------------------------------------------------------*/

router.post('/', function(req, res)
{
  var mysql = req.app.get('mysql');
  if(req.body.formType == "add")
  {
   console.log("Inserting Medication Data Into Medications Table...");
    console.log(req.body);
     var sql = "INSERT INTO Medications (medName) VALUES (?,?)";
     var inserts = [req.body.medName];
      sql = mysql.pool.query(sql,inserts,function(err, resu, fields){
         if(err){
              console.log(JSON.stringify(err))
             res.write(JSON.stringify(err));
             res.end();
          }
          
          else
          {
             res.redirect('/Medications');
         }
      });
  }


 else if(req.body.formType == "update"){
      console.log("Updating Medications Table Data...");
        console.log(req.body);
          var sql = "UPDATE Medications SET medName=? WHERE id=?";
          var inserts = [req.body.medName, req.body.increaseID];
            sql = mysql.pool.query(sql,inserts,function(err, resu, fields){
              if(err){
                console.log(JSON.stringify(err))
              res.write(JSON.stringify(err));
              res.end();
               }else{
                res.redirect('/Medications');
                }
    });
   }

else if(req.body.formType == "delete"){
    console.log("Deleting Medication Data From Medications Table...");
    console.log(req.body);
    var sql = "DELETE FROM Medications WHERE id=?";
    var inserts = [];
    var delVals = req.body;
    for (const property in delVals) {
        if(/delVal/.test(property)){
            inserts.push(parseInt(`${delVals[property]}`));
            sql = sql + " OR id=?";
        }
    }
    inserts.push(null);
    console.log(sql);
    console.log(inserts);
    
    sql = mysql.pool.query(sql,inserts,function(err, resu, fields){
        if(err){
            console.log(JSON.stringify(err))
            res.write(JSON.stringify(err));
            res.end();
        }else{
            res.redirect('/Medications');
        }
    });
}


else{
    console.log("Input Validation Failure");
    console.log(req.body);
    res.redirect('/Medications');
}
});



 



/* -------------------------------------------------------------------------------------------------/
- Function for displaying sideEffects Treated table data:
---------------------------------------------------------------------------------------------------*/
router.get('/', function(req, res){
  var callbackCount = 0;
  var context = {};
  context.err = false;
  var mysql = req.app.get('mysql');
  getSideEffects(res, mysql, context, complete);
  function complete(){
      callbackCount++; 
      if(callbackCount >= 1){
          res.render('SideEffects', context);
      }

  }
});
return router;
}();