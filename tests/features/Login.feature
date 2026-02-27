# @login
# Scenario: Successful login with valid credentials
#   Given I am on the login page
#   When I login as "admin" user
#   Then I should see the dashboard page
#   And my profile name "Admin" should be visible in the header
#   And the correct widgets for "admin" should be visible

#@ui @login @smoke @superadmin
Feature: OrangeHRM Login

  Scenario: Login as superadmin
    Given user login as "superadmin"
    Then dashboard should be visible

# @login @smoke @clientadmin
#   Scenario: Login as clientadmin
#     Given user login as "clientadmin"
#     Then dashboard should be visible

# @login @smoke @ess
#   Scenario: Login as ess user
#     Given user login as "ess"
#     Then dashboard should be visible


