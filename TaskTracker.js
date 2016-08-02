'use strict';

(function() {
    var savedTasks = [
                        {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
                        {"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
                        {"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
                        {"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
                        {"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
                        {"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
                        {"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
                     ],
        
        //init() function initializes the data and events required for the app
        init = function () {
            //commenting out the arrow functions because of safari support
            //savedTasks.forEach(({name, date, assigned}) => addElementToDOM (name, date, assigned));
            
            //iterate through the list of JSON array and add elements in the pane
            savedTasks.forEach(function({name, date, assigned}) {
                addElementToDOM (name, date, assigned);
            });

            document.getElementById('submit').addEventListener('click', onSubmitClick);
        },
        
        //onSubmitClick() is invoked on the click of the submit button
        onSubmitClick = function (evt) {
            evt.preventDefault();
            var name = document.getElementById('taskName').value,
                date = document.getElementById('taskDate').value,
                assignedTo = document.getElementById('assignedTo').value,
                success = function() { //function execute on resolve of the promise
                    document.getElementById('taskForm').reset();
                },
                failure = function(msg) { //function execute on reject of the promise
                    alert(msg);
                }; 
            
            //try invoing the function to add the new <li>
            addElementToDOM (name, date, assignedTo).then(success, failure);
        },
        
        //addElementToDOM() adds the <li> with new data into the panel of saved tasks
        addElementToDOM = function (name, date, assignedTo) {
            
            //function either resolves or rejects the Promise to create a <li> element into the DOM
            if (name && date && assignedTo) { //name, date and assignedTo fields should not be empty for promise to be resolved
                return Promise.resolve(document.getElementById('savedTasks').innerHTML += `<li><p class="taskName">${name}</p><p class="taskDate">${date}</p><p class="assignedTo">${assignedTo}</p></li>`);
            } else {
                return Promise.reject('Cannot Add an Empty Task!!!');
            }
            
        };
    
    init(); //initiate the app
        
})();