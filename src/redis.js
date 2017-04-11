import redis from "utils/redis";
import config from "config";
import uuid from "uuid/v4";

export const client = redis.createClient(config.redis);
export class Model {
  constructor() {
    if (this.constructor.default) {
      Object.assign(this, this.constructor.default);
    }
  }
  static findById(id) {
    const o = new this();
    o.id = id;
    return o.refresh().then(() => o);
  }
  getKey() {
    return `${this.constructor.modelName}-${this.id}`;
  }
  refresh() {
    return client.hgetallAsync(this.getKey()).then((values) => {
      return Object.assign(this, values);
    });
  }
  save() {
    if (!this.id) {
      this.id = uuid();
    }
    const data = Object.keys(this.constructor.fields).reduce((o, key) => {
      o[key] = this[key];
      return o;
    }, {});
    return client.hmsetAsync(this.getKey(), data);
  }
}
