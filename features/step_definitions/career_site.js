'use strict';

module.exports = function () {

  this.Given(/^the EPAM career site is loaded$/, () => {
    driver.get('https://www.epam.com/careers');
    return driver.wait(() => driver.findElement(by.css('.job-search__submit')).isDisplayed());
  });

  this.When(/^the Find button is clicked$/, () => {
    return driver.findElement(by.css('.job-search__submit')).click();
  });

  this.When(/^the role (.*) is entered$/, role => {
    return driver.findElement(by.css('.job-search__input')).sendKeys(role);
  });

  this. When(/^the country Hungary is selected$/, country => {
    driver.findElement(by.id('select-box-location-d2-container')).click();
    let locationItem = driver.findElement(by.xpath('//li[contains(@aria-label,"' + country + '")]'));
    return locationItem.click();
  });

  this.When(/^the city Debrecen is selected$/, city => {
    let cityID = `select-box-location-d2-result-yjw5-${city}`;
    return driver.findElement(by.id(cityID)).click();
  });

  this.Then(/^the available jobs are (displayed|hidden)$/, (state) => {
    return expect(driver.findElement(by.css('.search-result')).isDisplayed()).to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^an open position should be (displayed|hidden)$/, state => {
    return expect(driver.findElement(by.css('.search-result__item-info')).isDisplayed()).to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^the title of the position should be (.*)$/, role => {
    return expect(driver.findElement(by.css('.search-result__item-name')).getText()).to.eventually.equal(role);
  });

  this.Then(/^the location of the position should be (.*)$/, location => {
    return expect(driver.findElement(by.css('.search-result__location')).getText()).to.eventually.equal(location);
  });

  this.Then(/^the priority of the position should be (.*)$/, priority => {
    return expect(driver.findElement(by.css('.search-result__item-type')).getText()).to.eventually.equal(priority);
  });

  this.Then(/^the description of the position should start with: (.*)$/, desc => {
    return driver.findElement(by.css('.search-result__item-description')).getText().then(text => expect(text.startsWith(desc)).to.be.equal(true));
  });

  this.Then(/^And the following skills are selected: Software Engineering, Software Test Engineering$/, (data) => {
    let skills = data.split(',');
  
  });

  this.Then(/^the following positions should be displayed:$/, (dataTable) => {
    let dataArray = dataTable.raw().map(subarr => subarr[index]);
    const positionByName = () => driver.findElement(by.cssContaingText(text));
    return expect(dataArray.map(item => positionByName(item).isDisplayed()).every(Boolean)).to.eventually.equal(true);
  });
};
