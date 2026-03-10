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

