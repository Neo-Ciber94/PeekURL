import React, { ErrorInfo } from "react";

export interface ErrorBoundaryProps extends React.PropsWithChildren {}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return (
    //     <div>
    //       <h2>Oops, there is an error!</h2>
    //       <button
    //         type="button"
    //         onClick={() => this.setState({ hasError: false })}
    //       >
    //         Try again?
    //       </button>
    //     </div>
    //   );
    // }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
