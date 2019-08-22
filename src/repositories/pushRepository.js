'use strict';

const Repository = require('./repository');

class pushRepository extends Repository {
  constructor(entity) {
    this.entity = entity;
  }
}

module.exports = pushRepository;
