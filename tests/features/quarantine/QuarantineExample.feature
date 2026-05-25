# tests/features/quarantine/QuarantineExample.feature
# ═══════════════════════════════════════════════════════════════════════════════
# FILE LOCATION: tests/features/quarantine/QuarantineExample.feature
#
# QUARANTINE PATTERN — what it is and how to use it:
#
# A "quarantined" test is a flaky test that you've identified as unstable but
# haven't fixed yet. Instead of deleting it (losing coverage) or leaving it
# in main suite (blocking CI), you tag it @quarantine.
#
# LIFECYCLE:
#   Flaky test detected  →  add @quarantine tag  →  move to quarantine/ folder
#   (pipeline stays GREEN, test still runs in isolation)
#                ↓
#   Fix the root cause  →  remove @quarantine  →  move back to features/
#                ↓
#   If not fixed in 7 days  →  delete the test (dead weight)
#
# HOW IT RUNS:
#   Main pipeline  : grepInvert: /@quarantine/ ensures it NEVER runs in regression
#   Quarantine job : npx playwright test --project=quarantine  (runs separately)
#   Jenkins        : catchError(buildResult: 'SUCCESS') — never fails build
#   GitHub Actions : continue-on-error: true — never fails workflow
#
# INTERVIEW ANSWER:
#   "I monitor test age. Any test flaky for more than 3 days goes into @quarantine
#    so it never blocks CI while I investigate. Tests not fixed within 7 days
#    are deleted — dead tests create false confidence."
# ═══════════════════════════════════════════════════════════════════════════════

# @quarantine @flaky
# Feature: Employee list pagination [QUARANTINED]
#   # Quarantined on: 2025-06-10
#   # Reason: Pagination timing issue on staging — race condition under investigation
#   # Owner: swodeep17@gmail.com
#   # Fix deadline: 2025-06-17 (delete if not fixed by then)

#   Scenario: Navigate to page 2 of employee list
#     Given user is logged in as "superadmin"
#     When user navigates to "PIM" module
#     And user clicks next page
#     Then employee list page 2 should be visible
