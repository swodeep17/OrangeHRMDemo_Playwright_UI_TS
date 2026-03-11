Feature: Employee creation and validation in PIM

    Background:
        Given user login as "superadmin"

    @createEmp
    Scenario Outline: Create employee as <userType> and validate in PIM Employee List
        When user navigates to "PIM" module
        And user clicks on "Add Employee"
        And user enters employee details "<firstName>" "<middleName>" "<lastName>"
        And user generate EmployeeId for  the employee
        # And user saves the details
        And user saves the details for "<userType>"
        # And user clicks on Employee List
        Then employee "<firstName>" "<lastName>" should appear in Employee List with the matching employee id
        #This list is the webtable and we can have pagination in this list so the employee can be present on any page of pagination

        Examples:
            | userType    | firstName | middleName | lastName |
            | clientadmin | Dipu      | Ak         | Carter   |
            | ess         | Sahoo     | Kk         | Sharma   |

    
    # Scenario: Validate the webtable headers
    #     When user navigates to "PIM" module
    #     And user clicks on "Employee List"
    #     Then the webtable should have the following headers:
    #         | Employee Name | Employee Id | Job Title | Employment Status | Include |
    
    # Scenario: Validate the UI of PIM page
    #     When user navigates to "PIM" module
    #     Then the PIM page should have the following UI elements:
    #         | Add Employee Button | Employee List Button | Search Box | Reset Button |

    # Scenario: Validate user is able to search employee by name and id
    #     When user navigates to "PIM" module
    #     And user clicks on "Employee List"
    #     And user searches for employee by name "<employeeName>"
    #     Then the search results should display employee with name "<employeeName>"
    #     When user searches for employee by id "<employeeId>"
    #     Then the search results should display employee with id "<employeeId>"

    #     Examples:
    #         | employeeName    | employeeId |
    #         | Dipu Ak Carter  | 12345      |
    #         | Sahoo Kk Sharma | 67890      |

    #     Scenario: Validate user is able to reset search filters
    #     When user navigates to "PIM" module
    #     And user clicks on "Employee List"
    #     And user applies search filters
    #     Then the search results should display filtered employees
    #     When user clicks on "Reset" button
    #     Then the search filters should be cleared
    #     And the employee list should display all employees

    #     Scenario: Validate sort functionality in employee list
    #     When user navigates to "PIM" module
    #     And user clicks on "Employee List"
    #     And user sorts the employee list by "Employee Name"
    #     Then the employee list should be sorted by "Employee Name"
    #     When user sorts the employee list by "Employee Id"
    #     Then the employee list should be sorted by "Employee Id"

    
