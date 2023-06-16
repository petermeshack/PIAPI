import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
const currentDate = new Date();
const logEntrytime = `[(dd/mm/yy):${currentDate.getUTCDate()}/${currentDate.getUTCMonth()}/${currentDate.getUTCFullYear()}][time(hh/mm/ss):${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]`;

class JsonDatabaseAPI {
  constructor(fileName) {
    const __filename = fileURLToPath(import.meta.url);
    this.filePath = path.join(path.dirname(__filename), fileName);
    this.logFilePath = path.join(path.dirname(__filename), 'logs.txt');
    this.database = this.loadDatabase();
    this.createEmptyFile(); // Create the file if it doesn't exist
    this.fs = fs;
  }

  loadDatabase() {
    try {
      const databaseContent = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(databaseContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.log('loginfo','Creating a new database...');
        const newDatabase = {};
        this.saveDatabase(newDatabase);
        return newDatabase;
      }
      this.log('logerror',`Error loading the database: ${error.message}`
      );
      return {};
    }
  }

  readData() {
    try {
      const data = this.loadDatabase();
      console.log(`Data from ${this.filePath}:`, data);
      return data;
    } catch (error) {
      this.log(error);
      throw error;
    }
  }

  writeData(data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.filePath, jsonString, 'utf8');
      console.log(`Data written to ${this.filePath} successfully.`);
    } catch (error) {
      this.log(error);
      throw error;
    }
  }

  saveDatabase(database) {
    try {
      const databaseContent = JSON.stringify(database, null, 2);
      fs.writeFileSync(this.filePath, databaseContent);
    } catch (error) {
      this.log('logerror',`Error saving the database: ${error.message}` );
    }
  }

  createEmptyFile() {
    try {
      fs.ensureFileSync(this.filePath);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  log(logType, message) {
    const logEntry = `[${logType}] ${message}`;
    console.log(logEntrytime+logEntry);
    fs.appendFileSync(this.logFilePath, logEntrytime+logEntry + '\n');
  }
  createDatabase(databaseName) {
    if (this.database.hasOwnProperty(databaseName)) {
      const logErrorEntry =  `Database '${databaseName}' already exists.`;
      this.log('logerror', logErrorEntry);
      return;
    }
  
    this.database[databaseName] = {};
    const logInfoEntry = `Database '${databaseName}' created.`;
    this.log('loginfo', logInfoEntry);
    this.saveDatabase(this.database);
  }
  createTable(databaseName, tableName, fields) {
    if (!this.database.hasOwnProperty(databaseName)) {
      const logErrorEntry = ` Database '${databaseName}' does not exist.`;
      this.log('logerror', logErrorEntry);
      return;
    }

    const database = this.database[databaseName];
    if (database.hasOwnProperty(tableName)) {
      const logErrorEntry = `Table '${tableName}' already exists in database '${databaseName}'.`;
      this.log('logerror', logErrorEntry);
      return;
    }

    database[tableName] = fields;
    const logInfoEntry = `Table '${tableName}' created in database '${databaseName}'.`;
    this.log('loginfo', logInfoEntry);
    this.saveDatabase(this.database);
  }
  addFieldsItems(databaseName, tableName, fieldName, fieldItems) {
    
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror', `${databaseName}`+ 'does not exist.');
      return;
    }

    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror', `Table ${tableName} ' does not exist in database '${databaseName}'.`);
      return;
    }

    const table = database[tableName];
    if (!table.hasOwnProperty(fieldName)) {
      this.log('logerror', ` Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }

    const field = table[fieldName];
    const newId = Object.keys(field).length + 1;
    field.push({ id: newId.toString().padStart(2, '0'), content: fieldItems.content });
    this.log('loginfo', ` Added fielditem into '${fieldName}' in table '${tableName}' of database '${databaseName}'.`);
    this.saveDatabase(this.database);
  }
  addNewField(databaseName, tableName, fieldName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror', `Database '${databaseName}' does not exist.`);
      return;
    }
    
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
    
    const table = database[tableName];
    const adjustedFieldName = fieldName.trim().replace(/\s/g, '');
    
    if (adjustedFieldName.endsWith('[]')) {
      const actualFieldName = adjustedFieldName.slice(0, -2); // Remove "[]" from the field name
      if (!table.hasOwnProperty(actualFieldName)) {
        table[actualFieldName] = [];
        this.saveDatabase(this.database);
        this.log('loginfo', `Added a new field '${actualFieldName}' to table '${tableName}' in database '${databaseName}'.`);
      } else {
        this.log('logerror',`Field '${actualFieldName}' already exists in table '${tableName}' of database '${databaseName}'.`);
      }
    } else {
      if (!table.hasOwnProperty(adjustedFieldName)) {
        table[adjustedFieldName] = [];
        this.saveDatabase(this.database);
        this.log(
          'loginfo',`Added a new field '${adjustedFieldName}' to table '${tableName}' in database '${databaseName}'.`);
      } else {
        this.log(
          'logerror',`Field '${adjustedFieldName}' already exists in table '${tableName}' of database '${databaseName}'.`);
      }
    }
  }
  editDatabase(existingDatabaseName, changedDatabaseName) {
    if (!this.database.hasOwnProperty(existingDatabaseName)) {
      this.log('logerror', `Database '${existingDatabaseName}' does not exist.`);
      return;
    }
  
    const databaseContent = this.database[existingDatabaseName];
    delete this.database[existingDatabaseName];
    this.database[changedDatabaseName] = databaseContent;
    this.saveDatabase(this.database);
    this.log('loginfo', `Database name changed from '${existingDatabaseName}' to '${changedDatabaseName}'.`);
  }
  editTable(databaseName, oldTableName, newTableName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror', `Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(oldTableName)) {
      this.log('logerror',`Table '${oldTableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const tableContent = database[oldTableName];
    delete database[oldTableName];
    database[newTableName] = tableContent;
    this.saveDatabase(this.database);
    this.log('loginfo',`Table name changed from '${oldTableName}' to '${newTableName}' in database '${databaseName}'.`);
  }
  editFieldsItems(databaseName, tableName, oldFieldName, newFieldName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
    
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror', `Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
    
    const table = database[tableName];
    if (!table.hasOwnProperty(oldFieldName)) {
      this.log('logerror',`Field '${oldFieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
    
    const fieldItems = table[oldFieldName];
    table[newFieldName] = fieldItems;
    delete table[oldFieldName];
    this.saveDatabase(this.database);
    this.log('loginfo',`Field '${oldFieldName}' in table '${tableName}' of database '${databaseName}' was changed to '${newFieldName}'.`);
  }
  editFieldsItemsContent(databaseName, tableName, itemField, id, fieldContent) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
    
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
    
    const table = database[tableName];
    if (!table.hasOwnProperty(itemField)) {
      this.log('logerror', `Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
    
    const fieldItems = table[itemField];
    const itemIndex = fieldItems.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      this.log('logerror', `Item with id '${id}' does not exist in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`);
      return;
    }
    
    fieldItems[itemIndex].content = fieldContent;
    this.saveDatabase(this.database);
    this.log('loginfo',`Content of item with id '${id}' in field '${itemField}' of table '${tableName}' in database '${databaseName}' was changed to '${fieldContent}'.`);
  }
  editFieldsItemsAllContent(databaseName, tableName, itemField, fieldContent, newFieldContent) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror', `Database '${databaseName}' does not exist.`);
      return;
    }
    
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log(
        'logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
    
    const table = database[tableName];
    if (!table.hasOwnProperty(itemField)) {
      this.log(
        'logerror',`Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`);
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
        'logerror',`No items with content '${fieldContent}' found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`);
      return;
    }
    
    this.saveDatabase(this.database);
    this.log(
      'loginfo',`Changed ${modified} item(s) with content '${fieldContent}' to '${newFieldContent}' in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`);
  }
  deleteDatabase(databaseName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    delete this.database[databaseName];
    this.saveDatabase(this.database);
    this.log(
      'loginfo',`Deleted database '${databaseName}' and its content.`);
  }
  deleteTable(databaseName, tableName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log(
        'logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    delete database[tableName];
    this.saveDatabase(this.database);
    this.log(
      'loginfo',`Deleted table '${tableName}' from database '${databaseName}'.`);
  }
  deleteField(databaseName, tableName, fieldName) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log(
        'logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const table = database[tableName];
    if (!table.hasOwnProperty(fieldName)) {
      this.log(
        'logerror',`Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
  
    delete table[fieldName];
    this.saveDatabase(this.database);
    this.log(
      'loginfo', `Deleted field '${fieldName}' from table '${tableName}' of database '${databaseName}'.`);
  }
  deleteFieldsItemsContent(databaseName, tableName, itemField, id, fieldContent) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log('logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const table = database[tableName];
    if (!table.hasOwnProperty(itemField)) {
      this.log('logerror',`Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
  
    const field = table[itemField];
    const index = field.findIndex(item => item.id === id && item.content === fieldContent);
    if (index === -1) {
      this.log('logerror', `No matching item found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`);
      return;
    }
  
    field.splice(index, 1);
    this.saveDatabase(this.database);
    this.log('loginfo',`Deleted item from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
  }
  deleteFieldsItemsAllContent(databaseName, tableName, itemField, fieldContent) {
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log(
        'logerror',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.database[databaseName];
    if (!database.hasOwnProperty(tableName)) {
      this.log(
        'logerror',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const table = database[tableName];
    if (!table.hasOwnProperty(itemField)) {
      this.log(
        'logerror',`Field '${itemField}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
  
    const field = table[itemField];
    const initialLength = field.length;
    table[itemField] = field.filter(item => item.content !== fieldContent);
  
    if (table[itemField].length === initialLength) {
      this.log('logerror',`No items matching '${fieldContent}' found in field '${itemField}' of table '${tableName}' in database '${databaseName}'.`);
      return;
    }
  
    this.saveDatabase(this.database);
    this.log('loginfo',`Deleted all items matching '${fieldContent}' from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
  }
  joinTable(databaseName, newTableName, tablesToJoin, fieldsToCopy) {

    // Check if the database exists
    if (!this.database.hasOwnProperty(databaseName)) {
      this.log('logerror', `Database '${databaseName}' does not exist.`);
      return;
    }
  
    // Get the specified tables to join
    const database = this.database[databaseName];
    const joinedTable = {};
  
    for (const tableName of tablesToJoin) {
      // Check if the table exists in the database
      if (!database.hasOwnProperty(tableName)) {
        this.log('logerror', `Table '${tableName}' does not exist in database '${databaseName}'.`);
        return;
      }
  
      const tableData = database[tableName];
  
      // Copy the specified fields from the table
      for (const field of fieldsToCopy) {
        if (tableData.hasOwnProperty(field)) {
          joinedTable[field] = tableData[field];
        } else {
          this.log('loginfo', `Field '${field}' does not exist in table '${tableName}'.`);
        }
      }
    }
  
    // Create the new table with the copied fields
    this.createTable(databaseName, newTableName, joinedTable);
  }
  joinDatabaseAndTable(sourceDatabaseName, targetDatabaseName, newTableName, tablesToJoin, fieldsToCopy) {  
    // Check if the source database exists
    if (!this.database.hasOwnProperty(sourceDatabaseName)) {
      this.log('logerror', `Source database '${sourceDatabaseName}' does not exist.`);
      return;
    }
  
    // Check if the target database exists
    if (!this.database.hasOwnProperty(targetDatabaseName)) {
      this.log('logerror', `Target database '${targetDatabaseName}' does not exist.`);
      return;
    }
  
    const sourceDatabase = this.database[sourceDatabaseName];
    const joinedTable = {};
  
    // Check if the tables to join exist in the source database and copy the specified fields
    for (const tableName of tablesToJoin) {
      if (!sourceDatabase.hasOwnProperty(tableName)) {
        this.log('logerror', `Table '${tableName}' does not exist in source database '${sourceDatabaseName}'.`);
        return;
      }
  
      const tableData = sourceDatabase[tableName];
  
      for (const field of fieldsToCopy) {
        if (tableData.hasOwnProperty(field)) {
          joinedTable[field] = tableData[field];
        } else {
          this.log('loginfo', `Field '${field}' does not exist in table '${tableName}'.`);
        }
      }
    }
  
    // Create the new table in the target database with the copied fields
    this.createTable(targetDatabaseName, newTableName, joinedTable);
  
    // Log the successful join operation
    this.log('loginfo',`Join operation successful. Fields copied from tables [${tablesToJoin.join(', ')}] to new table '${newTableName}' in target database '${targetDatabaseName}'.`);
  }
  joinToNewDatabaseAndTable(sourceDatabaseName, targetDatabaseName, newTableName, tablesToJoin, fieldsToCopy) {
    // Check if the source database exists
    if (!this.database.hasOwnProperty(sourceDatabaseName)) {
      this.log('logerror', `Source database '${sourceDatabaseName}' does not exist.`);
      return;
    }
  
    const sourceDatabase = this.database[sourceDatabaseName];
    let targetDatabase = this.database[targetDatabaseName];
  
    // Create the target database if it doesn't exist
    if (!targetDatabase) {
      targetDatabase = {};
      this.database[targetDatabaseName] = targetDatabase;
      this.log('loginfo', `Created new target database '${targetDatabaseName}'.`);
    }
  
    const joinedTable = {};
  
    // Check if the tables to join exist in the source database and copy the specified fields
    for (const tableName of tablesToJoin) {
      if (!sourceDatabase.hasOwnProperty(tableName)) {
        this.log('logerror', `Table '${tableName}' does not exist in source database '${sourceDatabaseName}'.`);
        return;
      }
  
      const tableData = sourceDatabase[tableName];
  
      for (const field of fieldsToCopy) {
        if (tableData.hasOwnProperty(field)) {
          joinedTable[field] = tableData[field];
        } else {
          this.log('loginfo', `Field '${field}' does not exist in table '${tableName}'.`);
        }
      }
    }
  
    // Append the new table to the target database
    targetDatabase[newTableName] = joinedTable;
  
    // Log the successful join operation
    this.log('loginfo', `Join operation successful. Fields copied from tables [${tablesToJoin.join(', ')}] to new table '${newTableName}' in target database '${targetDatabaseName}'.`);
  
    // Save the updated database
    this.saveDatabase(this.database);
  }
  getDatabase() {
    return this.database;
  }
}

export default JsonDatabaseAPI;
