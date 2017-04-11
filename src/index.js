// s
import Project from "models/project";


var p = new Project();
p.name = "Howdy";
p.repository = "lol";
p.save().then(() => {
  return Project.findById(p.id).then((p2) => {
    console.log("complete", {p, p2});
    process.exit(); //eslint-disable-line
  });

});
//console.log("p", p);
