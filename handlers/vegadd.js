'use strict';

module.exports.add = async event => {
  return {
    statusCode: 200, 
    body: JSON.stringify(
      {
        message: 'going serverless',
        input: event,
      },
      null,
      2  
    ),
  };
};