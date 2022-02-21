/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const carsService = require('../services/cars.service');

const get = function(req, res){
   // res.send(carsService.get(req.params._id))
         var data = carsService.get(req.params._id);
        console.log(data);
        data.then( (succ) =>  {console.log(succ)
         res.send(succ);
        });

}

const getAll = function(req, res){
        var data = carsService.getAll();
        console.log(data);
        data.then( (succ) =>  {console.log(succ)
         res.send(succ);
        });
}


module.exports = {
    get,
    getAll
};