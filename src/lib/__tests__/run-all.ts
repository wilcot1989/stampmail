/**
 * Runs all test suites sequentially for coverage measurement.
 * Usage: npx c8 npx tsx src/lib/__tests__/run-all.ts
 */
import "./features.test";
import "./editor-functions.test";
import "./exhaustive-feature-check.test";
import "./functional-tests.test";
import "./new-features.test";
import "./live-preview-flow.test";
import "./subniche-features.test";
import "./team-and-api-flows.test";
import "./app-flows.test";
// mocked-runtime runs async — import last
import "./mocked-runtime.test";
