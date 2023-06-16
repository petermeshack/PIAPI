import path from 'path';
import { fileURLToPath } from 'url';
import JsonDatabaseAPI from './app.js';

const currentDate = new Date();
const logEntrytime = `[(dd/mm/yy):${currentDate.getUTCDate()}/${currentDate.getUTCMonth()}/${currentDate.getUTCFullYear()}][time(hh/mm/ss):${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}]`;

class DatabaseQueries {
  constructor(databaseFilePath) {
    this.api = new JsonDatabaseAPI(databaseFilePath);
    const __filename = fileURLToPath(import.meta.url);
    this.filePath = path.join(path.dirname(__filename), databaseFilePath);
    this.logFilePath = path.join(path.dirname(__filename), 'queryLogs.txt');
    this.api.loadDatabase();
    this.api.createEmptyFile(); // Create the file if it doesn't exist
  }

  log(logType, message) {
    const logEntry = `[${logType}] ${message}`;
    console.log(logEntrytime+logEntry);
    this.api.fs.appendFileSync(this.logFilePath, logEntrytime+logEntry + '\n');
  }

  checkDatabase(databaseName) {
    const database = this.api.getDatabase();

    if (!database.hasOwnProperty(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return false;
    }

    // Database exists, log a message if desired
    this.log('loginfo querry', `Database '${databaseName}' exists.`);
    return true;
  }

  checkTable(databaseName, tableName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return false;
    }
    const database = this.api.getDatabase()[databaseName];
    return database.hasOwnProperty(tableName);
  }
  checkField(databaseName, tableName, fieldName) {
    const database = this.api.getDatabase();

    if (!database.hasOwnProperty(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return false;
    }

    const tables = database[databaseName];

    if (!tables.hasOwnProperty(tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return false;
    }

    const table = tables[tableName];

    if (!table.hasOwnProperty(fieldName)) {
      this.log('logerror querry',`Field '${fieldName}' does not exist in table '${tableName}'.`);
      return false;
    }

    return true;
  }

  addDatabase(databaseName) {
    if (this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' already exists.`);
      return;
    }
    this.api.createDatabase(databaseName);
    this.log('loginfo querry',`Database '${databaseName}' created.`);
  }

  addTable(databaseName, tableName, fields) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }
    if (this.checkTable(databaseName, tableName)) {
      this.log('logerror querry', `Table '${tableName}' already exists in database '${databaseName}'.`);
      return;
    }
    this.api.createTable(databaseName, tableName, fields);
    this.log('loginfo querry', `Table '${tableName}' created in database '${databaseName}'.`);
  }

