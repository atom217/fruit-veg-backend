'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const glob = require('glob');

const s3 = new AWS.S3();

const stage = process.env.STAGE || 'latest';
const Bucket = `ais-graphql-metadata-${stage}`;

const upload = params => new Promise((resolve, reject) => {
  s3.upload(params, (error) => {
    if (error) return reject(error);
    return resolve(null);
  });
});

const uploadGraphQLData = (folder) => {
  glob(`./graphql/${folder}/*`, (_, files) => {
    const toUpload = files.map((file) => {
      const Key = file.slice(10);
      const Body = fs.readFileSync(file);
      const params = {
        Body,
        Bucket,
        Key,
      };
      return upload(params);
    });
    return Promise.all(toUpload);
  });
};


Promise.all([
  uploadGraphQLData('schemas'),
  uploadGraphQLData('datasources'),
  uploadGraphQLData('mapping-templates'),
])
  .then(() => console.log('DONE')) // eslint-disable-line no-console
  .catch((error) => {
    // see error logged in codebuild
    console.log(error); // eslint-disable-line no-console
    throw error;
  });
