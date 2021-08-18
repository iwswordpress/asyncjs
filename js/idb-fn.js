// Using the IDB library, an idb object is returned.
// This enables us to create a DB, Object Stores (tables).
// We can use the following utility functions to check a table exists,
// and do CRUD.

// We will cover versioning.

var DATABASE_NAME = 'IDB-POSTS';
var TABLE1 = 'FORM-DATA'; // we can create many tables
var TABLE2 = 'wpPOSTS';
var TABLE3 = 'TEST';
// we get a connection to IDB via the file idb.js that is on the web pae.
var dbPromise = idb.open(DATABASE_NAME, 12, function (db) {
   if (!db.objectStoreNames.contains(TABLE1)) {
      db.createObjectStore(TABLE1, { keyPath: 'syncID' }); // keyPath is Primary Key or uses
   }
   // ----- COMMENT OUT FOR DRILL
   if (!db.objectStoreNames.contains(TABLE2)) {
      const postsStore = db.createObjectStore(TABLE2, { keyPath: 'id' });
      // we can create indexes based on any field to arrange in alphabetical order
      // index name, field, whether unique

      postsStore.createIndex('titleIDX', 'data.title.rendered', { unique: false });
   }
   if (!db.objectStoreNames.contains(TABLE3)) {
      db.createObjectStore(TABLE3, { autoIncrement: true });
   }
   if (!db.objectStoreNames.contains('VERSION-TEST')) {
      db.createObjectStore('VERSION-TEST', { keyPath: 'id' });
   }
   // ----- COMMENT OUT FOR DRILL
});

function dbExists(db) {
   if (dbPromise) {
      return true;
   } else {
      return false;
   }
}

function storeExists(table) {
   return dbPromise.then(function (db) {
      if (db.objectStoreNames.contains(table)) {
         return true;
      } else {
         return false;
      }
   });
}

// Transaction proces:
// 1. Once we have our Promise of the DB opened we create a type of transaction.
// 2. We then reference a store in that transaction.
// 3. We then perform an operation.
// 4. We then mark the transaxtion as complete

function updateData(table, data) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readwrite');
      var dbTable = tx.objectStore(table);
      dbTable.put(data); // normally add but put allows overwriting of existing data if we refreshs page. do a check
      return tx.complete; // property not method
   });
}
function writeData(table, data) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readwrite');
      var dbTable = tx.objectStore(table);
      dbTable.put(data);
      return tx.complete; // property not method
   });
}
function rowCount(table) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readonly');
      var dbTable = tx.objectStore(table);
      var countRequest = dbTable.count();
      countRequest.onsuccess = function () {};
      return countRequest;
   });
}
function readAllData(table) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readonly');
      var dbTable = tx.objectStore(table);
      return dbTable.getAll();
   });
}

function getData(table, id) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readonly');
      var dbTable = tx.objectStore(table);
      return dbTable.get(id);
   });
}

function deleteItemFromData(table, id) {
   dbPromise
      .then(function (db) {
         var tx = db.transaction(table, 'readwrite');
         var dbTable = tx.objectStore(table);
         dbTable.delete(id);
         return tx.complete;
      })
      .then(function () {
         console.log('Item deleted!');
      });
}
function clearAllData(table) {
   return dbPromise.then(function (db) {
      var tx = db.transaction(table, 'readwrite');
      var dbTable = tx.objectStore(table);
      dbTable.clear();
      return tx.complete;
   });
}
