const validate = require("env-schema");
const Ajv = require("ajv");
const dotenv = require("dotenv");
const fs = require("fs");
const { subtract, isEqual } = require("node-set-theory");

const rawFile = fs.readFileSync(".env", "utf8");
const schemaFile = require("../env-schema");

const rawConfig = dotenv.parse(rawFile);

new Ajv({ code: { source: true } }).compile(schemaFile);

try {
  const parsedConfig = validate({
    schema: schemaFile,
    dotenv: true,
    ajv: new Ajv({
      allErrors: true,
      removeAdditional: true,
      useDefaults: false,
      coerceTypes: true,
    }),
  });
} catch (error) {
  if ("errors" in error) {
    console.log(error);
  } else {
    console.log("Errors found.");
    console.log("");

    console.log(error);
    for (let i in error.errors) {
      console.log(` - .env ${error.errors[i].message}`);
    }
  }

  process.exit(1);
}

const rawKeys = Object.getOwnPropertyNames(rawConfig);
const parsedKeys = Object.getOwnPropertyNames(parsedConfig);

if (!isEqual(rawKeys, parsedKeys)) {
  const extraKeys = subtract(rawKeys, parsedKeys);

  if (extraKeys.length !== 0) {
    console.log("ERROR: You have extra keys in your .env file.");
    console.log("Please remove them, or add them to env-schema.js");
    console.log("");
    console.log("Keys:");
    for (let k in extraKeys) {
      console.log(`  - ${extraKeys[k]}`);
    }
  }


  process.exit(1);
}

process.exit(0);
