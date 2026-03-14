Feature: User and role management in Admin module

  Background:
    Given user login as "superadmin"

  @employeeRoleMapping
  Scenario: Create credentials for employees and assign roles
    When user navigates to "Admin" module
    # And user clicks on Add user button #Commenting this step as we need to click on add user button for every new entry in datatable
    And user map roles for existing employee and create credentials
      | role        | status  | employee Name   | username    | password     |
      | clientadmin | Enabled | Dipu Ak Carter  | dipu17admin | Snow@110029  |
      | ess         | Enabled | Sahoo Kk Sharma | sahoo17ess  | Password@123 |











# test1
# Background:
#   Given user login as "superadmin"

#   Scenario: Assign roles and create login credentials for employees
#     Given the following employees exist:
#       | firstName | lastName | role        |
#       | Alice     | Admin    | clientAdmin |
#       | Bob       | Employee | ESS         |
#     When I assign roles and create login credentials for each employee
#     Then each employee should have a user account with the correct role

#   Scenario: Validate assigned roles in admin user table
#     When I search for "clientAdmin" and "ESS" users in the admin user table
#     Then I should see both users with correct roles

#   Scenario: Client admin edits and deletes ESS user details
#     Given I am logged in as "client admin"
#     When I edit the details of "ESS" user
#     Then the changes should be saved
#     When I delete the "ESS" user
#     Then the user should be removed from the system

#   Scenario: Super admin deletes client admin or ESS user if present
#     Given I am logged in as "super admin"
#     When I delete the "client admin" or "ESS" user if present
#     Then the user should not be present in the system

#   Scenario: Validate deletion in all modules and login
#     When I check the employee list in PIM and Admin
#     Then the deleted users should not be present
#     When I try to login as the deleted users
#     Then login should fail with an error message

#test1
# @mapUser
# Scenario Outline: Map newly created employee to System User as <role>
#   When user navigates to "Admin" module
#   And user clicks on "Add User"
#   And user selects role "<role>"
#   And user searches and selects employee stored from previous scenario
#   And user enters username "<username>"
#   And user enters password "Password@123"
#   And user saves the admin user
#   Then the user "<username>" should appear in Admin User List

#   Examples:
#     | role   | username    |
#     | Admin  | john.admin  |
#     | ESS    | rahul.ess   |