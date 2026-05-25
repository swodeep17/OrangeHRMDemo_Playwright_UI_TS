/**
 * Jenkinsfile
 * ═══════════════════════════════════════════════════════════════════════════════
 * FILE LOCATION: project root (same level as package.json)
 *
 * HOW TO USE WITH LOCAL jenkins.war:
 *   1. java -jar jenkins.war --httpPort=8080
 *   2. Open http://localhost:8080
 *   3. New Item → Pipeline → Pipeline script from SCM → Git → your repo URL
 *   4. Add credentials (below) under Manage Jenkins → Credentials
 *
 * CREDENTIALS TO ADD IN JENKINS UI (Manage Jenkins → Credentials → Global):
 *   Kind: Secret text
 *   ID + Value:
 *     SUPERADMIN_USER   = Admin
 *     SUPERADMIN_PASS   = admin123
 *     CLIENTADMIN_USER  = (from your @createEmp run)
 *     CLIENTADMIN_PASS  = (from your @createEmp run)
 *     ESS_USER          = (from your @createEmp run)
 *     ESS_PASS          = (from your @createEmp run)
 *     EXPECTED_ENV_URL  = https://opensource-demo.orangehrmlive.com
 *
 * PIPELINE STAGES:
 *   1. Checkout       → pull source code
 *   2. Install        → npm ci (strict — uses package-lock.json)
 *   3. BDD Generate   → npx bddgen (generate .spec.ts from .feature files)
 *   4. Smoke Tests    → fast-fail gate (@smoke tag, chromium only)
 *   5. Regression     → parallel shards (3 shards × chromium)
 *   6. API Tests      → API contract tests
 *   7. Merge Reports  → combine all shard blob reports into one HTML
 *   8. Quarantine     → isolated run, never fails the build
 *   9. Post           → archive artifacts, clean workspace
 * ═══════════════════════════════════════════════════════════════════════════════
 */

pipeline {
    agent any

    // ── Environment variables injected from Jenkins Credentials ────────────────
    // Identical names to .env file — same process.env reads in TypeScript code.
    environment {
        NODE_VERSION    = '18'
        ENV             = 'dev'   // change to staging / prod per job config

        // Credentials — stored in Jenkins, never in code
        SUPERADMIN_USER  = credentials('SUPERADMIN_USER')
        SUPERADMIN_PASS  = credentials('SUPERADMIN_PASS')
        CLIENTADMIN_USER = credentials('CLIENTADMIN_USER')
        CLIENTADMIN_PASS = credentials('CLIENTADMIN_PASS')
        ESS_USER         = credentials('ESS_USER')
        ESS_PASS         = credentials('ESS_PASS')
        EXPECTED_ENV_URL = credentials('EXPECTED_ENV_URL')

        // Azure Key Vault (uncomment when using AKV)
        // AZURE_VAULT_URL = credentials('AZURE_VAULT_URL')

        // Marks this as CI — activates retries=2, workers=4, blob reporter in config
        CI = 'true'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')  // hard stop — prevents zombie pipelines
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()           // prevent resource contention
    }

    stages {

        // ── Stage 1: Checkout ─────────────────────────────────────────────────
        stage('Checkout') {
            steps {
                cleanWs()   // clean workspace before each run — prevents stale artifacts
                checkout scm
            }
        }

        // ── Stage 2: Install dependencies ─────────────────────────────────────
        // npm ci is STRICT: uses package-lock.json exactly — prevents dependency drift
        stage('Install') {
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm ci'
                sh 'npx playwright install chromium --with-deps'
            }
        }

        // ── Stage 3: Generate BDD spec files ──────────────────────────────────
        stage('BDD Generate') {
            steps {
                sh 'npx bddgen'
            }
        }

        // ── Stage 4: Smoke Tests (Fast-Fail Gate) ─────────────────────────────
        // If ANY smoke test fails → pipeline aborts → regression never runs.
        // This saves cloud minutes when the app has a critical breakage.
        stage('Smoke Tests') {
            steps {
                sh 'npx playwright test --project=smoke --reporter=line'
            }
            post {
                failure {
                    echo '❌ SMOKE FAILED — aborting pipeline. Fix smoke tests before regression.'
                }
            }
        }

        // ── Stage 5: Regression (Parallel Shards) ─────────────────────────────
        // 3 shards run simultaneously on the same Jenkins node (or 3 agents if available).
        // Each shard produces a blob report. Merged in Stage 7.
        // Data isolation: each test generates unique IDs (timestamps/faker) — no contention.
        stage('Regression - Parallel Shards') {
            parallel {
                stage('Shard 1/3') {
                    steps {
                        sh 'npx playwright test --project=regression --shard=1/3'
                    }
                }
                stage('Shard 2/3') {
                    steps {
                        sh 'npx playwright test --project=regression --shard=2/3'
                    }
                }
                stage('Shard 3/3') {
                    steps {
                        sh 'npx playwright test --project=regression --shard=3/3'
                    }
                }
            }
        }

        // ── Stage 6: API Tests ─────────────────────────────────────────────────
        stage('API Tests') {
            steps {
                sh 'npx playwright test --project=api --reporter=line'
            }
        }

        // ── Stage 7: Merge Shard Reports ──────────────────────────────────────
        // Combines all 3 shard blob reports into one unified HTML report.
        // Stakeholders see ONE report — not 3 separate ones.
        stage('Merge Reports') {
            steps {
                sh 'npx playwright merge-reports --reporter html ./blob-report'
                publishHTML(target: [
                    allowMissing:          false,
                    alwaysLinkToLastBuild: true,
                    keepAll:               true,
                    reportDir:             'playwright-report',
                    reportFiles:           'index.html',
                    reportName:            'Playwright Report'
                ])
            }
        }

        // ── Stage 8: Quarantine Tests (never fails build) ─────────────────────
        // Flaky tests tagged @quarantine run here in isolation.
        // catchError means even if ALL quarantine tests fail, the build stays GREEN.
        // Review weekly — fix or delete tests older than 7 days.
        stage('Quarantine Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    sh 'npx playwright test --project=quarantine --reporter=line'
                }
            }
            post {
                always {
                    echo '⚠ Quarantine results above — these do not affect build status.'
                }
            }
        }
    }

    // ── Post-build actions ─────────────────────────────────────────────────────
    post {
        always {
            // Archive test artifacts for debugging
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**',      allowEmptyArchive: true

            // Kill any zombie Chromium processes left from crashed workers
            sh 'pkill -f chromium || true'
            sh 'pkill -f playwright || true'
        }
        failure {
            // Notify team on failure (configure EMAIL_RECIPIENTS in Jenkins globals)
            echo '❌ Pipeline FAILED — check Playwright report above.'
            // mail to: "${env.EMAIL_RECIPIENTS}", subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}", body: "Check: ${env.BUILD_URL}"
        }
        success {
            echo '✅ Pipeline PASSED'
        }
        cleanup {
            // Final workspace clean — prevents disk bloat on Jenkins node
            cleanWs()
        }
    }
}
