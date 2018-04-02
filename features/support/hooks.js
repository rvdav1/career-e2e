'use strict';

require('chromedriver');
require('cucumber').Util.Colors(true);
var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect = chai.expect;

var webdriver = require('selenium-webdriver');
global.by = webdriver.By;
global.until = webdriver.until;

module.exports = function(){
    this.setDefaultTimeout(60000);
    this.registerHandler('BeforeFeatures', function(){

        global.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

        /*
        driver.setNetworkConditions({
            offline: false,
            latency: 5, // Additional latency (ms).
            download_throughput: 500 * 1024, // Maximal aggregated download throughput.
            upload_throughput: 500 * 1024 // Maximal aggregated upload throughput.
        });
        */

        global.driver.isElementVisible = function(locator){
            return driver.isElementPresent(locator).then(function (present) {
                if (!present) {
                    return false;
                }
                return driver.findElement(locator).isDisplayed().then(null, function () {
                    return false;
                });
            });
        };
        return global.driver.manage().window().maximize();
    });

    this.registerHandler('AfterFeatures', function(){
        return global.driver.quit();
    });
};