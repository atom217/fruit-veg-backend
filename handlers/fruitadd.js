'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the fruit item.',
    });
    return;
  },

  const params = {
    TableName: 'Fruitspush',
    Item: {
      id: uuid.v1(),
      name: data.name,
      quantity: data.quantity,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  //write the todo to the database
  dynamoDb.put(params, error => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn create the fruit item.'
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
};
