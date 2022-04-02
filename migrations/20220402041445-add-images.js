'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

// exports.up = function(db) {
//   return null;
// };

exports.up = function (db, callback) {
  db.createTable('images', {
    id: { type: 'int',autoIncrement: true, primaryKey: true },
    name: 'string'
  }, callback);
};


exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
