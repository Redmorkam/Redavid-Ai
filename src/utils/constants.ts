// AI Models
export const IMAGE_MODELS = [
  { id: 'nano-banana-pro', name: 'Nano Banana Pro', icon: '🍌' },
  { id: 'flux-pro', name: 'FLUX Pro', icon: '⚡' },
  { id: 'sdxl', name: 'SDXL', icon: '🎨' },
  { id: 'imagen', name: 'Imagen', icon: '🖼️' },
  { id: 'recraft', name: 'Recraft', icon: '🎭' },
]

export const VIDEO_MODELS = [
  { id: 'veo', name: 'Veo', icon: '🎬' },
  { id: 'kling-ai', name: 'Kling AI', icon: '🎞️' },
  { id: 'hailuo-ai', name: 'Hailuo AI', icon: '🌪️' },
  { id: 'luma-dream-machine', name: 'Luma Dream Machine', icon: '✨' },
  { id: 'pixverse', name: 'PixVerse', icon: '🌈' },
  { id: 'wan-video', name: 'Wan Video', icon: '🎥' },
]

// Image Sizes
export const IMAGE_SIZES = {
  square: [
    { label: '512×512', value: '512x512' },
    { label: '768×768', value: '768x768' },
    { label: '1024×1024', value: '1024x1024' },
  ],
  portrait: [
    { label: '768×1024', value: '768x1024' },
    { label: '1024×1536', value: '1024x1536' },
    { label: '1080×1920', value: '1080x1920' },
  ],
  landscape: [
    { label: '1024×768', value: '1024x768' },
    { label: '1536×1024', value: '1536x1024' },
    { label: '1920×1080', value: '1920x1080' },
  ],
  social: [
    { label: 'Instagram (1080×1080)', value: 'instagram' },
    { label: 'Facebook (1200×628)', value: 'facebook' },
    { label: 'TikTok (1080×1920)', value: 'tiktok' },
    { label: 'YouTube Thumbnail (1280×720)', value: 'youtube-thumbnail' },
    { label: 'YouTube Banner (2560×1440)', value: 'youtube-banner' },
    { label: 'Twitter (1024×512)', value: 'twitter' },
    { label: 'LinkedIn (1200×627)', value: 'linkedin' },
    { label: 'Pinterest (1000×1500)', value: 'pinterest' },
  ],
}

// Video Settings
export const VIDEO_DURATIONS = [5, 10, 15, 30, 60]
export const VIDEO_ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:5', '3:2', '21:9']
export const VIDEO_FPS = [24, 30, 60]
export const VIDEO_RESOLUTIONS = [
  { label: 'HD (720p)', value: '720p' },
  { label: 'Full HD (1080p)', value: '1080p' },
  { label: '2K', value: '2k' },
  { label: '4K', value: '4k' },
]

export const CAMERA_MOTIONS = [
  { id: 'static', name: 'Static', description: 'No camera movement' },
  { id: 'pan', name: 'Pan', description: 'Horizontal camera sweep' },
  { id: 'tilt', name: 'Tilt', description: 'Vertical camera movement' },
  { id: 'dolly', name: 'Dolly', description: 'Forward/backward movement' },
  { id: 'zoom', name: 'Zoom', description: 'Zoom in and out' },
  { id: 'orbit', name: 'Orbit', description: 'Circular camera movement' },
  { id: 'handheld', name: 'Handheld', description: 'Shaky, handheld effect' },
  { id: 'cinematic', name: 'Cinematic', description: 'Professional cinematic movement' },
]

// Export Formats
export const IMAGE_EXPORT_FORMATS = ['PNG', 'JPG', 'WEBP']
export const VIDEO_EXPORT_FORMATS = ['MP4', 'MOV', 'WEBM']

// Default Settings
export const DEFAULT_SETTINGS = {
  theme: 'auto',
  language: 'en',
  defaultImageSize: '1024x1024',
  defaultImageModel: 'flux-pro',
  defaultVideoQuality: '1080p',
  defaultVideoModel: 'veo',
  notificationsEnabled: true,
}

// Prompt Templates
export const PROMPT_TEMPLATES = [
  {
    category: 'Nature',
    prompts: [
      'A serene mountain landscape with aurora borealis',
      'Enchanted forest with mystical creatures',
      'Ocean waves crashing on a pristine beach at sunset',
    ],
  },
  {
    category: 'Fantasy',
    prompts: [
      'Dragon flying over ancient castle ruins',
      'Magical forest with glowing creatures',
      'Ethereal fairy tale kingdom',
    ],
  },
  {
    category: 'Sci-Fi',
    prompts: [
      'Cyberpunk city with neon signs and flying cars',
      'Futuristic space station orbiting a planet',
      'Post-apocalyptic world with advanced technology',
    ],
  },
  {
    category: 'Portraits',
    prompts: [
      'Portrait of an elegant woman in Renaissance clothing',
      'Steampunk gentleman with intricate details',
      'Fantasy warrior princess',
    ],
  },
]
