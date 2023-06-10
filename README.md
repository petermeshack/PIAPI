# PIAPI
 javascript json database api
 
 <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<body>
<p><strong>PIAPI</strong></p>
<p><strong>(PETER’S INDIE API) DOCUMENTATIONS</strong></p>
<p><strong>Class: JsonDatabaseAPI</strong></p>
<p>Constructor:</p>
<ul>
<li><p>Initializes the JsonDatabaseAPI class.</p></li>
<li><p>Sets the paths for the database and log files.</p></li>
<li><p>Loads the existing database.</p></li>
</ul>
<p>Parameters: None</p>
<p><strong>Method: loadDatabase()</strong></p>
<ul>
<li><p>Loads the database from the database file.</p></li>
<li><p>If the file doesn't exist, creates a new empty database.</p></li>
<li><p>Handles errors and logs them.</p></li>
</ul>
<p>Parameters: None</p>
<p><strong>Method: saveDatabase(database)</strong></p>
<ul>
<li><p>Saves the database to the database file.</p></li>
<li><p>Handles errors and logs them.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>database (object): The database object to be saved.</p></li>
</ul>
<p><strong>Method: log(logType, message)</strong></p>
<ul>
<li><p>Logs a message with a specific log type.</p></li>
<li><p>Appends the log entry to the log file.</p></li>
<li><p>Prints the log entry to the console.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>logType (string): The type of the log entry.</p></li>
<li><p>message (string): The log message.</p></li>
</ul>
<p><strong>Method: createDatabase(databaseName)</strong></p>
<ul>
<li><p>Creates a new database with the given name.</p></li>
<li><p>Checks if a database with the same name already exists.</p></li>
<li><p>Logs the database creation or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the new database.</p></li>
</ul>
<p><strong>Method: createTable(databaseName, tableName,
fields)</strong></p>
<ul>
<li><p>Creates a new table in the specified database with the given
fields.</p></li>
<li><p>Checks if the database and table already exist.</p></li>
<li><p>Logs the table creation or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the new table.</p></li>
<li><p>fields (object): The fields of the new table.</p></li>
</ul>
<p><strong>Method: addFieldsItems(databaseName, tableName, fieldName,
fieldItems)</strong></p>
<ul>
<li><p>Adds field items to a specified field in a table.</p></li>
<li><p>Checks if the database, table, and field exist.</p></li>
<li><p>Generates a new ID for the field item.</p></li>
<li><p>Logs the addition of field items or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>fieldName (string): The name of the field.</p></li>
<li><p>fieldItems (object): The items to be added to the field.</p></li>
</ul>
<p><strong>Method: addUniqueFieldsItems(databaseName, tableName, fieldName,
fieldItems)</strong></p>
<ul>
<li><p>Adds unique fields items to a specified field in a table.</p></li>
<li><p>Checks if the database, table, and field exist.</p></li>
<li><p>Generates a new ID for the field item.</p></li>
<li><p>Logs the addition of field items or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>fieldName (string): The name of the field.</p></li>
<li><p>fieldItems (object): The items to be added to the field.</p></li>
</ul>
<p><strong>Method: addNewField(databaseName, tableName,
fieldName)</strong></p>
<ul>
<li><p>Adds a new field to a specified table in the database.</p></li>
<li><p>Checks if the database and table exist.</p></li>
<li><p>Handles field names with array notation.</p></li>
<li><p>Logs the addition of the new field or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>fieldName (string): The name of the new field.</p></li>
</ul>
<p><strong>Method: editDatabase(existingDatabaseName,
changedDatabaseName)</strong></p>
<ul>
<li><p>Changes the name of an existing database.</p></li>
<li><p>Checks if the existing database exists.</p></li>
<li><p>Updates the database object with the new name.</p></li>
<li><p>Logs the database name change or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>existingDatabaseName (string): The name of the existing
database.</p></li>
<li><p>changedDatabaseName (string): The new name for the
database.</p></li>
</ul>
<p><strong>Method: editTable(databaseName, oldTableName,
newTableName)</strong></p>
<ul>
<li><p>Changes the name of an existing table in a database.</p></li>
<li><p>Checks if the database and the old table exist.</p></li>
<li><p>Updates the database object with the new table name.</p></li>
<li><p>Logs the table name change or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>oldTableName (string): The current name of the table.</p></li>
<li><p>newTableName (string): The new name for the table.</p></li>
</ul>
<p><strong>Method: editFieldsItems(databaseName, tableName,
oldFieldName, newFieldName)</strong></p>
<ul>
<li><p>Changes the name of an existing field in a table.</p></li>
<li><p>Checks if the database, table, and the old field exist.</p></li>
<li><p>Updates the table object with the new field name.</p></li>
<li><p>Logs the field name change or error.</p></li>
</ul>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>oldFieldName (string): The current name of the field.</p></li>
<li><p>newFieldName (string): The new name for the field.</p></li>
</ul>
<p><strong>Method: editFieldsItemsContent(databaseName, tableName,
itemField, id, fieldContent)</strong></p>
<p>Title: Edit Field Item Content Subtitle: Modify the content of a
specific item in a database field</p>
<p>This function allows you to edit the content of a specific item in a
field of a table within a database. It takes parameters such as the
database name, table name, item field, item ID, and the new content for
the item. If the item exists, its content is updated, and the database
is saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>itemField (string): The name of the field containing the
item.</p></li>
<li><p>id (string): The ID of the item to be modified.</p></li>
<li><p>fieldContent (any): The new content for the item.</p></li>
</ul>
<p><strong>Method: editFieldsItemsAllContent(databaseName, tableName,
itemField, fieldContent, newFieldContent)</strong></p>
<p>Title: Edit Field Items' All Content Subtitle: Update the content of
multiple items in a database field</p>
<p>This function enables you to update the content of multiple items in
a field of a table within a database. You need to provide the database
name, table name, item field, the existing content to be replaced, and
the new content. All items matching the specified content are updated,
and the database is saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>itemField (string): The name of the field containing the
items.</p></li>
<li><p>fieldContent (any): The existing content to be replaced.</p></li>
<li><p>newFieldContent (any): The new content for the items.</p></li>
</ul>
<p><strong>Method: deleteDatabase(databaseName)</strong></p>
<p>Title: Delete Database Subtitle: Remove an entire database</p>
<p>This function allows you to delete an entire database. You need to
provide the name of the database to be deleted. If the database exists,
it is removed from the system, and the changes are saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database to be
deleted.</p></li>
</ul>
<p><strong>Method: deleteTable(databaseName, tableName)</strong></p>
<p>Title: Delete Table Subtitle: Remove a table from a database</p>
<p>This function enables you to delete a specific table from a database.
You need to provide the database name and the name of the table to be
deleted. If the table exists in the database, it is deleted, and the
changes are saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table to be deleted.</p></li>
</ul>
<p><strong>Method: deleteField(databaseName, tableName,
fieldName)</strong></p>
<p>Title: Delete Field Subtitle: Remove a field from a table in a
database</p>
<p>This function allows you to delete a field from a table within a
database. You need to provide the database name, table name, and the
name of the field to be deleted. If the field exists in the table, it is
removed, and the changes are saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>fieldName (string): The name of the field to be deleted.</p></li>
</ul>
<p><strong>Method: deleteFieldsItemsContent(databaseName, tableName,
itemField, id, fieldContent)</strong></p>
<p>Title: Delete Field Item Content Subtitle: Remove a specific item
from a field in a database table</p>
<p>This function enables you to delete a specific item from a field in a
table within a database. You need to provide the database name, table
name, item field, item ID, and the content of the item. If a matching
item is found, it is deleted from the field, and the changes are
saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>itemField (string): The name of the field containing the
items.</p></li>
<li><p>id (string): The ID of the item to be deleted.</p></li>
<li><p>fieldContent (any): The content of the item to be
deleted.</p></li>
</ul>
<p><strong>Method: deleteFieldsItemsAllContent(databaseName, tableName,
itemField, fieldContent)</strong></p>
<p>Title: Delete Field Items' All Content Subtitle: Remove all items
matching a specific content from a field</p>
<p>This function allows you to delete all items matching a specific
content from a field in a table within a database. You need to provide
the database name, table name, item field, and the content to be
matched. If matching items are found, they are removed from the field,
and the changes are saved.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>tableName (string): The name of the table.</p></li>
<li><p>itemField (string): The name of the field containing the
items.</p></li>
<li><p>fieldContent (any): The content to be matched for
deletion.</p></li>
</ul>
<p><strong>Method: joinTable(databaseName, newTableName, tablesToJoin,
fieldsToCopy)</strong></p>
<p>Title: Join Table Subtitle: Combine tables by copying specified
fields</p>
<p>This function enables you to join multiple tables within a database
by copying specified fields into a new table. You need to provide the
database name, a new table name for the joined data, an array of tables
to join, and an array of fields to copy from each table. The new table
is created, and the specified fields are copied into it.</p>
<p>Parameters:</p>
<ul>
<li><p>databaseName (string): The name of the database.</p></li>
<li><p>newTableName (string): The name of the new table to be
created.</p></li>
<li><p>tablesToJoin (array): An array of table names to be
joined.</p></li>
<li><p>fieldsToCopy (array): An array of field names to be copied from
each table.</p></li>
</ul>
<p><strong>Method: joinDatabaseAndTable(sourceDatabaseName,
targetDatabaseName, newTableName, tablesToJoin,
fieldsToCopy)</strong></p>
<p>Title: Join Database and Table Subtitle: Combine tables from a source
database into a new table in a target database</p>
<p>This function allows you to join specified tables from a source
database and combine them into a new table within a target database. You
need to provide the source database name, target database name, a new
table name for the joined data, an array of tables to join, and an array
of fields to copy from each table. The new table is created in the
target database, and the specified fields are copied into it.</p>
<p>Parameters:</p>
<ul>
<li><p>sourceDatabaseName (string): The name of the source
database.</p></li>
<li><p>targetDatabaseName (string): The name of the target
database.</p></li>
<li><p>newTableName (string): The name of the new table to be
created.</p></li>
<li><p>tablesToJoin (array): An array of table names to be joined from
the source database.</p></li>
<li><p>fieldsToCopy (array): An array of field names to be copied from
each table.</p></li>
</ul>
<br><br><br>
<p><strong>Class: Database Queries</strong></p>
<p>Methods (All Methods) Short Explanation:</p>
<p>This section provides a list of methods for performing various
database queries and operations.</p>
<p><strong>Constructor and Initialization</strong></p>
<ul>
<li><p>Method: constructor(databaseFilePath)</p>
<ul>
<li><p>Short Explanation: Initializes a new instance of the
DatabaseQueries class.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseFilePath: The file path of the JSON database
file.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Logging a Message</strong></p>
<ul>
<li><p>Method: log(logType, message)</p>
<ul>
<li><p>Short Explanation: Logs a message with the specified log
type.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>logType: The type of the log entry (e.g., 'loginfo',
'logerror').</p></li>
<li><p>message: The message to be logged.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Checking Database Existence</strong></p>
<ul>
<li><p>Method: checkDatabase(databaseName)</p>
<ul>
<li><p>Short Explanation: Checks if the specified database
exists.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database to check.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Checking Table Existence</strong></p>
<ul>
<li><p>Method: checkTable(databaseName, tableName)</p>
<ul>
<li><p>Short Explanation: Checks if the specified table exists in the
given database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database that contains the
table.</p></li>
<li><p>tableName: The name of the table to check.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Checking Field Existence</strong></p>
<ul>
<li><p>Method: checkField(databaseName, tableName, fieldName)</p>
<ul>
<li><p>Short Explanation: Checks if the specified field exists in the
given table and database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database that contains the
table.</p></li>
<li><p>tableName: The name of the table that contains the
field.</p></li>
<li><p>fieldName: The name of the field to check.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Adding a Database</strong></p>
<ul>
<li><p>Method: addDatabase(databaseName)</p>
<ul>
<li><p>Short Explanation: Adds a new database if it doesn't already
exist.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database to add.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Adding a Table</strong></p>
<ul>
<li><p>Method: addTable(databaseName, tableName, fields)</p>
<ul>
<li><p>Short Explanation: Adds a new table to the specified database if
it doesn't already exist.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database to add the table.</p></li>
<li><p>tableName: The name of the table to add.</p></li>
<li><p>fields: An array of field names for the new table.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Adding Field Items</strong></p>
<ul>
<li><p>Method: addFieldsItems(databaseName, tableName, fieldName,
fieldItems)</p>
<ul>
<li><p>Short Explanation: Adds field items to a specific field in a
table of a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
<li><p>fieldItems: An array of field items to be added.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Adding Unique Field Items</strong></p>
<ul>
<li><p>Method: addUniqueFieldsItems(databaseName, tableName, fieldName,
fieldItems)</p>
<ul>
<li><p>Short Explanation: Adds unique field items to a specific field in
a table of a database, ensuring no duplicate items are added.</p></li>
<li><p>Parameters: Same as the addFieldsItems method.</p></li>
</ul></li>
</ul>
<p><strong>Querying All Data Under a Database</strong></p>
<ul>
<li><p>Method: queryAllUnderDatabase(databaseName)</p>
<ul>
<li><p>Short Explanation: Retrieves all data from all tables within a
specific database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying All Data Under a Table</strong></p>
<ul>
<li><p>Method: queryAllUnderTable(databaseName, tableName)</p>
<ul>
<li><p>Short Explanation: Retrieves all data from a specific table
within a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying All Data Under a Field</strong></p>
<ul>
<li><p>Method: queryAllUnderField(databaseName, tableName,
fieldName)</p>
<ul>
<li><p>Short Explanation: Retrieves all data from a specific field
within a table of a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying Unique Field Data Under a Database</strong></p>
<ul>
<li><p>Method: queryUniqueUnderDatabase(databaseName)</p>
<ul>
<li><p>Short Explanation: Retrieves unique field data from all tables
within a specific database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying Unique Field Data Under a Table</strong></p>
<ul>
<li><p>Method: queryUniqueUnderTable(databaseName, tableName)</p>
<ul>
<li><p>Short Explanation: Retrieves unique field data from a specific
table within a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying Unique Field Data Under a Field</strong></p>
<ul>
<li><p>Method: queryUniqueUnderField(databaseName, tableName,
fieldName)</p>
<ul>
<li><p>Short Explanation: Retrieves unique data under a specific field
in a table. It checks the existence of the given database, table, and
field. If any of them is not found, an error message is logged. The
function retrieves the content of the field and recursively checks if it
contains nested fields. The result is returned as an array.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Querying Unique Field Data Under a Field Content</strong></p>
<ul>
<li><p>Method: queryUniqueUnderFieldContent(databaseName, tableName,
fieldName, content)</p>
<ul>
<li><p>Short Explanation: Queries the unique content of a field that
matches the given content. It performs similar checks as the previous
function and retrieves the field content. If the field content is an
object, it searches for the specified content within the object. If a
match is found, the content is returned; otherwise, an error message is
logged.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
<li><p>content: The content to match within the field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Changing Database Name</strong></p>
<ul>
<li><p>Method: changeDatabase(oldDatabaseName, newDatabaseName)</p>
<ul>
<li><p>Short Explanation: Renames a database. It checks the existence of
the old database and the absence of the new database. If the checks
pass, the function calls an API to edit the database name. A success or
error message is logged accordingly.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>oldDatabaseName: The current name of the database.</p></li>
<li><p>newDatabaseName: The new name for the database.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Changing Table Name</strong></p>
<ul>
<li><p>Method: changeTable(databaseName, oldTableName, newTableName)</p>
<ul>
<li><p>Short Explanation: Renames a table within a database. It verifies
the existence of the specified database and table, as well as the
absence of the new table name. If the checks pass, the function uses an
API to edit the table name. The result is logged as a success or error
message.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>oldTableName: The current name of the table.</p></li>
<li><p>newTableName: The new name for the table.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Adding a New Field to a Table</strong></p>
<ul>
<li><p>Method: addNewFieldtoTable(databaseName, tableName,
fieldName)</p>
<ul>
<li><p>Short Explanation: Adds a new field to a table in a database. It
checks the existence of the specified database and table. If the checks
pass, the function calls an API to add the new field. The result is
logged as a success or error message.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the new field to add.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Changing Field Name</strong></p>
<ul>
<li><p>Method: changeField(databaseName, tableName, oldFieldName,
newFieldName)</p>
<ul>
<li><p>Short Explanation: Renames a field within a table. It verifies
the existence of the specified database, table, and old field name. If
the checks pass, the function uses an API to edit the field name. The
result is logged as a success or error message.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>oldFieldName: The current name of the field.</p></li>
<li><p>newFieldName: The new name for the field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Changing Field Content</strong></p>
<ul>
<li><p>Method: changeFieldContent(databaseName, tableName, fieldName,
id, newContent)</p>
<ul>
<li><p>Short Explanation: Changes the content of a field with a
specified ID in a table. It checks the existence of the specified
database, table, and field. If the checks pass, the function uses an API
to edit the field's content. The result is logged as a success or error
message.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
<li><p>id: The ID of the row containing the field to be
changed.</p></li>
<li><p>newContent: The new content for the field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Changing Field Content in All Rows</strong></p>
<ul>
<li><p>Method: changeFieldAllContent(databaseName, tableName, fieldName,
fieldContent, newFieldContent)</p>
<ul>
<li><p>Short Explanation: Changes the content of a field in all rows of
a table within a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field.</p></li>
<li><p>fieldContent: The content to be replaced in the field.</p></li>
<li><p>newFieldContent: The new content to replace the existing
content.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Deleting a Full Database</strong></p>
<ul>
<li><p>Method: deleteFullDatabase(databaseName)</p>
<ul>
<li><p>Short Explanation: Deletes a database and all its data.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database to delete.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Deleting a Table</strong></p>
<ul>
<li><p>Method: deleteTable(databaseName, tableName)</p>
<ul>
<li><p>Short Explanation: Deletes a table from a database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table to delete.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Deleting a Field</strong></p>
<ul>
<li><p>Method: deleteField(databaseName, tableName, fieldName)</p>
<ul>
<li><p>Short Explanation: Deletes a field from a table in a
database.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>fieldName: The name of the field to delete.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Deleting Specific Field Content</strong></p>
<ul>
<li><p>Method: deleteFieldContent(databaseName, tableName, itemField,
id, fieldContent)</p>
<ul>
<li><p>Short Explanation: Deletes a specific content from a field in a
table.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>itemField: The name of the field containing the content.</p></li>
<li><p>id: The ID of the row containing the field.</p></li>
<li><p>fieldContent: The specific content to delete from the
field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Deleting All Occurrences of Field Content</strong></p>
<ul>
<li><p>Method: deleteAllFieldContent(databaseName, tableName, itemField,
fieldContent)</p>
<ul>
<li><p>Short Explanation: Deletes all occurrences of a specific content
from a field in a table.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>tableName: The name of the table.</p></li>
<li><p>itemField: The name of the field containing the content.</p></li>
<li><p>fieldContent: The specific content to delete from the
field.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Joining Table Fields</strong></p>
<ul>
<li><p>Method: joinTableFields(databaseName, newTableName, tablesToJoin,
fieldsToJoin)</p>
<ul>
<li><p>Short Explanation: Joins multiple tables based on specified
fields and creates a new table with the joined data.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the database.</p></li>
<li><p>newTableName: The name of the new table to be created.</p></li>
<li><p>tablesToJoin: An array of table names to join.</p></li>
<li><p>fieldsToJoin: An array of field names to join the tables
on.</p></li>
</ul></li>
</ul></li>
</ul>
<p><strong>Joining Database Table Fields</strong></p>
<ul>
<li><p>Method: joinDatabaseTableFields(databaseName, targetDatabaseName,
targetTableName, sourceTableName, fieldsToCopy)</p>
<ul>
<li><p>Short Explanation: Joins specified fields from a table in the
source database to the corresponding fields in the target table of the
target database. It performs the join only if the target database
already exists.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the source database.</p></li>
<li><p>targetDatabaseName: The name of the target database.</p></li>
<li><p>targetTableName: The name of the target table.</p></li>
<li><p>sourceTableName: The name of the source table.</p></li>
<li><p>fieldsToCopy: An array of field names to be copied from the
source table to the target table.</p></li>
</ul></li>
</ul></li>
<li><p>Method: joinExistingOrNotDatabaseTableFields(databaseName,
targetDatabaseName, targetTableName, sourceTableName, fieldsToCopy)</p>
<ul>
<li><p>Short Explanation: Joins specified fields from a table in the
source database to the corresponding fields in the target table of the
target database. It performs the join regardless of whether the target
database exists or not. If the target database does not exist, it
creates a new database and table.</p></li>
<li><p>Parameters:</p>
<ul>
<li><p>databaseName: The name of the source database.</p></li>
<li><p>targetDatabaseName: The name of the target database.</p></li>
<li><p>targetTableName: The name of the target table.</p></li>
<li><p>sourceTableName: The name of the source table.</p></li>
<li><p>fieldsToCopy: An array of field names to be copied from the
source table to the target table.</p></li>
</ul></li>
</ul></li>
</ul>
</body>
</html>

