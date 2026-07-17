import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Plus } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'
import PromptInput from './PromptInput'
import Card from './Card'
import { PROMPT_TEMPLATES } from '../utils/constants'

interface PromptStudioProps {
  isOpen: boolean
  onClose: () => void
  onSelectPrompt?: (prompt: string) => void
}

const PromptStudio = ({ isOpen, onClose, onSelectPrompt }: PromptStudioProps) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'history' | 'favorites'>('templates')

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prompt Studio" size="lg">
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-dark-200 dark:border-dark-700">
          {(['templates', 'history', 'favorites'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium relative ${
                activeTab === tab
                  ? 'text-primary-500'
                  : 'text-dark-600 dark:text-dark-400 hover:text-primary-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500"
                />
              )}
            </motion.button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-4">
            {PROMPT_TEMPLATES.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-primary-500" />
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.prompts.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 8 }}
                      onClick={() => {
                        onSelectPrompt?.(prompt)
                        onClose()
                      }}
                      className="w-full text-left p-3 rounded-lg bg-dark-50 dark:bg-dark-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    >
                      <p className="text-sm">{prompt}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            <p className="text-sm text-dark-600 dark:text-dark-400">Your recent prompts will appear here</p>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-2">
            <p className="text-sm text-dark-600 dark:text-dark-400">Your favorite prompts will appear here</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default PromptStudio