import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../data/data.json");

class Store {
  constructor() {
    this.data = {};
    this.expirations = {};

    this.loadData();
  }

  loadData() {
    if (fs.existsSync(dataFilePath)) {
      const rawData = fs.readFileSync(dataFilePath);
      this.data = JSON.parse(rawData);
    }
  }

  persistData() {
    fs.writeFileSync(dataFilePath, JSON.stringify(this.data));
  }

  set(key, value) {
    this.data[key] = value;
    this.persistData();
  }

  get(key) {
    return this.data[key] || null;
  }

  del(key) {
    delete this.data[key];
    delete this.expirations[key];
    this.persistData();
  }

  expire(key, seconds) {
    this.expirations[key] = Date.now() + seconds * 1000;
    setTimeout(() => {
      if (Date.now() >= this.expirations[key]) {
        this.del(key);
      }
    }, seconds * 1000);
  }

  ttl(key) {
    if (!this.expirations[key]) return -1;
    const remaining = this.expirations[key] - Date.now();
    return remaining > 0 ? Math.floor(remaining / 1000) : -1;
  }
}

const store = new Store();
export default store;
