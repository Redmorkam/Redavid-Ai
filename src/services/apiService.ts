import axios, { AxiosInstance } from 'axios'

class APIService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'https://api.redavid-ai.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  // Image Generation
  async generateImage(prompt: string, options: any) {
    try {
      const response = await this.client.post('/generate/image', {
        prompt,
        ...options,
      })
      return response.data
    } catch (error) {
      console.error('Image generation error:', error)
      throw error
    }
  }

  async enhancePrompt(prompt: string) {
    try {
      const response = await this.client.post('/prompts/enhance', { prompt })
      return response.data.enhanced_prompt
    } catch (error) {
      console.error('Prompt enhancement error:', error)
      throw error
    }
  }

  // Video Generation
  async generateVideo(prompt: string, options: any) {
    try {
      const response = await this.client.post('/generate/video', {
        prompt,
        ...options,
      })
      return response.data
    } catch (error) {
      console.error('Video generation error:', error)
      throw error
    }
  }

  // Generation Status
  async getGenerationStatus(generationId: string) {
    try {
      const response = await this.client.get(`/generations/${generationId}`)
      return response.data
    } catch (error) {
      console.error('Status check error:', error)
      throw error
    }
  }

  // Upload Reference Image
  async uploadReferenceImage(file: File) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await this.client.post('/upload/reference-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.url
    } catch (error) {
      console.error('Image upload error:', error)
      throw error
    }
  }

  // Gallery
  async fetchGallery(type: 'images' | 'videos', page = 1) {
    try {
      const response = await this.client.get(`/gallery/${type}?page=${page}&limit=20`)
      return response.data
    } catch (error) {
      console.error('Gallery fetch error:', error)
      throw error
    }
  }

  // Export
  async downloadGeneration(generationId: string, format: string) {
    try {
      const response = await this.client.get(`/download/${generationId}?format=${format}`, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Download error:', error)
      throw error
    }
  }
}

export const apiService = new APIService()