const DatabaseQueries = require('./MYAPI/databaseQueries');
const queries = new DatabaseQueries('database.json');

queries.addDatabase('myDatabase');
queries.addTable('myDatabase', 'myTable', { fullname: [], username: [] });
queries.addUniqueFieldsItems('myDatabase', 'myTable', 'fullname', { content: 'peter' });
queries.addUniqueFieldsItems('myDatabase', 'myTable', 'username', { content: 'petermeshack' });

queries.addTable('myDatabase', 'myUsers', { age: [], money: [] });
queries.addUniqueFieldsItems('myDatabase', 'myUsers', 'age', { content: '15' });
queries.addUniqueFieldsItems('myDatabase', 'myUsers', 'money', { content: '100' });

const allItems = queries.queryAllUnderDatabase('myDatabase');
console.log(allItems);

//queries.changeDatabase('myDatabase', 'newDatabaseName');
//queries.deleteFullDatabase('myDatabase');
//queries.changeTable('myDatabase', 'myTable', 'newTableName');
//queries.deleteTable('myDatabase', 'myTable');
//queries.addNewFieldtoTable('myDatabase', 'myTable', 'age');
//queries.changeField('myDatabase', 'myTable', 'fullname', 'newFieldname');

//queries.changeFieldContent('myDatabase', 'myTable', 'fullname', '01', 'john');
//queries.changeFieldAllContent('myDatabase', 'myTable', 'fullname', 'peter','john' );

//queries.deleteField('myDatabase', 'myTable', 'username');

//queries.deleteFieldContent('myDatabase', 'myTable', 'fullname', '01', 'john');
//queries.deleteAllFieldContent('myDatabase', 'myTable', 'fullname', 'john');
//queries.joinTableFields('myDatabase', 'joinedTable', ['myTable', 'myUsers'], ['fullname', 'money']);
//queries.joinExistingOrNotDatabaseTableFields('myDatabase','myDatabase', 'joinedTable', ['myTable', 'myUsers'], ['fullname', 'money'])




