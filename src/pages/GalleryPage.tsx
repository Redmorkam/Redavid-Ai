import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import ImageCard from '../components/ImageCard'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import { useAppStore } from '../store/appStore'

type GalleryFilter = 'all' | 'images' | 'videos' | 'favorites'
type SortOption = 'newest' | 'oldest' | 'popular'

const GalleryPage = () => {
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [searchQuery, setSearchQuery] = useState('')

  const { generatedImages, generatedVideos } = useAppStore()

  const filteredImages = generatedImages
    .filter((img) => img.prompt.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      return 0
    })

  return (
    <div className="flex-1 pb-24 px-4 py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 gradient-text">Gallery</h1>
          <p className="text-dark-600 dark:text-dark-300">
            Your generated images and videos ({generatedImages.length + generatedVideos.length} items)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <div className="relative md:col-span-2">
            <Search size={20} className="absolute left-3 top-3 text-dark-400" />
            <input
              type="text"
              placeholder="Search by prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="flex-1 px-3 py-2.5 rounded-lg bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus-ring text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 flex-wrap"
        >
          {(['all', 'images', 'videos', 'favorites'] as const).map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-premium text-white'
                  : 'bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {filteredImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ImageCard image={image} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="text-center py-16">
            <p className="text-dark-600 dark:text-dark-400 mb-4">No creations yet</p>
            <p className="text-sm text-dark-500 dark:text-dark-500">
              Start by generating your first image or video
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default GalleryPage