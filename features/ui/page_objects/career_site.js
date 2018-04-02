'use strict';

const careerSite = require('../selectors/career_site');

class CareerSite{
    openPage(page){
        driver.get(global.urls[page]);
    }

    giveRole(role){
        return this.getElement("Role input").sendKeys(role);
    }

    selectCountry(country){
        this.clickElement("Location select");
        driver.sleep(500);
        let locationCountry = driver.findElement(by.css('li[aria-label="' + country + '"]'));
        return locationCountry.click();
    }

    selectCity(city){
        driver.sleep(500);
        let locationCity = driver.findElement(by.css('li[id$="' + city + '"]'));
        return locationCity.click();
    }

    selectSkills(skills){
        let skillsArray = skills.split(',');
        let skillsFinal = skillsArray.map(str => driver
            .findElement(by.css('input[data-value="' + str.trim() + '"]')));

        this.clickElement("Skill select");

        for (let i = 0; i < skillsFinal.length; i++){
          skillsFinal[i].findElement(by.xpath("..")).click();
        }
    
        return this.clickElement("Skill select");
    }

    checkMultiplePositions(dataTable){
        let dataArray = dataTable.raw().map(subarr => subarr[0]);
        const positionByName = (text) => driver.findElement(by.xpath('//a[contains(text(),"' + text + '")]'));
        return dataArray.map(item => expect(positionByName(item).isDisplayed()).to.eventually.equal(true));
    }

    isElementDisplayed(target){
        driver.wait(until.elementLocated(by.css(this.getSelector(target))), 10000);
        return driver.wait(() => this.getElement(target).isDisplayed());
    }

    getElementText(target){
        return this.getElement(target).getText();
    }

    getSelector(target) {
        return careerSite[target];
    }

    getElement(target){
        return driver.findElement(by.css(this.getSelector(target)));
    }

    clickElement(target){
        return this.getElement(target).click();
    }

    waitForLoad(target){
        return driver.wait(() => driver.findElement(by.css(this.getSelector(target))).isDisplayed());
    }
}

module.exports = new CareerSite();