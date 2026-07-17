import { motion } from 'framer-motion'

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
}

const Slider = ({ label, value, onChange, min, max, step = 1, unit }: SliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-primary-500 font-semibold">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative pt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-dark-300 dark:bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          style={{
            background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${
              ((value - min) / (max - min)) * 100
            }%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    </div>
  )
}

export default Slider