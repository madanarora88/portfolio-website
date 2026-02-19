/**
 * Test page that throws on render - used to verify ErrorBoundary works.
 * Visit /test-error to see the error boundary UI.
 */
const TestError = () => {
  throw new Error('Intentional error for testing ErrorBoundary')
}

export default TestError
