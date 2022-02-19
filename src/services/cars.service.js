/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/


const AWS = require('aws-sdk');





const data = require('../data');

const get = function(_id){
     getAll().find(cars => cars._id == _id);
    return getAll1().find(cars => cars._id == _id);
}


AWS.config.update({region: 'eu-west-1'});
var sts = new AWS.STS();
var s3;
// arn:aws:iam::706467051665:role/theoremone_iam_role
(async () => {
  let role_promise = await sts.assumeRole({
    RoleArn: 'arn:aws:iam::706467051665:role/theoremone_iam_role',
    RoleSessionName: 'NodeDeveloperRoleSession'
  }).promise();

    console.log('Assumed role success :)');

    /* here you are making AWS globally to use your assume role, 
       this will make subsequent call error prone, may or may not work
       depending on how you are making call 
   */

    AWS.config.update({
      accessKeyId: role_promise.Credentials.AccessKeyId,
      secretAccessKey: role_promise.Credentials.SecretAccessKey,
      sessionToken: role_promise.Credentials.SessionToken
    });

    s3 = new AWS.S3({apiVersion: '2012-11-05'});
})();

const getAll1 = async function(){
      var file = await s3.getObject(
    {   Bucket: "theoremone-s3-accessmentbucket", 
        Key: "inputs/file1.json",
        ResponseContentType: 'application/json'
    }).promise();

     let objectData = file.Body.toString('utf-8');
      console.log(objectData);
        return JSON.parse(JSON.stringify(objectData));
}

const getAll = function(){
    return data.Accounts;
}

module.exports = {
    get,
    getAll
};
