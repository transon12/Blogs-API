class BaseService {
  constructor(param) {
    this.param = param;
  }

  async encrypData() {
    try {
      console.log(this.param);
      return;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  BaseService,
};
