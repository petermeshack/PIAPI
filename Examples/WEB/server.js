const http = require('http');
const fs = require('fs');
const path = require('path');


const DatabaseQueries = require('./public/MYAPI/databaseQueries');
const queries = new DatabaseQueries('database.json');

const logFilePath = path.join(__dirname, 'server_logs.txt');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const formData = JSON.parse(body);
      saveFormData(formData);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Form data saved to db successfully.');
    });
  } else if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/login.html') {
    const filePath = path.join(__dirname, 'public', 'login.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/singnup.html') {
    const filePath = path.join(__dirname, 'public', 'singnup.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found.');
  }
});


function saveFormData(formData) {
    const fData = formData;
    const count = Object.keys(fData).length;
    //console.log(count)
    if(count > 2){
      const { name,username, email,password } = fData;

      const fullname = name;
      const fullusername = username;
      const fullemail = email;
      const fullpassword = password;

  
      registerUsers(fullname,fullusername,fullemail,fullpassword);
    }else{
         const { email,password } = fData;

 
    const fullemail = email;
    const fullpassword = password;

    loginUsers(fullemail,fullpassword); 
    } 

}



function logErrorServer(message) {
  const logMessage = getLogMessage('logerror server', message);
  fs.appendFileSync(logFilePath, logMessage + '\n');
  console.error(logMessage);
}

function logInfoServer(message) {
  const logMessage = getLogMessage('loginfo server', message);
  fs.appendFileSync(logFilePath, logMessage + '\n');
  console.log(logMessage);
}

function getLogMessage(level, message) {
  const date = new Date();
  return `[${level}] [(dd/mm/yy):${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}] [time(hh/mm/ss):${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${message}`;
}

const port = 3000;
server.listen(port, () => {
    logInfoServer(`Server is running on http://localhost:${port}`);
});

function registerUsers(fullname,fullusername,fullemail,fullpassword){
  //const date = new Date();
  queries.addDatabase('CompanyDatabase');
  queries.addTable('CompanyDatabase', 'UserTable', { fullname: [],fullusername:[], fullemail: [],fullpassword:[] });
  const getFullname=queries.queryUniqueUnderFieldContent('CompanyDatabase', 'UserTable', 'fullname',fullname);
  const getFullemail=queries.queryUniqueUnderFieldContent('CompanyDatabase', 'UserTable', 'fullemail',fullemail);
  console.log(getFullemail);

if (!fullname == '' ||!fullusername == '' || !fullemail == '' || !fullpassword == '') {
  if(getFullemail== undefined && getFullname == undefined){
    queries.addUniqueFieldsItems('CompanyDatabase', 'UserTable', 'fullname', { content: fullname });
    queries.addUniqueFieldsItems('CompanyDatabase', 'UserTable', 'fullusername', { content: fullusername});
    queries.addUniqueFieldsItems('CompanyDatabase', 'UserTable', 'fullemail', { content: fullemail });
    queries.addUniqueFieldsItems('CompanyDatabase', 'UserTable', 'fullpassword', { content: fullpassword});
    logInfoServer(`Registration is successful. Fullname: ${fullname}, Email: ${fullemail}`);      
  }else{
    logErrorServer(`Registration failed. Credential Email: ${fullemail} or Username:${fullname} is already being used.`);
  }

} else {
  logErrorServer('Registration failed. Fullname and/or Email is missing.');
}
}

function loginUsers(fullemail,fullpassword){
  //const date = new Date();
  const getFullpassword=queries.queryUniqueUnderFieldContent('CompanyDatabase', 'UserTable', 'fullpassword',fullpassword);
  const getFullemail=queries.queryUniqueUnderFieldContent('CompanyDatabase', 'UserTable', 'fullemail',fullemail);
  console.log(getFullemail);
  console.log(getFullpassword);

if (!fullpassword == '' || !fullemail == '') {
  if(getFullemail== fullemail && getFullpassword == fullpassword){
    logInfoServer(`Login is successful.`);    
    // Store the URL in local storage
    
  
  }else{
    logErrorServer(`Login failed. Credential Email: ${fullemail} or password is Invalid.`);
  }
} else {
  logErrorServer('Login failed. Email and/or Password is missing.');
}
}

