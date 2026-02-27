import { defineBddConfig } from 'playwright-bdd';

export default defineBddConfig({
  // Always use forward slashes in globs (works on Windows too)
  features: 'tests/features/**/*.feature',

  // Explicitly include ALL step files + the fixtures file
  steps: [
    'tests/steps/**/*.ts',
    'src/fixtures/fixtures.ts'  // <-- ensure generator can see your custom test
  ],

  // If inference still fails, this line forces the import of your custom test
  importTestFrom: 'src/fixtures/fixtures.ts',
});