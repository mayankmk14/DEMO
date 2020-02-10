'use strict';

const log4js = require('log4js');
const config = require('./config/mainConfig.json')

/**
 * return the logger object
 * @param {String} moduleName
 */
var getLogger = function (moduleName) {
    var logger = log4js.getLogger(`${config.appName} <> ${config.envName} > ${moduleName}`);
    logger.level = config.loggerLevel || 'DEBUG';
    return logger;
};

module.exports = {
    getLogger
};