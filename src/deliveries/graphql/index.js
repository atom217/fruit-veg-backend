'use strict';

const serve = require('../../../graphql/server');

const mockAuthObject = {
  tenant: process.env.TENANT || 'crypto',
  role: 'tenantManager', // tenantManager | tenantAdmin | user
  email: 'pushpendra.paliwal@peak.ai',
};

serve({
  // Query: {
    // example: (_, args) => exampleUsecase({ ...mockAuthObject, ...args }),
  // },
  // Mutation: {
  // },
});
