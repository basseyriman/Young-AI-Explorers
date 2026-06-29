'use client'

import { Component, type ReactNode } from 'react'
import AIAssistant from '@/components/AIAssistant'

class AssistantErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function AIAssistantLoader() {
  return (
    <AssistantErrorBoundary>
      <AIAssistant />
    </AssistantErrorBoundary>
  )
}
