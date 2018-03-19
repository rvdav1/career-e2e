Feature: EPAM career site tests
As a user
I want to visit the EPAM career site
So that I can apply for a job

  Scenario: CAREER_1 - Searching for jobs
    Given the EPAM career site is loaded
    When the Find button is clicked
    Then the available jobs are displayed

  Scenario Outline: CAREER_2.1 - Filtered search by position and locale
    Given the EPAM career site is loaded
    When the role <role> is entered
    And the country Hungary is selected
    And the city Debrecen is selected
    And the Find button is clicked
    Then an open position should be displayed
    And the title of the position should be <role>
    And the location of the position should be Debrecen, Hungary
    And the priority of the position should be HOT
    And the description of the position should start with: <description>

    Examples:
      | role                     | description                                                                     |
      | Test Automation Engineer | Currently we are looking for a Test Automation Engineer for our Debrecen office |
      | Java Developer           | Currently we are looking for a Java Developer for our Debrecen office           |

  Scenario: CAREER_2.2 - Filtered search by skills and locale
    Given the EPAM career site is loaded
    When the country Hungary is selected
    And the city Debrecen is selected
    And the following skills are selected: Software Engineering, Software Test Engineering
    And the Find button is clicked
    Then the following positions should be displayed:
      | Test Automation Engineer |
      | Java Developer           |
      | UI Developer             |