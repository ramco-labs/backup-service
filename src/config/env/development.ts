'use strict';

module.exports = {
    app: {
        title: 'Backup Generator',
        description: 'Backup Generator',
        url: 'http://localhost:8085'
    },
    port: process.env.NODEJS_BACKUPSERVICE_PORT || 8085,
    hostname: process.env.NODEJS_BACKUPSERVICE_HOST || 'localhost',
    // hostname: "0.0.0.0",
    authorization: 'mysecrettoken',

    jwt: {
        issuer: process.env.JWT_ISSUER || 'node-skeleton'
    },

    toggle: {
        apidoc: process.env.TOGGLE_APIDOC || true
    },
    api: {
        backupservice: {
            host: "http://" + process.env.NODEJS_BACKUPSERVICE_HOST + ":" + process.env.NODEJS_BACKUPSERVICE_PORT
        },
        schedulerdb: {
            host: "http://" + process.env.NODEJS_SCHEDULER_HOST + ":" + process.env.NODEJS_SCHEDULER_PORT,
            authorization: process.env.NODEJS_SCHEDULER_AUTHORIZATION
        }
    },
    db: {
        mssql: {
            root: {
                user: '',
                password: '',
                server: '',
                database: '',
                options: {
                    trustedConnection: false
                }
            }
        }
    }
};