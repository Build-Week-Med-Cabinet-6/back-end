const db = require("../database/dbConfig.js");

module.exports = {
  findById,
  add
};


function findById(id) {
  return db("meds as m")
  .join('users as u', 'u.id', 'm.user_id')
  .select('m.id', 'm.strain', 'm.strain_id','m.user_id','u.username')
  .where("user_id", id );



  // return db('steps as s')
  // .join('recipes as sc', 'sc.id', 's.recipe_id')
  // .select('sc.recipe_name', 's.instructions', 's.step_number')
  // .where('sc.id', id)
  // .orderBy('s.step_number');

}




function add(medData,user_id) {
   // console.log(Object.values(user_id));
    medData["user_id"] = parseInt(Object.values(user_id));
  //  console.log(medData);
    return db("meds")
      .insert(medData);
  }