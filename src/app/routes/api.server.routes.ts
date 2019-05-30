'use strict';

import {getMetrics} from '../controllers/metrics.server.controller';
import {authenticate, resolveToken, resolveSecret} from '../controllers/auth.server.controller';
import {helloWorld, backupMongoDB, createRepo, scheduleBackup, backupElk, rsync} from '../controllers/api.server.controller';

module.exports = function (app) {

    app.route('/hello').post(authenticate, helloWorld);

    app.route('/hello').get(resolveToken, resolveSecret, helloWorld);
    app.route('/createRepo').post(createRepo);
    app.route('/metrics').get(getMetrics);
    app.route('/backup/mongo').post(backupMongoDB);
    app.route('/backup/elk').post(backupElk);
    app.route('/backup').post(scheduleBackup);
    app.route('/rsync').post(rsync);

    // Set params if needed
    // app.param('Id', apiCtrl.func);

};
