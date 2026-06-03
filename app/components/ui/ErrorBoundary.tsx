'use client';
import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#888'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#e8622a' }}>Oops</h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '420px' }}>
            Something went wrong. Please refresh the page.
          </p>
          <button onClick={() => window.location.reload()} style={{
            padding: '0.75rem 2rem', borderRadius: '9999px', border: '1px solid #e8622a',
            background: 'transparent', color: '#e8622a', cursor: 'pointer', fontSize: '0.95rem'
          }}>
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
