import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  onFileSelected: (file: File) => void
  accept?: string
  multiple?: boolean
}

const FileUpload = ({ onFileSelected, accept = 'image/*', multiple = false }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragEnter = () => setIsDragging(true)
  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    onFileSelected(file)

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-lg overflow-hidden"
        >
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
          <button
            onClick={() => {
              setPreview(null)
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
          >
            <X size={20} />
          </button>
        </motion.div>
      ) : (
        <motion.div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-dark-300 dark:border-dark-600 hover:border-primary-400'
          }`}
        >
          <Upload className="mx-auto mb-3 text-primary-500" size={32} />
          <p className="font-medium mb-1">Drag and drop your file here</p>
          <p className="text-sm text-dark-600 dark:text-dark-400 mb-4">or</p>
          <label className="inline-block">
            <span className="px-4 py-2 bg-gradient-premium text-white rounded-lg cursor-pointer hover:shadow-glow transition-all">
              Browse Files
            </span>
            <input
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              className="hidden"
            />
          </label>
        </motion.div>
      )}
    </div>
  )
}

export default FileUpload