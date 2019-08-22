'use strict';

module.exports = [{
    name: 'List Things',
    query: `
query ListThings {
  listThings {
    tenant,
    name,
  }
}
    `,
  },
];
