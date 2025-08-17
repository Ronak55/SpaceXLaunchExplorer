import React from 'react';
import ErrorView from './ErrorView';

type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : 'Unknown error' };
  }

  componentDidCatch(error: unknown) {
    if (__DEV__) console.error('Boundary error', error);
  }

  render() {
    return this.state.hasError ? (
      <ErrorView message={this.state.message || 'Unexpected error'} />
    ) : (
      this.props.children
    );
  }
}
