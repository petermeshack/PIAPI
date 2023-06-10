const fs = require('fs');
const path = require('path');

const date = new Date();
const JsonDatabaseAPI=class  {
constructor() {
  this.databasePath = path.join(__dirname, '../database.json');
  this.logFilePath = path.join(__dirname, 'logs.txt');
  this.database = this.loadDatabase();
}

loadDatabase() {
  try {
    const databaseContent = fs.readFileSync(this.databasePath, 'utf-8');
    return JSON.parse(databaseContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      this.log('loginfo', 'Creating a new database...');
      const newDatabase = {};
      this.saveDatabase(newDatabase);
      return newDatabase;
    }
    this.log('logerror',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Error loading the database: ${ error.message}`);
    return {};
  }
}

saveDatabase(database) {
  try {
    const databaseContent = JSON.stringify(database, null, 2);
    fs.writeFileSync(this.databasePath, databaseContent);
  } catch (error) {
    this.log('logerror',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Error saving the database: ${error.message}`);
  }
}

log(logType, message) {
  const logEntry = `[${logType}] ${message}`;
  console.log(logEntry);
  fs.appendFileSync(this.logFilePath, logEntry + '\n');
}

createDatabase(databaseName) {
  if (this.database.hasOwnProperty(databaseName)) {
    this.log('logerror',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+ "[time:"+date.getTime()+"]"+  `Database '${databaseName}' already exists.`);
    return;
  }
  this.database[databaseName] = {};
  this.log('loginfo',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+   `Database '${databaseName}' created.`);
  this.saveDatabase(this.database);
}

createTable(databaseName, tableName, fields) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log('logerror',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+ date.getTime()+"]"+  `Database '${databaseName}' does not exist.`);
    return;
  }
  const database = this.database[databaseName];
  if (database.hasOwnProperty(tableName)) {
    this.log('logerror', "[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Table '${tableName}' already exists in database '${databaseName}'.`);
    return;
  }
  database[tableName] = fields;
  this.log('loginfo',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+   `Table '${tableName}' created in database '${databaseName}'.`);
  this.saveDatabase(this.database);
}

addFieldsItems(databaseName, tableName, fieldName, fieldItems) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log('logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+ `Database '${databaseName}' does not exist.`);
    return;
  }
  const database = this.database[databaseName];
  if (!database.hasOwnProperty(tableName)) {
    this.log('logerror',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+ "[time:"+date.getTime()+"]"+  `Table '${tableName}' does not exist in database '${databaseName}'.`);
    return;
  }
  const table = database[tableName];
  if (!table.hasOwnProperty(fieldName)) {
    this.log('logerror', "[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
    return;
  }
  const field = table[fieldName];
  const newId = Object.keys(field).length + 1;
  field.push({ id: newId.toString().padStart(2, '0'), content: fieldItems.content });
  this.log('loginfo',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Added field items to '${fieldName}' in table '${tableName}' of database '${databaseName}'.`);
  this.saveDatabase(this.database);
}

addNewField(databaseName, tableName, fieldName) {
if (!this.database.hasOwnProperty(databaseName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Database '${databaseName}' does not exist.`
  );
  return;
}

const database = this.database[databaseName];
if (!database.hasOwnProperty(tableName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Table '${tableName}' does not exist in database '${databaseName}'.`
  );
  return;
}

const table = database[tableName];
const adjustedFieldName = fieldName.trim().replace(/\s/g, '');

if (adjustedFieldName.endsWith('[]')) {
  const actualFieldName = adjustedFieldName.slice(0, -2); // Remove "[]" from the field name
  if (!table.hasOwnProperty(actualFieldName)) {
    table[actualFieldName] = [];
    this.saveDatabase(this.database);
    this.log(
      'loginfo',
      `Added a new field '${actualFieldName}' to table '${tableName}' in database '${databaseName}'.`
    );
  } else {
    this.log(
      'logerror',
      `Field '${actualFieldName}' already exists in table '${tableName}' of database '${databaseName}'.`
    );
  }
} else {
  if (!table.hasOwnProperty(adjustedFieldName)) {
    table[adjustedFieldName] = [];
    this.saveDatabase(this.database);
    this.log(
      'loginfo',
      `Added a new field '${adjustedFieldName}' to table '${tableName}' in database '${databaseName}'.`
    );
  } else {
    this.log(
      'logerror',
      `Field '${adjustedFieldName}' already exists in table '${tableName}' of database '${databaseName}'.`
    );
  }
}
}


editDatabase(existingDatabaseName, changedDatabaseName) {
  if (!this.database.hasOwnProperty(existingDatabaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${existingDatabaseName}' does not exist.`
    );
    return;
  }

  const databaseContent = this.database[existingDatabaseName];
  delete this.database[existingDatabaseName];
  this.database[changedDatabaseName] = databaseContent;
  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Database name changed from '${existingDatabaseName}' to '${changedDatabaseName}'.`
  );
}
editTable(databaseName, oldTableName, newTableName) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  const database = this.database[databaseName];
  if (!database.hasOwnProperty(oldTableName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Table '${oldTableName}' does not exist in database '${databaseName}'.`
    );
    return;
  }

  const tableContent = database[oldTableName];
  delete database[oldTableName];
  database[newTableName] = tableContent;
  this.saveDatabase(this.database);
  this.log(
    'loginfo',
    `Table name changed from '${oldTableName}' to '${newTableName}' in database '${databaseName}'.`
  );
}

