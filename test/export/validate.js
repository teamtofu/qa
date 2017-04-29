var Ajv = require('ajv');
var ajv = new Ajv();
var fs = require('fs');

var test = JSON.parse(fs.readFileSync('./test.json'));
var schema = JSON.parse(fs.readFileSync('./../../src/schema/export.json'));

var validate = ajv.compile(schema);
var valid = validate(test);
if (!valid) {
    console.error(validate.errors);
    process.exit(1);
}