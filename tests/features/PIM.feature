Feature: Employee creation and validation in PIM

    Background:
        Given user login as "superadmin"

    # @createEmployee
    # Scenario: Create two employees (client admin and ESS)
    #     When user create new employees-ESS and clientAdmin
    #         | firstName | lastName | middleName | role        |
    #         | Alice     | Admin    |            | clientAdmin |
    #         | Bob       | Employee | Raj        | ESS         |
    #     Then I should see both employees in the PIM employee list
    #     #This employees both created above can be on any page of pagination in employee list

    #   Scenario: Validate created employees in Admin module
    #     Given the following employees exist:
    #       | firstName | lastName | role        |
    #       | Alice     | Admin    | clientAdmin |
    #       | Bob       | Employee | ESS         |
    #     When I check the user list in Admin
    #     Then both employees should be present in Admin

    @createEmployee
    Scenario Outline: Create employee as <userType> and validate in PIM Employee List
        When user navigates to "PIM" module
        And user clicks on "Add Employee"
        And user enters employee details "<firstName>" "<middleName>" "<lastName>"
        And user generate EmployeeId for  the employee
        And user saves the details
        Then employee "<firstName>""<lastName>" should appear in Employee List with the matching employee id
        #This list is the webtable and we can have pagination in this list so the employee can be present on any page of pagination

        Examples:
            | userType    | firstName | middleName | lastName |
            | clientadmin | John      | Ak          | Carter   |
            | ess         | Rahul     | Kk          | Sharma   |

