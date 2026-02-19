import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-32 h-32 bg-red-500/20 border-4 border-red-500/50 rounded-full mb-6">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                Oops! Something Broke
              </h1>

              <p className="text-xl text-slate-400 mb-8">
                Even the best products have bugs. Let's fix this together!
              </p>

              {/* Error Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 text-left"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-sm">!</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-300 mb-2">Error Details:</div>
                    <div className="text-sm font-mono text-red-400 break-all">
                      {this.state.error?.toString()}
                    </div>
                  </div>
                </div>

                {this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
                      Stack Trace (for developers)
                    </summary>
                    <pre className="mt-2 text-xs text-slate-500 overflow-auto max-h-40 p-3 bg-slate-950 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Page
                </button>
                <button
                  type="button"
                  onClick={this.handleHome}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </button>
              </motion.div>

              {/* Help Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pt-8 border-t border-slate-800"
              >
                <p className="text-slate-500 text-sm mb-3">
                  If this error persists, I'd love to help fix it!
                </p>
                <a
                  href="mailto:aroramadan88@gmail.com?subject=Website Error Report"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Report this issue: aroramadan88@gmail.com
                </a>
              </motion.div>

              {/* Fun Recovery Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
              >
                <p className="text-sm text-slate-400">
                  💡 <span className="font-medium text-slate-300">Product Insight:</span> Every error is
                  a learning opportunity. This is how we iterate and improve!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
