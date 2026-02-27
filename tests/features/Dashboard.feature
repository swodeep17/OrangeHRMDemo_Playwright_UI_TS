@dashboard
Feature: Dashboard widgets and navigation by role
    Background:
        Given user login as "superadmin"

    #   Scenario Outline: Dashboard widgets for different roles
    #     When I login as "<role>" user
    #     Then I should be on the "Dashboard" page
    #     And the correct widgets for "<role>" should be visible

    #     Examples:
    #       | role        |
    #       | clientAdmin |
    #       | ESS         |
    #       | superAdmin  |

    # tets1
    Scenario: Validate dashboard headers
        Then validate page title "Dashboard" is displayed
        Then validate profile avatar icon
        And user should be able to logout

    Scenario: Validate sidemenu and menulist items like admin, pim, myinfo are present
        Then validate side menu is displayed
        And admin option is showing in menulist
        And pim option is showing in menulist
        And myinfo option is showing in menulist
        And user should be able to logout

    @test2202
    Scenario: Validate user is navigate across modules from side menulist
        And user navigates to Admin module
        And user navigate to dashboard module from side menulist







