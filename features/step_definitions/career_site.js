'use strict';

const careerSite = require('../ui/page_objects/career_site');

module.exports = function () {
  this.Given(/^the (.*) site is loaded$/, givenPage => {
    careerSite.openPage(givenPage);
    return careerSite.waitForLoad("Role input");
  });

  this.When(/^the (.*) is clicked$/, givenButton => {
    return careerSite.clickElement(givenButton);
  });

  this.When(/^the role (.*) is entered$/, givenRole => {
    return careerSite.giveRole(givenRole);
  });

  this. When(/^the country (.*) is selected$/, givenCountry => {
    return careerSite.selectCountry(givenCountry);
  });

  this.When(/^the city (.*) is selected$/, givenCity => {
    return careerSite.selectCity(givenCity);
  });

  this.Then(/^the available jobs are (displayed|hidden)$/, (state) => {
    return expect(careerSite.isElementDisplayed("Job result"))
      .to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^an open position should be (displayed|hidden)$/, (state) => {
    return expect(careerSite.isElementDisplayed("Position result"))
      .to.eventually.be.equal(state === 'displayed');
  });

  this.Then(/^the title of the position should be (.*)$/, role => {
    return expect(careerSite.getElementText("Position name"))
      .to.eventually.equal(role);
  });

  this.Then(/^the location of the position should be (.*)$/, location => {
    return expect(careerSite.getElementText("Position location"))
      .to.eventually.equal(location.toUpperCase());
  });

  this.Then(/^the priority of the position should be (.*)$/, priority => {
    return expect(careerSite.getElementText("Position priority"))
      .to.eventually.equal(priority);
  });

  this.Then(/^the description of the position should start with: (.*)$/, desc => {
    return careerSite.getElementText("Position description")
      .then(text => expect(text.startsWith(desc)).to.be.equal(true));
  });

  this.Then(/^the following skills are selected: (.*)$/, data => {
    return careerSite.selectSkills(data);
  });

  this.Then(/^the following positions should be displayed:$/, (dataTable) => {
    return careerSite.checkMultiplePositions(dataTable);
  });
};
