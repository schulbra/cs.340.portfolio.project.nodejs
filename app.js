/* --------------------------------------------------------------------------------------------------------------------------------------/
 - Brandon Schultz
 - 5-28-21
 - app.js
 -
 -JS sources:
    - CS 290 coursework.
    - https://expressjs.com/en/guide/routing.html
    - https://jtable.org/ApiReference/GeneralOptions#genopt-addRecordButton
    - https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
    
 / -------------------------------------------------------------------------------------------------------------------------------------*/
  
var express =    require('express');                              // Instantiates  express object to interact with server in our code.
var mysql =      require('./dbcon.js');                           // Connects to database used in app/site.
var bodyParser = require('body-parser');                          // Gives ability to read HTTP POST data.
var app =        express();                                       // Call to express function to start new express application.
var handlebars = require('express-handlebars').create({defaultLayout:'main'}); // Imports express-handlebars.
app.engine       ('handlebars', handlebars.engine);               // Creates an instance of the handlebars engine for template processing.
app.use          (bodyParser.urlencoded({extended:true}));        // Middleware for parsing bodies from URL.
app.set          ('view engine', 'handlebars');                   // Middleware setting hbs as the view engine.
app.set          ('PORT', 9223);   
PORT = 9223;                                                      // Port # for hosting site via osu.

// from og ref****************************************
//app.use          (express.static('./public'))                     // Middleware for accessing css, img and js files in ../public
//app.use(express.static('public'));
app.use(express.static('./public')) //./files
//from : https://stackoverflow.com/questions/45395947/what-is-the-proper-way-of-referencing-css-and-js-files-with-handlebars
//app.use(express.static(path.join(__dirname, '/public')));
app.set          ('mysql', mysql);                                // Middleware for making mysql less difficult to work with.
// might need for accessing mysql files without being connected to db via phpmywhateverthelinkis
//app.use          (express.static('./public'))

/* -------------------------------------------------------------------------------------------/
- ROUTES: 
---------------------------------------------------------------------------------------------*/
// try on server for css
/*app.get('/', function(req, res, next) {
    res.render('index', {css: 'index.css'});
});*/

// Index pages route handler and css:
app.get('/', function(req, res,/*next*/) {
    res.render('index');//, {css: 'index.css'}); why wont you work
});

/* for getting back to index probably not needed but tutorial has it. */
app.get('/index',function(req,res){
    res.render('index');
});


// Main Table routes:
app.use('/Customers', require('./routes/Customers.js'));
app.use('/CustomerRecords', require('./routes/CustomerRecords.js'));
//app.use('/CustomerCustomerRecords', require('./routes/CustomerCustomerRecords.js'));
app.use('/Medications', require('./routes/Medications.js'));
app.use('/DiseasesTreated', require('./routes/DiseasesTreated.js'));
app.use('/SideEffects', require('./routes/SideEffects.js'));
app.use('/Inventories', require('./routes/Inventories.js'));
//app.use('/DiseasesTreatedSideEffects', require('./routes/DiseasesTreatedSideEffects.js'));

// Composite Table routes:
//app.use('/Customers-CustomerRecords', require('./routes/Customer-CustomerRecords.js'));
//app.use('/Medications-Diseases', require('./routes/Medications-Diseases.js'));
//app.use('/Medications-SideEffects', require('./routes/Medications-SideEffects.js'));

//                              Alltogetherwe16!
// 404 error taken from CS 290 coursework.
app.use(function(req,res){
    res.status(404);
    res.render('404');
  });

// 500 error taken from CS 290 coursework.
app.use(function(err, req, res, next){
    console.error(err.stack);
//  res.type('plain/text');
    res.status(500);
    res.render('500');
});

// ** make sure correct flip server

app.listen(PORT, function(){            
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
/*
app.listen(app.get('port'), function(){
    console.log('Express started on http://flip1.engr.oregonstate.edu/:' + app.get('port') + '; press Ctrl-C to terminate.');
});*/




/*------------------------------------------------------------------------------------------------------|
  -from tutorial
var exphbs = require('express-handlebars').create({      
  defaultLayout: 'main'
});

app.engine('.hbs', exphbs({                              //  to process templates
    extname: ".hbs"
}));
app.set('view engine', '.hbs');                          // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
--------------------------------------------------------------------------------------------------------*/


 //-from tutorial:
 /*app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('CustomerCustomerRecords', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query



/*  -----------------------------------------------------------------------------------|
    - POST route:

    Method 2 - Adding New Data via html form

    This is a bigger chunk of code, so I'll mention the general flow here:

        When the form's submit button is clicked, the data is sent to the back-end. 
        Express will convert the received data into a JS object for us.

        We access this data by accessing the req.body attribute.

        We then perform some minor validation on the received data, we assume that empty 
        fields mean the user  intended to assign the value NULL to that field.

    Run the query, with the assistance of implementing template literals.

    We check to see if there was an error, if there was, we send an error HTTP code back 
    to the client, if there was NO error, we use the call res.redirect() to redirect the 
    client to the root route after a successful insert into the database.



/ -----------------------------------------------------------------------------------*/ 
/*app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (fname, lname) VALUES ('${data['input-fname']}','${data['input-lname']})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM Customers and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})


/*  |------------------------------------------------------------------------- /
    - POST route:
    Method 1 - Adding New Data via Asynchronous Javascript and XML (AJAX)
|--------------------------------------------------------------------------- */

// -Indicates we set up a 'route' that will honor POST requests coming to /add-person. 
//      -This will be the URI we use in the client side JavaScript.



/*
app.post('/add-person-ajax', function(req, res) 
{
    /* Capture the incoming data and parse it back to a JS object: -----------------------------------------------------|
    - In POST requests, data transmitted is always contained in the body of the request. 
    - In express, you access that data  using req.body.
     //|-------------------|
    let data = req.body;
    

    /* Capture NULL values: --------------------------------------------------------------------------------------------|
    - Homeworld and age are number values. 
    - If the fields are left blank and we try to parse them to integers, they'll become NaN. 
    - We test for this and assume if they were blank, they should be NULL in the database.
   // |----------------------------------------|
    let homeworld = parseInt(data.homeworld);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data.age);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data.fname}', '${data.lname}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM bsg_people;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
*/


//|------------------------------------------------------------------------------------------------------------------|
// -The below was replaced by the above.
//|------------------------------------------------------------------------------------------------------------------|

/*
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.
*/

//|------------------------------------------------------------------------------------------------------------------|
// -The below was replaced by the above.
//|------------------------------------------------------------------------------------------------------------------|
/*
app.get('/', function(req, res)
    {
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        res.send(JSON.stringify(results));
                    });
                });
            });
        });
    }); */

/*
    LISTENER
*/
