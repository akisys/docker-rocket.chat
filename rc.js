const dns = require('dns');
const util = require('util');

var MONGO_SERVICE_ID = process.env.MONGO_SERVICE_ID;
var MONGO_PORT = process.env.MONGO_PORT;
var MONGO_DBNAME = process.env.MONGO_DBNAME;
var MONGO_REPLSET = process.env.MONGO_REPLSET;
var MONGO_DB_OPTS = process.env.MONGO_DB_OPTS;
var MONGO_OPLOG_SKIP = process.env.MONGO_OPLOG_SKIP;

var mongodb_format = "mongodb://%s/%s";
var mongodb_oplog_format = "mongodb://%s/local";
if(MONGO_REPLSET) {
  if(!MONGO_DB_OPTS) {
    MONGO_DB_OPTS="&readPreference=nearest&w=majority";
  }
  mongodb_format = mongodb_format + util.format("?replicaSet=%s%s", MONGO_REPLSET, MONGO_DB_OPTS);
  mongodb_oplog_format = mongodb_oplog_format + util.format("?replicaSet=%s", MONGO_REPLSET);
}

dns.resolve4(MONGO_SERVICE_ID,
  function(err, addresses){
    glue = util.format(":%d,", MONGO_PORT);
    mongo_endpoints = addresses.join(glue) + util.format(":%d",MONGO_PORT);
    process.env["MONGO_URL"] = util.format(mongodb_format,mongo_endpoints,MONGO_DBNAME);
    console.log(util.format("Using MONGO_URL: %s", process.env.MONGO_URL));
    if(!MONGO_OPLOG_SKIP) {
      process.env["MONGO_OPLOG_URL"] = util.format(mongodb_oplog_format, mongo_endpoints);
      console.log(util.format("Using MONGO_OPLOG_URL: %s", process.env.MONGO_OPLOG_URL));
    }
  }
);

require('./main.js');