  addFieldsItems(databaseName, tableName, fieldName, fieldItems) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
    this.api.addFieldsItems(databaseName, tableName, fieldName, fieldItems);
    this.log('loginfo querry',`Added field items to '${fieldName}' in table '${tableName}' of database '${databaseName}'.`);
  }

  addUniqueFieldsItems(databaseName, tableName, fieldName, fieldItems) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
    const table = database[databaseName][tableName];
  
    // Check if the field exists in the table
    if (!table.hasOwnProperty(fieldName)) {
      this.log('logerror querry',`Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
  
    const field = table[fieldName];
  
    // Check if any content in the field matches the new field items
    const isDuplicate = field.some(item => item.content === fieldItems.content);
    if (isDuplicate) {
      this.log('logerror querry',`Field item with the same content already exists in '${fieldName}' of table '${tableName}' in database '${databaseName}'.`);
      return;
    }
  
    this.api.addFieldsItems(databaseName, tableName, fieldName, fieldItems);
    this.log('loginfo querry',`Added unique field items to '${fieldName}' in table '${tableName}' of database '${databaseName}'.`);
  }

  queryAllUnderDatabase(databaseName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.api.getDatabase();
    const tables = Object.keys(database[databaseName]);
  
    let result = '';
  
    // Add database name header
    result += `----------------------------\n`;
    result += `------${databaseName}---------\n`;
    result += `----------------------------\n`;
  
    // Iterate through each table in the database
    tables.forEach(tableName => {
      // Add table name header
      result += `------${tableName}-------------\n`;
      result += `----------------------------\n`;
  
      const fields = Object.keys(database[databaseName][tableName]);
  
      // Store the maximum length of the content for each field
      const maxContentLengths = {};
  
      // Calculate the maximum content length for each field
      fields.forEach(fieldName => {
        const field = database[databaseName][tableName][fieldName];
  
        // Find the maximum content length in the field
        const maxContentLength = field.reduce((max, item) => Math.max(max, item.content.length), 0);
  
        // Store the maximum content length for the field
        maxContentLengths[fieldName] = maxContentLength;
      });
  
      // Calculate the width of each field based on the maximum content length
      const fieldWidths = fields.map(fieldName => Math.max(maxContentLengths[fieldName], fieldName.length));
  
      // Add the table header with field names
      const header = fields.map((fieldName, index) => {
        const fieldWidth = fieldWidths[index];
        return `| ${fieldName.padEnd(fieldWidth)} `;
      }).join('') + '|';
      result += `${header}\n`;
  
      // Add the horizontal line below the header
      const line = '-'.repeat(header.length);
      result += `${line}\n`;
  
      // Iterate through each field in the table
      const itemCount = Math.max(...fields.map(fieldName => database[databaseName][tableName][fieldName].length));
      for (let i = 0; i < itemCount; i++) {
        const contentRow = fields.map((fieldName, index) => {
          const fieldWidth = fieldWidths[index];
          const content = database[databaseName][tableName][fieldName][i]?.content ?? '';
          return `| ${content.padEnd(fieldWidth)} `;
        }).join('') + '|';
        result += `${contentRow}\n`;
      }
  
      result += `----------------------------\n`;
    });
  
    return result;
  }
  
  queryAllUnderTable(databaseName, tableName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
  
    let result = '';
  
    // Add table name header
    result += `------${tableName}-------------\n`;
    result += `----------------------------\n`;
  
    const fields = Object.keys(database[databaseName][tableName]);
  
    // Store the maximum length of the content for each field
    const maxContentLengths = {};
  
    // Calculate the maximum content length for each field
    fields.forEach(fieldName => {
      const field = database[databaseName][tableName][fieldName];
  
      // Find the maximum content length in the field
      const maxContentLength = field.reduce((max, item) => Math.max(max, item.content.length), 0);
  
      // Store the maximum content length for the field
      maxContentLengths[fieldName] = maxContentLength;
    });
  
    // Calculate the width of each field based on the maximum content length
    const fieldWidths = fields.map(fieldName => Math.max(maxContentLengths[fieldName], fieldName.length));
  
    // Add the table header with field names
    const header = fields.map((fieldName, index) => {
      const fieldWidth = fieldWidths[index];
      return `| ${fieldName.padEnd(fieldWidth)} `;
    }).join('') + '|';
    result += `${header}\n`;
  
    // Add the horizontal line below the header
    const line = '-'.repeat(header.length);
    result += `${line}\n`;
  
    // Iterate through each field in the table
    const itemCount = Math.max(...fields.map(fieldName => database[databaseName][tableName][fieldName].length));
    for (let i = 0; i < itemCount; i++) {
      const contentRow = fields.map((fieldName, index) => {
        const fieldWidth = fieldWidths[index];
        const content = database[databaseName][tableName][fieldName][i]?.content ?? '';
        return `| ${content.padEnd(fieldWidth)} `;
      }).join('') + '|';
      result += `${contentRow}\n`;
    }
  
    result += `----------------------------\n`;
  
    return result;
  }

  queryAllUnderField(databaseName, tableName, fieldName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
  
    if (!database[databaseName][tableName].hasOwnProperty(fieldName)) {
      this.log('logerror querry', `Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }
  
    const fieldContent = database[databaseName][tableName][fieldName];
  
    let result = '';
  
    // Add table name header
    result += `------${tableName}-------------\n`;
    result += `----------------------------\n`;
  
    // Add field name
    result += `| ${fieldName} |\n`;
  
    // Add the horizontal line below the field name
    const line = '-'.repeat(fieldName.length + 4);
    result += `${line}\n`;
  
    // Add the content of the field
    fieldContent.forEach(item => {
      result += `| ${item.content} |\n`;
    });
  
    result += `----------------------------\n`;
  
    return result;
  }

  queryUniqueUnderDatabase(databaseName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    const database = this.api.getDatabase();
    const tables = Object.keys(database[databaseName]);
    const result = [];
  
    for (const tableName of tables) {
      const fields = Object.keys(database[databaseName][tableName]);
  
      const tableData = {
        tableName: tableName,
        fields: [],
      };
  
      for (const fieldName of fields) {
        const fieldContent = database[databaseName][tableName][fieldName];
        const fieldData = [fieldName, fieldContent];
        tableData.fields.push(fieldData);
      }
  
      result.push(tableData);
    }
  
    return result;
  }
  queryUniqueUnderTable(databaseName, tableName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
    const fields = Object.keys(database[databaseName][tableName]);
    const result = [];
  
    for (const fieldName of fields) {
      const fieldContent = database[databaseName][tableName][fieldName];
      const fieldData = [fieldName, fieldContent];
      result.push(fieldData);
    }
  
    return result;
  }
  queryUniqueUnderField(databaseName, tableName, fieldName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
  
    if (!database[databaseName][tableName].hasOwnProperty(fieldName)) {
      this.log('logerror querry',`Field '${fieldName}' does not exist in table '${tableName}'.`);
      return;
    }
  
    const fieldContent = database[databaseName][tableName][fieldName];
    const result = [fieldName, fieldContent];
  
    // Check if the fieldContent is an object
    if (typeof fieldContent === 'object' && fieldContent !== null) {
      // Recursively retrieve the contents of the object
      const nestedFields = Object.keys(fieldContent);
      const nestedResult = [];
  
      for (const nestedFieldName of nestedFields) {
        const nestedFieldContent = fieldContent[nestedFieldName];
        const nestedFieldData = [nestedFieldName, nestedFieldContent];
        nestedResult.push(nestedFieldData);
      }
  
      result.push(nestedResult);
    }
  
    return result;
  }
  queryUniqueUnderFieldContent(databaseName, tableName, fieldName, content) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    const database = this.api.getDatabase();
  
    if (!database[databaseName][tableName].hasOwnProperty(fieldName)) {
      this.log('logerror querry',`Field '${fieldName}' does not exist in table '${tableName}'.`);
      return;
    }
  
    const fieldContent = database[databaseName][tableName][fieldName];
  
    if (typeof fieldContent === 'object' && fieldContent !== null) {
      const nestedContent = fieldContent.find(obj => obj.content === content);
      if (nestedContent !== undefined) {
        return nestedContent.content;
      } else {
        this.log('logerror querry',`Content '${content}' does not exist in field '${fieldName}' of table '${tableName}'.`);
        return;
      }
    } else {
      this.log('logerror querry',`Field '${fieldName}' does not contain nested content in table '${tableName}'.`);
      return;
    }
  }
  changeDatabase(oldDatabaseName, newDatabaseName) {
    if (!this.checkDatabase(oldDatabaseName)) {
      this.log('logerror querry', `Database '${oldDatabaseName}' does not exist.`);
      return;
    }
    if (this.checkDatabase(newDatabaseName)) {
      this.log('logerror querry',`Database '${newDatabaseName}' already exists.`);
      return;
    }
  
    const isSuccess = this.api.editDatabase(oldDatabaseName, newDatabaseName);
    if (isSuccess) {
      this.log('loginfo querry',`Database '${oldDatabaseName}' renamed to '${newDatabaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to rename database '${oldDatabaseName}'.`);
    }
  }
  changeTable(databaseName, oldTableName, newTableName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, oldTableName)) {
      this.log('logerror querry',`Table '${oldTableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    if (this.checkTable(databaseName, newTableName)) {
      this.log('logerror querry',`Table '${newTableName}' already exists in database '${databaseName}'.`);
      return;
    }

    const isSuccess = this.api.editTable(databaseName, oldTableName, newTableName);
    if (isSuccess) {
      this.log('loginfo querry', `Table '${oldTableName}' renamed to '${newTableName}' in database '${databaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to rename table '${oldTableName}' in database '${databaseName}'.`);
    }
  } 
  addNewFieldtoTable(databaseName, tableName, fieldName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    const isSuccess = this.api.addNewField(databaseName, tableName, fieldName);
    if (isSuccess) {
      this.log('loginfo querry',`Field '${fieldName}' added to table '${tableName}' in database '${databaseName}'.`);
    } else {
      this.log('logerror querry', `Failed to add field '${fieldName}' to table '${tableName}' in database '${databaseName}'.`);
    }
  }
  changeField(databaseName, tableName, oldFieldName, newFieldName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    const isSuccess = this.api.editFieldsItems(databaseName, tableName, oldFieldName, newFieldName);
    if (isSuccess) {
      this.log('loginfo querry', `Field '${oldFieldName}' renamed to '${newFieldName}' in table '${tableName}' of database '${databaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to rename field '${oldFieldName}' to '${newFieldName}' in table '${tableName}' of database '${databaseName}'.`);
    }
  }
  
  changeFieldContent(databaseName, tableName, fieldName, id, newContent) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry', `Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    if (!this.checkField(databaseName, tableName, fieldName)) {
      this.log('logerror querry', `Field '${fieldName}' does not exist in table '${tableName}'.`);
      return;
    }

    const isSuccess = this.api.editFieldsItemsContent(databaseName, tableName, fieldName, id, newContent);
    if (isSuccess) {
      this.log('loginfo querry', "[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+ `Field '${fieldName}' content with id '${id}' changed to '${newContent}' in table '${tableName}' of database '${databaseName}'.`);
    } else {
      this.log('logerror querry',"[(dd/mm/yy):"+date.getUTCDate()+"/"+date.getUTCMonth()+"/"+date.getUTCFullYear()+"]"+"[time(hh/mm/ss):"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]"+  `Failed to change content with id '${id}' to '${newContent}' in field '${fieldName}' of table '${tableName}' in database '${databaseName}'.`);
    }
  }
  changeFieldAllContent(databaseName, tableName, fieldName, fieldContent, newFieldContent) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    if (!this.checkField(databaseName, tableName, fieldName)) {
      return;
    }

    const isSuccess = this.api.editFieldsItemsAllContent(databaseName, tableName, fieldName, fieldContent, newFieldContent);
    if (isSuccess) {
      this.log('loginfo querry',`Field '${fieldName}' content '${fieldContent}' replaced with '${newFieldContent}' in table '${tableName}' of database '${databaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to change field '${fieldName}' content in table '${tableName}' of database '${databaseName}'.`);
    }
  }
  
  deleteFullDatabase(databaseName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    this.api.deleteDatabase(databaseName);
    this.log('loginfo querry',`Database '${databaseName}' deleted.`);
    this.log('loginfo',`Deleted all data from database '${databaseName}'.`);
  }
  deleteTable(databaseName, tableName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    const isSuccess = this.api.deleteTable(databaseName, tableName);
    if (isSuccess) {
      this.log('loginfo querry', `Table '${tableName}' deleted from database '${databaseName}'.`);
    } else {
      this.log('logerror querry', `Failed to delete table '${tableName}' from database '${databaseName}'.`);
    }
  }

  deleteField(databaseName, tableName, fieldName) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }

    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry',`Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }

    if (!this.checkField(databaseName, tableName, fieldName)) {
      this.log('logerror querry',`Field '${fieldName}' does not exist in table '${tableName}' of database '${databaseName}'.`);
      return;
    }

    const isSuccess = this.api.deleteField(databaseName, tableName, fieldName);
    if (isSuccess) {
      this.log('loginfo querry',`Field '${fieldName}' deleted from table '${tableName}' of database '${databaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to delete field '${fieldName}' from table '${tableName}' of database '${databaseName}'.`);
    }
  }
  deleteFieldContent(databaseName, tableName, itemField, id, fieldContent) {
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      this.log('logerror querry', `Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    if (!this.checkField(databaseName, tableName, itemField)) {
      this.log('logerror querry',`Field '${itemField}' does not exist in table '${tableName}'.`);
      return;
    }
  
    const isSuccess = this.api.deleteFieldsItemsContent(databaseName, tableName, itemField, id, fieldContent);
    if (isSuccess) {
      this.log('loginfo querry', `Field content '${fieldContent}' deleted from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
    } else {
      this.log('logerror querry',`Failed to delete field content '${fieldContent}' from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
    }
  }
  deleteAllFieldContent(databaseName, tableName, itemField, fieldContent) {
    if (!this.checkDatabase(databaseName)) {
      const date = new Date();
      this.log('logerror querry',`Database '${databaseName}' does not exist.`);
      return;
    }
  
    if (!this.checkTable(databaseName, tableName)) {
      const date = new Date();
      this.log('logerror querry', `Table '${tableName}' does not exist in database '${databaseName}'.`);
      return;
    }
  
    if (!this.checkField(databaseName, tableName, itemField)) {
      const date = new Date();
      this.log('logerror querry', `Field '${itemField}' does not exist in table '${tableName}'.`);
      return;
    }
  
    const isSuccess = this.api.deleteFieldsItemsAllContent(databaseName, tableName, itemField, fieldContent);
    if (isSuccess) {
      const date = new Date();
      this.log('loginfo querry', `All field content '${fieldContent}' deleted from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
    } else {
      const date = new Date();
      this.log('logerror querry', `Failed to delete all field content '${fieldContent}' from field '${itemField}' in table '${tableName}' of database '${databaseName}'.`);
    }
  }
  joinTableFields(databaseName, newTableName, tablesToJoin, fieldsToCopy) {
    const date = new Date();
  
    // Check if the database exists
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Database '${databaseName}' does not exist.`);
      return;
    }
  
    // Call the joinTable method and check the result
    const isSuccess = this.api.joinTable(databaseName, newTableName, tablesToJoin, fieldsToCopy);
    if (isSuccess) {
      this.log('loginfo querry', `joiningTables ${tablesToJoin} and ${newTableName} operation was successful.`);
    } else {
      this.log('logerror querry', ` joiningTables ${tablesToJoin} and ${newTableName} operation failed.`);
    }
  }
  
  joinDatabaseTableFields(databaseName, targetDatabaseName, targetTableName, sourceTableName, fieldsToCopy) {
    const date = new Date();
  
    // Check if the source database exists
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Source database '${databaseName}' does not exist.`);
      return;
    }
  
    // Check if the target database exists
    if (!this.checkDatabase(targetDatabaseName)) {
      this.log('logerror querry', `Target database '${targetDatabaseName}' does not exist.`);
      return;
    }
  
    // Execute the join operation from the API
    const isSuccess = this.api.joinDatabaseAndTable(databaseName, targetDatabaseName, sourceTableName, targetTableName, fieldsToCopy);
  
    // Log the result of the join operation
    if (isSuccess) {
      this.log('loginfo querry', `joiningTables ${sourceTableName} and ${targetTableName} into database ${targetDatabaseName} operation was successful.`);
    } else {
      this.log('logerror querry', `joiningTables ${sourceTableName} and ${targetTableName} into database ${targetDatabaseName} operation failed.`);
    }
  }
  
  joinExistingOrNotDatabaseTableFields(databaseName, targetDatabaseName, targetTableName, sourceTableName, fieldsToCopy) {
    const date = new Date();
  
    // Check if the source database exists
    if (!this.checkDatabase(databaseName)) {
      this.log('logerror querry', `Source database '${databaseName}' does not exist.`);
      return;
    }
  
    const isSuccess = this.api.joinToNewDatabaseAndTable(databaseName, targetDatabaseName, targetTableName, sourceTableName, fieldsToCopy);
  
    // Log the result of the join operation
    if (isSuccess) {
      this.log('loginfo querry', ` joinToNewDatabaseAndTable ${sourceTableName} and ${targetTableName} into database ${targetDatabaseName} operation was successful.`);
    } else {
      this.log('logerror querry', ` joinToNewDatabaseAndTable ${sourceTableName} and ${targetTableName} into database ${targetDatabaseName} operation failed.`);
    }
  }
  
}

export default DatabaseQueries;
