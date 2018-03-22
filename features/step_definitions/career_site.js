'use strict';

module.exports = function () {
  const commonParent = '.section--hide-on-mobile ';

  this.Given(/^the EPAM career site is loaded$/, () => {
    driver.get('https://www.epam.com/careers');
    return driver.wait(() => driver.findElement(by.css('.job-search__submit')).isDisplayed());
  });

  this.When(/^the Find button is clicked$/, () => {
    return driver.findElement(by.css(commonParent + '.job-search__submit')).click();
  });

  this.When(/^the role (.*) is entered$/, role => {
    return driver.findElement(by.css(commonParent + '.job-search__input')).sendKeys(role);
  });

  this. When(/^the country (.*) is selected$/, country => {
    driver.findElement(by.css(commonParent + '.select-box-selection')).click();
    let locationItem = driver.findElement(by.css('li[aria-label="' + country + '"]'));
    driver.sleep(3000);
    return locationItem.click();
  });

  this.When(/^the city (.*) is selected$/, city => {
    let cityID = 'li[id$="' + city + '"]';
    driver.sleep(3000);
    return driver.findElement(by.css(cityID)).click();
  });

  this.Then(/^the available jobs are (displayed|hidden)$/, (state) => {
    return expect(driver.findElement(by.css('.search-result')).isDisplayed())
      .to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^an open position should be (displayed|hidden)$/, (state) => {
    driver.sleep(1000);
    return expect(driver.findElement(by.css('.search-result__item-info')).isDisplayed())
      .to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^the title of the position should be (.*)$/, role => {
    return expect(driver.findElement(by.css('.search-result__item-name')).getText())
      .to.eventually.equal(role);
  });

  this.Then(/^the location of the position should be (.*)$/, location => {
    return expect(driver.findElement(by.css('.search-result__location')).getText())
      .to.eventually.equal(location.toUpperCase());
  });

  this.Then(/^the priority of the position should be (.*)$/, priority => {
    return expect(driver.findElement(by.css('.search-result__item-type')).getText())
      .to.eventually.equal(priority);
  });

  this.Then(/^the description of the position should start with: (.*)$/, desc => {
    return driver.findElement(by.css('.search-result__item-description')).getText()
      .then(text => expect(text.startsWith(desc)).to.be.equal(true));
  });

  this.Then(/^the following skills are selected: (.*)$/, data => {
    let skillsArray = data.split(',');
    let skillsFinal = skillsArray.map(str => driver
      .findElement(by.css(commonParent + 'input[data-value="' + str.trim() + '"]')));
    let skillsSelector = driver.findElement(by.css(commonParent + '.multi-select-filter'));

    skillsSelector.click();
    driver.sleep(3000);

    for (let i = 0; i < skillsFinal.length; i++){
      skillsFinal[i].findElement(by.xpath("..")).click();
      driver.sleep(3000);
    }

    return skillsSelector.click();
  });

  this.Then(/^the following positions should be displayed:$/, (dataTable) => {
    let dataArray = dataTable.raw().map(subarr => subarr[0]);
    const positionByName = (text) => driver.findElement(by.xpath('//a[contains(text(),"' + text + '")]'));
    dataArray.map(item => expect(positionByName(item).isDisplayed()).to.eventually.equal(true));
    return driver.sleep(3000);
  });
};
