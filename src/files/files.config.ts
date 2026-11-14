export type FileCategory = 'video' | 'image' | 'audio'

export interface FileCategoryConfig {
  folder: string
  maxSize: number
  mimeTypes: Record<string, string>
}

export const FILE_CONFIG: Record<
  FileCategory,
  FileCategoryConfig
> = {
  video: {
    folder: 'videos',
    maxSize: 1024 * 1024 * 1024,
    mimeTypes: {
      'video/mp4': '.mp4',
      'video/webm': '.webm',
    }
  },

  audio: {
    folder: 'audio',
    maxSize: 100 * 1024 * 1024,
    mimeTypes: {
      'audio/mpeg': '.mp3',
      'audio/wav': '.wav',
      'audio/ogg': '.ogg',
    }
  },

  image: {
    folder: 'images',
    maxSize: 10 * 1024 * 1024,
    mimeTypes: {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp'
    }
  }
}