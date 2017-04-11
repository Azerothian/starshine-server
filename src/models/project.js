import {Model} from "app/redis";
class Project extends Model {
  static modelName = "project"
  static fields = {
    "name": String,
    "repository": String,
  }
  static default = {
    "repository": "git://",
  }
}
export default Project;
