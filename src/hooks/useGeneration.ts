import { useState, useCallback } from 'react'
import { apiService } from '../services/apiService'

export function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (prompt: string, options: any) => {
    setIsGenerating(true)
    setProgress(0)
    setError(null)

    try {
      const result = await apiService.generateImage(prompt, options)
      setProgress(100)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate image'
      setError(message)
      throw err
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { generate, isGenerating, progress, error }
}

export function useVideoGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (prompt: string, options: any) => {
    setIsGenerating(true)
    setProgress(0)
    setError(null)

    try {
      const result = await apiService.generateVideo(prompt, options)
      setProgress(100)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate video'
      setError(message)
      throw err
    } finally {
      setIsGenerating(false)
    }
  }, [])

  return { generate, isGenerating, progress, error }
}

export function usePromptEnhancer() {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const enhance = useCallback(async (prompt: string) => {
    setIsEnhancing(true)
    setError(null)

    try {
      const enhanced = await apiService.enhancePrompt(prompt)
      return enhanced
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to enhance prompt'
      setError(message)
      throw err
    } finally {
      setIsEnhancing(false)
    }
  }, [])

  return { enhance, isEnhancing, error }
}