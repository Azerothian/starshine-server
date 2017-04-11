import {Model} from "app/redis";
import Project from "./Project";
class Task extends Model {
  static modelName = "task"
  static fields = {
    "project": Project,
    "fileName": String,
    "functionName": String,
  }
  static default = {}
}
export default Task;
