import { apiCall } from '../utils/data.utils';
import { execSync, exec} from 'child_process';
import { log } from '../utils/error.utils';
const config = require('../../config/config');
/**
 * SAMPLE FUNCTION - CAN BE REMOVED
 * @param req Request
 * @param res Response
 */

export const helloWorld = function (req, res) {
    return res.status(200).jsonp({
        message: 'Hello World'
    });
};

export const rsync = function (req, res) {
    let reqBody = req.body;
    let destPath = reqBody.destPath;
    let srcPath = reqBody.srcPath;
    let destServer = reqBody.destServer;

    let cmd = `rsync -e "ssh -o StrictHostKeyChecking=no" -azhe ssh -t ${srcPath} ${destServer}:${destPath};`;
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            log('error', {
                message: 'rsync error',
                error: err,
                stdout: stdout,
                stderr: stderr
            });
            return res.status(200).jsonp({
                message: 'rsync error.....',
                error: err,
                timestamp: new Date()
            });
        }
        log('info', {
            message: 'rsync successful'
        });
    });

    log('info', {
        message: 'Backup Successfull',
        timestamp: new Date()
    });

    return res.status(200).jsonp({
        message: 'Backup successfull.....',
        timestamp: new Date()
    });
};

export const backupMongoDB = async function (req, res) {

    try {
        let reqBody = req.body;
        let payload = {
            destPath: reqBody.destPath,
            srcPath: reqBody.srcPath,
            destServer: reqBody.destServer
        };
        res.status(200).jsonp({
            message: 'Mongo Backup Started.....',
            timestamp: new Date()
        });
        
        log('info', {
            message: 'Mongo Backup Started',
            timestamp: new Date()
        });

        await apiCall(config.api.backupservice.host + '/rsync', payload, "");
        log('info', {
            message: "Mongo Backup Succesfull"
        });
   
    } catch (err) {
        log('info', {
            message: 'Error in MongoDB Backup',
            error: err,
            timestamp: new Date()
        });
        res.status(200).jsonp({
            message: 'Error in MongoDB Backup.....',
            timestamp: new Date()
        });
    }

};

export const backupElk = async function (req, res) {

    res.status(200).jsonp({
        message: 'Elk backup started.....',
        timestamp: new Date()
    });

    let reqBody = req.body;
    let payload = {
        destPath: reqBody.destPath,
        srcPath: reqBody.srcPath,
        destServer: reqBody.destServer
    };
    let repo = req.body.repo || 'my_backup';
    let date = encodeURIComponent(String(new Date()).replace(/ /g, "_").toLowerCase());
    let backupCommand = `curl -XPUT "http://elasticcoord1:9201/_snapshot/${repo}/snapshot_${date}?wait_for_completion=true";`;
    
    try {
        let a = execSync(backupCommand);
        log('info', {
            message: 'elk backup started... ',
            timestamp: new Date(),
            a: a
        });

        await apiCall(config.api.backupservice.host + '/rsync', payload, "");       
        log('info', {
            message: 'rsync api called for elk... ',
            timestamp: new Date()
        });

    } catch (stderr) {
        log('error', {
            message: 'Error in elk backup',
            timestamp: new Date(),
            err: stderr
        });
        return res.status(200).jsonp({
            message: 'Elk backup failed.....',
            timestamp: new Date()
        });
    } 
};

export const scheduleBackup = async function (req, res) {

    try {
        let reqBody = req.body;
        let mongoBackupSchedulerInput = {
            label: "Mongo Backup Scheduler",
            requestOptions: {
                method: "POST",
                url: config.api.backupservice.host + "/backup/mongo",
                data: {
                    srcPath: reqBody.srcPathMongo,
                    destPath: reqBody.destPathMongo,
                    destServer: reqBody.destServerMongo
                }
            },
            flag: ' ',
            scheduleCondition: reqBody.mongoScheduleCondition
        };
        let mongoScheduler = await apiCall(config.api.schedulerdb.host + "/schedule", mongoBackupSchedulerInput,
            config.api.schedulerdb.authorization);

        log('info', {
            message: 'Mongo backup Scheduled---',
            response: mongoScheduler.response,
            timestamp: new Date()
        });
        
        let elkBackupSchedulerInput = {
            label: "ELK Backup Scheduler",
            requestOptions: {
                method: "POST",
                url: config.api.backupservice.host + "/backup/elk",
                data: {
                    srcPath: reqBody.srcPathElastic,
                    destPath: reqBody.destPathElastic,
                    destServer: reqBody.destServerElastic,
                    repo: reqBody.repo
                }
            },
            flag: ' ',
            scheduleCondition: reqBody.elkScheduleCondition
        };
        let elkScheduler = await apiCall(config.api.schedulerdb.host + "/schedule", elkBackupSchedulerInput,
            config.api.schedulerdb.authorization);
    
            log('info', {
                message: 'elk backup Scheduled---',
                response: elkScheduler.response,
                timestamp: new Date()
            });
        return res.status(200).jsonp({
            message: 'all backup succesfull.....',
            timestamp: new Date()
        });

    } catch (err) {
        log('info', {
            message: 'Error in Backup Scheduler',
            error: err,
            timestamp: new Date()
        });
        return res.status(200).jsonp({
            message: 'Error in backup.....',
            timestamp: new Date()
        });
    }

};

export const createRepo = function (req, res) {
    try {
    let repo = req.body.repo || 'my_backup';
    let repositoryCreationCommand = `curl -X PUT "http://elasticcoord1:9201/_snapshot/${repo}" -H 'Content-Type: application/json' -d'
    {
      "type": "fs",
      "settings": {
        "location": "/usr/share/elasticsearch/elkbackup"
      }
    }
    '`;
    execSync(repositoryCreationCommand);
    log('info', {
        message: 'successfully created repository for snapshot',
        timestamp: new Date()
    });
    
    return res.status(200).jsonp({err: 'Repo creation for snapshot successful'});
} catch (err) {
    log('error', {
        message: 'error in creating repository for snapshot',
        timestamp: new Date()
    });
    return res.status(400).jsonp({
        msg: 'Error in repo creation',
        err: err
    });
}

};