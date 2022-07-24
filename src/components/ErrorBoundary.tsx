import React, { ErrorInfo } from "react";

export type OnErrorFallback = (err: Error) => JSX.Element;

export interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

export interface ErrorBoundaryProps extends React.PropsWithChildren {
  Fallback?: OnErrorFallback;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.error && this.props.Fallback) {
      return this.props.Fallback(this.state.error);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
