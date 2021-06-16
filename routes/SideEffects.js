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
        function getSideEffects(res, mysql, context, complete){
        // Query to select data from SideEffects table.
        mysql.pool.query("SELECT effectID, medID, sideEffect FROM SideEffects", function(err, returned, /*fields*/){
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



   