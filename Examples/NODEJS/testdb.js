const JsonDatabaseAPI = require('./MYAPI/api');

// Create an instance of the JsonDatabaseAPI
const api = new JsonDatabaseAPI();

// Create a new database
api.createDatabase('myDatabase');
//api.createDatabase('Users');
// Create a table
api.createTable('myDatabase', 'myTable', {fullname:[],age:[]});
//api.createTable('Company', 'registerdusers', {fullname:[]});
// Add field items
api.addFieldsItems('myDatabase', 'myTable', 'fullname', { content: 'peter' });
api.addFieldsItems('myDatabase', 'myTable', 'age', { content: 15 });
// Print the initial state
//console.log(api.getDatabase());

// Change the object name (field name)
//api.editFieldsItems('myDatabase', 'myTable', 'newFieldName','fullname' );
// Change the content of an item
//api.editFieldsItemsContent('myDatabase', 'myTable', 'fullname', '01', 'peter');
// Print the updated state

// Change all items with content 'peter' to 'newContent'
//api.editFieldsItemsAllContent('myDatabase', 'myTable', 'fullname', 'peter', 'newContent');
// Add a new field named 'age' to the 'myTable' table in the 'myDatabase' database
//api.addNewField('myDatabase', 'myTable', 'age');

// Add a new field named 'address[]' to the 'myTable' table in the 'myDatabase' database
//api.addNewField('myDatabase', 'myTable', 'address');

// Add a new field named 'email[]' to the 'myTable' table in the 'myDatabase' database
//api.addNewField('myDatabase', 'myTable', 'email[]');

// Delete the 'myDatabase' and its content
//api.deleteDatabase('myDatabase');
// Delete the 'myTable' from the 'myDatabase'
//api.deleteTable('myDatabase', 'myTable');
// Delete the 'fullname' field from the 'myTable' in the 'myDatabase'
//api.deleteField('myDatabase', 'myTable', 'fullname');

// Delete the item with id '01' and content 'peter' from the 'fullname' field in the 'myTable' of the 'myDatabase'
//api.deleteFieldsItemsContent('myDatabase', 'myTable', 'fullname', '01', 'peter');
// Delete all items with content 'peter' from the 'fullname' field in the 'myTable' of the 'myDatabase'
//api.deleteFieldsItemsAllContent('myDatabase', 'myTable', 'fullname', 'peter');
api.createTable('myDatabase', 'table2', { field3: [], field4: [] });

// Join the tables into a new table named 'joinedTable'
//api.joinTable('myDatabase', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);

//api.joinDatabaseAndTable('myDatabase','myDatabase', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);
//api.joinToNewDatabaseAndTable('myDatabase','mypeople', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);


console.log(api.getDatabase());
