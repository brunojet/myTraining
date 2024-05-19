var fs = require('fs');
var path = require('path');
var AppStoreResponseCache = require('./AppStoreResponseCache');

// Import the test.json file
var filePath = path.join(__dirname, 'test.json');
var json = JSON.parse(fs.readFileSync(filePath, 'utf8'));


var asrc = new AppStoreResponseCache();

asrc.persistJsonToCache('teste', 'teste', json.testData);
