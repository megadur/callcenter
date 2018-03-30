/* Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   api.js
 *
 * DESCRIPTION
 *   Contains the logic for the main application API.
 *
 *****************************************************************************/

var express = require('express');
var database = require('../base/database-pool.js');
var apiEmp = require('./api.emp.js');

function getRouter() {
    var router = express.Router();

    router.route('/emps').get(apiEmp.getEmps);
    router.route('/depts').get(getDepts);

    return router;
}

module.exports.getRouter = getRouter;

function getDepts(req, res, next) {
    database.simpleExecute(
            'SELECT department_id, ' +
            '    department_name, ' +
            '    manager_id, ' +
            '    location_id ' +
            'FROM departments', {}, //no binds
            {
                outFormat: database.OBJECT
            }
        )
        .then(function (results) {
            res.send(results);
        })
        .catch(function (err) {
            next(err);
        });
}