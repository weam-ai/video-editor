import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AspectRatio, Info } from 'lucide-react';

const AdvancedOptions = ({ options, onChange }) => {
  const handleChange = (key, value) => {
    onChange({
      ...options,
      [key]: value
    });
  };

  const durationOptions = [
    { value: 3, label: '3 seconds', description: 'Quick preview' },
    { value: 5, label: '5 seconds', description: 'Standard length' },
    { value: 10, label: '10 seconds', description: 'Extended scene' },
    { value: 15, label: '15 seconds', description: 'Longer narrative' },
    { value: 20, label: '20 seconds', description: 'Maximum length' }
  ];

  const aspectRatioOptions = [
    { value: '16:9', label: '16:9', description: 'Landscape (YouTube, TV)' },
    { value: '9:16', label: '9:16', description: 'Portrait (TikTok, Stories)' },
    { value: '1:1', label: '1:1', description: 'Square (Instagram)' },
    { value: '4:3', label: '4:3', description: 'Classic (Traditional)' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <Settings className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Duration */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-600" />
            <label className="text-sm font-semibold text-gray-700">Duration</label>
          </div>
          
          <div className="space-y-2">
            {durationOptions.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  options.duration === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={option.value}
                  checked={options.duration === option.value}
                  onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  options.duration === option.value
                    ? 'border-primary-500'
                    : 'border-gray-300'
                }`}>
                  {options.duration === option.value && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <AspectRatio className="h-4 w-4 text-gray-600" />
            <label className="text-sm font-semibold text-gray-700">Aspect Ratio</label>
          </div>
          
          <div className="space-y-2">
            {aspectRatioOptions.map((option) => (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  options.aspectRatio === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="aspectRatio"
                  value={option.value}
                  checked={options.aspectRatio === option.value}
                  onChange={(e) => handleChange('aspectRatio', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  options.aspectRatio === option.value
                    ? 'border-primary-500'
                    : 'border-gray-300'
                }`}>
                  {options.aspectRatio === option.value && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              </motion.label>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Pro Tips:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Longer durations may take more time to generate</li>
              <li>• Different aspect ratios work better for different content types</li>
              <li>• 16:9 is ideal for YouTube and social media</li>
              <li>• 9:16 is perfect for TikTok and Instagram Stories</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedOptions;
