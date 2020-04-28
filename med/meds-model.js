const db = require("../database/dbConfig.js");

module.exports = {
  getMeds,
  getResources,
  getTasks,
  findById,
  add,
  addR,
  addT
};

function getMeds() {
  return db("meds");
}

function getResources() {
    return db("resources");
  }

function getTasks() {
    return db("tasks as t")
      .join('meds as p', 'p.id', 't.project_id')
      .select('p.project_name', 'p.description as project_description', 't.completed','t.description as task_description');
  }

// a method to find a project by id
function findById(id) {
  return db("meds").where({ id }).first();
}


function add(project_name) {
  return db("meds")
    .insert(project_name, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function addR(r_data) {
    return db("resources")
      .insert(r_data)
      .then((id) => {
        return id[0];
      });
  }

  function addT(t_data) {
    return db("tasks")
      .insert(t_data)
      .then((id) => {
        return id[0];
      });
  }