editFieldsItems(databaseName, tableName, oldFieldName, newFieldName) {
if (!this.database.hasOwnProperty(databaseName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Database '${databaseName}' does not exist.`
  );
  return;
}

const database = this.database[databaseName];
if (!database.hasOwnProperty(tableName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Table '${tableName}' does not exist in database '${databaseName}'.`
  );
  return;
}

const table = database[tableName];
if (!table.hasOwnProperty(oldFieldName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Field '${oldFieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`
  );
  return;
}

const fieldItems = table[oldFieldName];
table[newFieldName] = fieldItems;
delete table[oldFieldName];
this.saveDatabase(this.database);
this.log(
  'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
  `Field '${oldFieldName}' in table '${tableName}' of database '${databaseName}' was changed to '${newFieldName}'.`
);
}

editFieldsItemsContent(databaseName, tableName, itemField, id, fieldContent) {
if (!this.database.hasOwnProperty(databaseName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Database '${databaseName}' does not exist.`
  );
  return;
}

const database = this.database[databaseName];
if (!database.hasOwnProperty(tableName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Table '${tableName}' does not exist in database '${databaseName}'.`
  );
  return;
}

const table = database[tableName];
if (!table.hasOwnProperty(itemField)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`
  );
  return;
}

const fieldItems = table[itemField];
const itemIndex = fieldItems.findIndex(item => item.id === id);
if (itemIndex === -1) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Item with id '${id}' does not exist in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`
  );
  return;
}

fieldItems[itemIndex].content = fieldContent;
this.saveDatabase(this.database);
this.log(
  'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
  `Content of item with id '${id}' in field '${itemField}' of table '${tableName}' in database '${databaseName}' was changed to '${fieldContent}'.`
);
}

editFieldsItemsAllContent(databaseName, tableName, itemField, fieldContent, newFieldContent) {
if (!this.database.hasOwnProperty(databaseName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Database '${databaseName}' does not exist.`
  );
  return;
}

const database = this.database[databaseName];
if (!database.hasOwnProperty(tableName)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Table '${tableName}' does not exist in database '${databaseName}'.`
  );
  return;
}

const table = database[tableName];
if (!table.hasOwnProperty(itemField)) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`
  );
  return;
}

const fieldItems = table[itemField];
let modified = 0;

for (let item of fieldItems) {
  if (item.content === fieldContent) {
    item.content = newFieldContent;
    modified++;
  }
}

if (modified === 0) {
  this.log(
    'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `No items with content '${fieldContent}' found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`
  );
  return;
}

this.saveDatabase(this.database);
this.log(
  'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
  `Changed ${modified} item(s) with content '${fieldContent}' to '${newFieldContent}' in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`
);
}

deleteDatabase(databaseName) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  delete this.database[databaseName];
  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Deleted database '${databaseName}' and its content.`
  );
}

deleteTable(databaseName, tableName) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  const database = this.database[databaseName];
  if (!database.hasOwnProperty(tableName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Table '${tableName}' does not exist in database '${databaseName}'.`
    );
    return;
  }

  delete database[tableName];
  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Deleted table '${tableName}' from database '${databaseName}'.`
  );
}

deleteField(databaseName, tableName, fieldName) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  const database = this.database[databaseName];
  if (!database.hasOwnProperty(tableName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Table '${tableName}' does not exist in database '${databaseName}'.`
    );
    return;
  }

  const table = database[tableName];
  if (!table.hasOwnProperty(fieldName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`
    );
    return;
  }

  delete table[fieldName];
  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Deleted field '${fieldName}' from table '${tableName}' of database '${databaseName}'.`
  );
}

deleteFieldsItemsContent(databaseName, tableName, itemField, id, fieldContent) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  const database = this.database[databaseName];
  if (!database.hasOwnProperty(tableName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Table '${tableName}' does not exist in database '${databaseName}'.`
    );
    return;
  }

  const table = database[tableName];
  if (!table.hasOwnProperty(itemField)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`
    );
    return;
  }

  const field = table[itemField];
  const index = field.findIndex(item => item.id === id && item.content === fieldContent);
  if (index === -1) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `No matching item found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`
    );
    return;
  }

  field.splice(index, 1);
  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Deleted item from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`
  );
}

