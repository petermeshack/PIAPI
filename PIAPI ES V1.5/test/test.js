import JsonDatabaseAPI from '../peters_new_api/app.js';

// Create an instance of JsonDatabaseAPI with the file name 'database.json'
const api = new JsonDatabaseAPI('database.json');

// Create a new database named 'users'
api.createDatabase('users');
api.createTable('users', 'myTable', { fullname: [], age: [] });
api.addFieldsItems('users', 'myTable', 'fullname', { content: 'peter' });
api.addFieldsItems('users', 'myTable',  'age', { content: 15 });
//api.addNewField('users', 'myTable', 'email[]');
//api.editDatabase('users','mydb');
//api.editTable('users', 'myTable','employees');
//api.editFieldsItems('users', 'myTable', 'fullname','names');
//api.editFieldsItemsContent('users', 'myTable', 'fullname', '01', 'john');
//api.editFieldsItemsAllContent('users', 'myTable', 'fullname','peter', 'newContent');
//api.deleteDatabase('users');
//api.deleteTable('users', 'myTable');
//api.deleteField('users', 'myTable', 'fullname');
//api.deleteFieldsItemsContent('users', 'myTable', 'fullname', '01', 'peter');
//api.deleteFieldsItemsAllContent('users', 'myTable', 'fullname','peter');

//api.createTable('users', 'table2', { field3: [], field4: [] });
//api.joinTable('users', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);
//api.joinDatabaseAndTable('users','users', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);
//api.joinToNewDatabaseAndTable('users','mypeople', 'joinedTable', ['myTable', 'table2'], ['fullname', 'field3']);

console.log(api.getDatabase());

