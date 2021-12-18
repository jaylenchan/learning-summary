const NormalModule = require('./NormalModule')
class NormalModuleFactory {
  create({ name, context, rawRequest, resource, parser }) {
    return new NormalModule({name, context, rawRequest, resource, parser})
  }
}

module.exports = NormalModuleFactory;
