'use strict';

module.exports = {
    app: {
        title: 'Backup Generator',
        description: 'Backup Generator',
        url: 'http://localhost'
    },
    port: process.env.NODEJS_PORT || 8081,
    hostname: process.env.NODEJS_IP || 'localhost'
};
