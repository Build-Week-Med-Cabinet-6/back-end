const db = require("../database/dbConfig.js");

module.exports = {
  findById,
  add
};


function findById(id) {
  return db("meds").where("user_id", id );
}


function add(medData,user_id) {
   // console.log(Object.values(user_id));
    medData["user_id"] = parseInt(Object.values(user_id));
  //  console.log(medData);
    return db("meds")
      .insert(medData);
  }