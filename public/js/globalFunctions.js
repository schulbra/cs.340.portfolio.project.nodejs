/* --------------------------------------------------------------------------------------------------------------------------------------/
 - Brandon Schultz
 - 5-28-21
 - globalFunctions.js
 -
 -JS sources:
    - CS 290 coursework.
    - https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    - https://expressjs.com/en/guide/routing.html
    - https://jtable.org/ApiReference/GeneralOptions#genopt-addRecordButton
    - https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
     - https://www.jquery-az.com/sql-if-else-begin-end-statement/
    - https://www.tutorialspoint.com/updating-a-record-in-mysql-using-nodejs
    - https://www.sqlshack.com/how-to-update-from-a-select-statement-in-sql-server/
    - https://dev.to/lisahjung/beginner-s-guide-to-using-mysql-database-in-a-node-js-app-49li
    - https://dev.to/lisahjung/beginner-s-guide-to-building-a-server-with-express-js-29c3
    -https://javascript.info/global-object
    - https://stackoverflow.com/questions/9139075/how-to-show-a-confirm-message-before-delete
    
 / -------------------------------------------------------------------------------------------------------------------------------------*/

  // Event listeners for the update functionality used throughout projects site.
  document.getElementById("increaseID").addEventListener("change", confirmFieldAdd);

  //Update functionalities:
  function updateButton(){
    if (this.checked) 
    {
        document.getElementById("addButton").value = "Update " + tableName;
        window.addEventListener('domcLoaded', function () { document.getElementById("addButton").style = "background-color: #3b4655" });
     
            if(document.getElementById("includeID")){document.getElementById("includeID").style = "display:none";}
                 document.getElementById("increaseID").style = "display:table-row";
                  document.getElementById("selID").selectedIndex = 0;
                   document.getElementById("includeFrmType").value="update";
                    undoFieldAdd();
                     confirmFieldAdd();
    }  

    else
    {
        document.getElementById("addButton").value = "Add " + tableName;

         if(document.getElementById("includeID")){document.getElementById("includeID").style = "display:table-row";}
             document.getElementById("increaseID").style = "display:none";
                document.getElementById("includeFrmType").value="add";
                     undoFieldAdd();
    }
 };

 function confirmFieldAdd(){
    undoFieldAdd();
    for (var field, i = 0; field = fields[i]; i++)
    {
        if(fields[i].input=="text"){
            fillFieldText(i);
         }

        else if (fields[i].input == "select") {
            fillFieldSelect(i);
        }
    }
 }

 function fillFieldText(x){
    document.getElementById("sel" + fields[x].attrib).value=document.getElementById(tableName + document.getElementById("selID").value + "val" + fields[x].attrib).textContent;
 }

 function fillFieldSelect(x){
    var val=document.getElementById(tableName + document.getElementById("selID").value + "val" + fields[x].attrib).textContent;
    sel=document.getElementById("sel" + fields[x].attrib);
     for (var opt, i = 0; opt = sel.options[i]; i++) {
            if (opt.textContent == val) {
             sel.selectedIndex = i;
            break;
        }
    }
}

 function undoFieldAdd(){
    for (var field, i = 0; field = fields[i]; i++) {
        if(fields[i].input=="text"){
            document.getElementById("sel" + fields[i].attrib).value="";
        }
        else if (fields[i].input=="select"){
            document.getElementById("sel" + fields[i].attrib).options.selectedIndex=0;
        }
    }
}

  // Delete functionalities:
  document.getElementById("unlockLock").addEventListener("change", unlockLock);
  document.getElementById("deleteButton").addEventListener("click", confirmDelete);
  window.addEventListener('domcLoaded',
    function () { document.getElementById("deleteButton").style = "background-color: #c6b286" });
  document.getElementById("undoCheckedButton").addEventListener("click", undoSelectedBoxes);
  var boxes = document.getElementsByClassName("deleteChkBox");
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("change", createCheckListToRemove);
    }
    // Enable removal button
    function unlockLock(){
        if (this.checked) {
            document.getElementById("deleteButton").disabled=false;
            document.getElementById("deleteButton").style=""
        }

        else {
        document.getElementById("deleteButton").disabled=true;
            document.getElementById("deleteButton").style ="background-color: #c6b286"
    }
    }
      // Takes items checked and forms list that will be confirmed to be removed via confirmDelete
      // from https://stackoverflow.com/questions/9139075/how-to-show-a-confirm-message-before-delete
      function createCheckListToRemove(){
        if (this.checked) {
          values.push(parseInt(this.value));
        }
        else
        {
            for (i = 0; i < values.length; i++)
            {
            if (parseInt(values[i]) == parseInt(this.value)) {
                values.splice(i, 1);

                break;

            }
        }
      }
      }

      //Confirm selected values:
        /*var deleteLinks = document.querySelectorAll('.delete');

        for (var i = 0; i < deleteLinks.length; i++) {
        deleteLinks[i].addEventListener('click', function(event) {
          event.preventDefault();

         var choice = confirm(this.getAttribute('data-confirm'));

          if (choice) {
        window.location.href = this.getAttribute('href');
        }
       }  );
        }*/
     function confirmDelete(){
     values = values.sort(function(a, b){return a-b});
     var valList="";
     var form=document.getElementById("delete");
      for (i = 0; i < values.length; i++) {
        var newInput=document.createElement("input");
        valList += values[i] + ", ";
        newInput.id="delVal" + i;
        newInput.class="delVal";
        newInput.type="hidden";
        newInput.name="delVal" + i;
        newInput.value=values[i];
        form.appendChild(newInput);
        }
         if (confirm('Are you sure you want to delete?' + valList)) {
          document.getElementById("delete").submit();
         }

        else {

         for (i = 0; i < values.length; i++) {
            document.getElementById("delVal" + i).remove();
          }
         }
     }


     function undoSelectedBoxes(){
            document.getElementById("showTable").reset();
             values = [];
        }

