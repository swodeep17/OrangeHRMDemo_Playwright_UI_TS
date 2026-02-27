# Feature: Profile modification and validation

#   Scenario Outline: Login and modify profile details as different users
#     Given I am logged in as "<role>"
#     When I update my profile details
#     Then the changes should be saved
#     And the updated details should be visible in my profile

#     Examples:
#       | role        |
#       | clientAdmin |
#       | ESS         |
