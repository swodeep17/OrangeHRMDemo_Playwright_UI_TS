// tests/steps/*.steps.ts
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/fixtures';

const { Given, When, Then, After } = createBdd(test);

// ... your steps (use expect or expect.soft as needed)