deleteFieldsItemsAllContent(databaseName, tableName, itemField, fieldContent) {
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Database '${databaseName}' does not exist.`
    );
    return;
  }

  const database = this.database[databaseName];
  if (!database.hasOwnProperty(tableName)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Table '${tableName}' does not exist in database '${databaseName}'.`
    );
    return;
  }

  const table = database[tableName];
  if (!table.hasOwnProperty(itemField)) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`
    );
    return;
  }

  const field = table[itemField];
  const initialLength = field.length;
  table[itemField] = field.filter(item => item.content !== fieldContent);

  if (table[itemField].length === initialLength) {
    this.log(
      'logerror', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
      `No items matching '${fieldContent}' found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`
    );
    return;
  }

  this.saveDatabase(this.database);
  this.log(
    'loginfo', "[day:"+date.getDay()+"month:"+date.getMonth()+"month:"+date.getMonth+"]"+"[time:"+date.getTime()+"]"+
    `Deleted all items matching '${fieldContent}' from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`
  );
}
joinTable(databaseName, newTableName, tablesToJoin, fieldsToCopy) {

  // Check if the database exists
  if (!this.database.hasOwnProperty(databaseName)) {
    this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Database '${databaseName}' does not exist.`);
    return;
  }

  // Get the specified tables to join
  const database = this.database[databaseName];
  const joinedTable = {};

  for (const tableName of tablesToJoin) {
    // Check if the table exists in the database
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    const tableData = database[tableName];

    // Copy the specified fields from the table
    for (const field of fieldsToCopy) {
      if (tableData.hasOwnProperty(field)) {
        joinedTable[field] = tableData[field];
      } else {
        this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Field '${field}' does not exist in table '${tableName}'.`);
      }
    }
  }

  // Create the new table with the copied fields
  this.createTable(databaseName, newTableName, joinedTable);
}
joinDatabaseAndTable(sourceDatabaseName, targetDatabaseName, newTableName, tablesToJoin, fieldsToCopy) {
  const date = new Date();

  // Check if the source database exists
  if (!this.database.hasOwnProperty(sourceDatabaseName)) {
    this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Source database '${sourceDatabaseName}' does not exist.`);
    return;
  }

  // Check if the target database exists
  if (!this.database.hasOwnProperty(targetDatabaseName)) {
    this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Target database '${targetDatabaseName}' does not exist.`);
    return;
  }

  const sourceDatabase = this.database[sourceDatabaseName];
  const targetDatabase = this.database[targetDatabaseName];
  const joinedTable = {};

  // Check if the tables to join exist in the source database and copy the specified fields
  for (const tableName of tablesToJoin) {
    if (!sourceDatabase.hasOwnProperty(tableName)) {
      this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Table '${tableName}' does not exist in source database '${sourceDatabaseName}'.`);
      return;
    }

    const tableData = sourceDatabase[tableName];

    for (const field of fieldsToCopy) {
      if (tableData.hasOwnProperty(field)) {
        joinedTable[field] = tableData[field];
      } else {
        this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Field '${field}' does not exist in table '${tableName}'.`);
      }
    }
  }

  // Create the new table in the target database with the copied fields
  this.createTable(targetDatabaseName, newTableName, joinedTable);

  // Log the successful join operation
  this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Join operation successful. Fields copied from tables [${tablesToJoin.join(', ')}] to new table '${newTableName}' in target database '${targetDatabaseName}'.`);
}
joinToNewDatabaseAndTable(sourceDatabaseName, targetDatabaseName, newTableName, tablesToJoin, fieldsToCopy) {
  const date = new Date();

  // Check if the source database exists
  if (!this.database.hasOwnProperty(sourceDatabaseName)) {
    this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Source database '${sourceDatabaseName}' does not exist.`);
    return;
  }

  const sourceDatabase = this.database[sourceDatabaseName];
  let targetDatabase = this.database[targetDatabaseName];

  // Create the target database if it doesn't exist
  if (!targetDatabase) {
    targetDatabase = {};
    this.database[targetDatabaseName] = targetDatabase;
    this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Created new target database '${targetDatabaseName}'.`);
  }

  const joinedTable = {};

  // Check if the tables to join exist in the source database and copy the specified fields
  for (const tableName of tablesToJoin) {
    if (!sourceDatabase.hasOwnProperty(tableName)) {
      this.log('logerror', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Table '${tableName}' does not exist in source database '${sourceDatabaseName}'.`);
      return;
    }

    const tableData = sourceDatabase[tableName];

    for (const field of fieldsToCopy) {
      if (tableData.hasOwnProperty(field)) {
        joinedTable[field] = tableData[field];
      } else {
        this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Field '${field}' does not exist in table '${tableName}'.`);
      }
    }
  }

  // Append the new table to the target database
  targetDatabase[newTableName] = joinedTable;

  // Log the successful join operation
  this.log('loginfo', `[(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}][time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] Join operation successful. Fields copied from tables [${tablesToJoin.join(', ')}] to new table '${newTableName}' in target database '${targetDatabaseName}'.`);

  // Save the updated database
  this.saveDatabase(this.database);
}
getDatabase() {
  return this.database;
}
}

module.exports = JsonDatabaseAPI;
