//-------------------------------------------------------------------------------------------------------//
//  Name: Brandon Schultz                                                                                //
//  Date: 5-27-20                                                                                        //
//  Description: Node.js driver for mysql connection pool. Used to establish connection to mysql server. //
//-------------------------------------------------------------------------------------------------------//

// 
var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',  // Hostname of the database being connected to.
  user            : 'cs340_schulbra',                   // MySQL user.
  password        : '7119',                            // MySQL user pass.
  database        : 'cs340_schulbra'                    // Name of database being connected to by the user.
});

module.exports.pool = pool;
