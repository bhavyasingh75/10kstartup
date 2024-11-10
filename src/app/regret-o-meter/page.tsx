'use client'

import { useState } from 'react'

interface RegretFactor {
  name: string
  score: number
  emoji: string
  detected: boolean
  message: string
}

interface RegretResult {
  totalScore: number
  claimAmount: number
  factors: RegretFactor[]
  message: string
}

export default function RegretOMeter() {
  const [activity, setActivity] = useState('')
  const [result, setResult] = useState<RegretResult | null>(null)
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false)
  const [insuranceDetails, setInsuranceDetails] = useState<{
    coverage: number;
    premium: number;
    term: string;
    description: string;
  } | null>(null)

  const regretFactors = {
    impulsive: {
      keywords: [
        'impulse', 'random', 'what was i thinking', 'suddenly', 'just decided', 'no idea',
        'without thinking', 'on a whim', 'spontaneous', 'right now', 'immediately'
      ],
      weight: 15,
      emoji: '🤔',
      name: 'What Was I Thinking?',
      message: 'Ah, the classic "brain on vacation" moment!'
    },
    peerPressure: {
      keywords: [
        'friends made me', 'everyone was doing it', 'couldn\'t say no', 'they said',
        'peer pressure', 'convinced me', 'they think', 'group decision', 'popular',
        'friend suggested', 'everyone else'
      ],
      weight: 10,
      emoji: '👥',
      name: 'Peer Pressure',
      message: 'Friends who regret together, stay together!'
    },
    spontaneous: {
      keywords: [
        'spur', 'moment', 'big mistake', 'good idea at the time', 'why not',
        'yolo', 'just for fun', 'crazy idea', 'wild', 'adventure', 'risky'
      ],
      weight: 20,
      emoji: '💫',
      name: 'Spontaneous Disaster',
      message: 'Spontaneity: when your future self wants to have a word with your present self'
    },
    fomo: {
      keywords: [
        'missing out', 'everyone\'s doing it', 'felt left out', 'looked fun', 'trending',
        'viral', 'popular now', 'don\'t want to miss', 'once in a lifetime', 'limited time'
      ],
      weight: 10,
      emoji: '😰',
      name: 'The FOMO Factor',
      message: 'FOMO: Because missing out is apparently worse than regret!'
    }
  }

  const specificScenarios = {
    extreme: {
      keywords: [
        'tattoo', 'quit job', 'marriage', 'move country', 'sell everything',
        'life savings', 'permanent', 'forever', 'never again', 'all in'
      ],
      score: 25,
      message: "This is definitely in 'write a memoir' territory! 📚"
    },
    high: {
      keywords: [
        'ex', 'quit', 'hair', 'drunk', 'party', 'vegas', 'dating app',
        'social media post', 'expensive', 'loan', 'debt'
      ],
      score: 15,
      message: "Future you is already planning the damage control! 🚨"
    },
    medium: {
      keywords: [
        'date', 'buy', 'text', 'call', 'post', 'social', 'dye',
        'weekend trip', 'shopping spree', 'makeover'
      ],
      score: 10,
      message: "Well, at least it's not a tattoo... yet! 😅"
    },
    low: {
      keywords: [
        'pizza', 'nap', 'watch', 'movie', 'food', 'sleep',
        'weekend', 'short trip', 'small purchase'
      ],
      score: -5,
      message: "This is more 'mild embarrassment' than 'lifelong regret' territory 😌"
    }
  }

  const calculateClaimAmount = (score: number): number => {
    if (score <= 15) return 0
    if (score <= 30) return 100
    if (score <= 45) return 250
    if (score <= 60) return 500
    if (score <= 75) return 750
    return 1000
  }

  const calculateRegret = () => {
    if (!activity.trim()) return
    
    const text = activity.toLowerCase()
    let totalScore = Math.floor(Math.random() * 30) + 15
    const detectedFactors: RegretFactor[] = []

    // Analyze regret factors with increased multipliers
    Object.entries(regretFactors).forEach(([_, factor]) => {
      const matchedKeywords = factor.keywords.filter(keyword => text.includes(keyword))
      if (matchedKeywords.length > 0) {
        const baseMultiplier = Math.min(matchedKeywords.length, 3)
        const randomMultiplier = baseMultiplier + (Math.random() * 3)
        const factorScore = Math.floor(factor.weight * randomMultiplier)
        totalScore += factorScore
        detectedFactors.push({
          name: factor.name,
          score: factorScore,
          emoji: factor.emoji,
          detected: true,
          message: factor.message
        })
      }
    })

    // Analyze specific scenarios with higher scores
    let scenarioScore = 0
    let scenarioMessage = ''
    
    for (const [_, scenario] of Object.entries(specificScenarios)) {
      const matchedKeywords = scenario.keywords.filter(keyword => text.includes(keyword))
      if (matchedKeywords.length > 0) {
        scenarioScore = scenario.score * (1 + Math.random())
        scenarioMessage = scenario.message
        break
      }
    }

    totalScore += scenarioScore

    // Increase length-based bonus
    if (text.length > 100) {
      totalScore += 15 // Increased from 10
    }

    // Analyze sentiment with higher impact
    const negativeWords = ['bad', 'wrong', 'mistake', 'regret', 'worried', 'scared', 'nervous']
    const negativeCount = negativeWords.filter(word => text.includes(word)).length
    totalScore += negativeCount * 8 // Increased from 5

    // Add final random variance (-15 to +15)
    totalScore += Math.floor(Math.random() * 30) - 15

    // Cap the total score at 100
    totalScore = Math.min(Math.max(totalScore, 0), 100)

    const claimAmount = calculateClaimAmount(totalScore)
    
    setResult({
      totalScore,
      claimAmount,
      factors: detectedFactors,
      message: getOverallMessage(totalScore, detectedFactors, scenarioMessage)
    })
  }

  const getOverallMessage = (score: number, factors: RegretFactor[], scenarioMessage: string) => {
    if (factors.length === 0 && !scenarioMessage) {
      return "Hmm, seems suspiciously normal. Are you sure you're telling me everything? 🤨"
    }
    
    if (scenarioMessage) {
      return scenarioMessage
    }
    
    if (score > 75) {
      return "🚨 MAXIMUM REGRET ALERT! This is heading straight for the 'Life Lessons' chapter! 📚"
    }
    if (score > 60) {
      return "This has 'future story for your therapist' written all over it! 🛋️"
    }
    if (score > 45) {
      return "You might want to sleep on this... for a year or two. 😅"
    }
    if (score > 30) {
      return "Well, at least it'll make a good story! 📖"
    }
    if (score > 15) {
      return "Minor regret territory - nothing a good laugh won't fix! 😄"
    }
    return "Could be worse! But then again, that's what they all say... 😏"
  }

  const resetCalculator = () => {
    setActivity('')
    setResult(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActivity(e.target.value)
  }

  const handleGetInsurance = () => {
    if (!result) return
    
    setInsuranceDetails({
      coverage: result.claimAmount,
      premium: Math.floor(result.claimAmount * 0.1), // 10% of claim amount
      term: "30 days",
      description: `Covers regret from: ${activity}`
    })
    setShowInsuranceDetails(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">Pachta-wah!</h1>
          <p className="text-gray-600">Calculate your potential regret before it happens!</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
              What are you thinking of doing?
            </label>
            <textarea
              id="activity"
              value={activity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] text-gray-900 placeholder-gray-500"
              placeholder="e.g., My friends made me get a matching tattoo because everyone was doing it..."
              rows={4}
            />
          </div>

          {!result ? (
            <button
              onClick={calculateRegret}
              disabled={!activity.trim()}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Regret
            </button>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-purple-600 mb-2">
                    {result.totalScore}% Regret Score
                  </h2>
                  <p className="text-gray-700 italic mb-4">
                    {result.message}
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Recommended Insurance Amount: ${result.claimAmount}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      (Based on your potential regret level)
                    </p>
                  </div>
                </div>

                {result.factors.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h3 className="font-semibold text-gray-700">Risk Factors Detected:</h3>
                    {result.factors.map((factor, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg border border-purple-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">
                            {factor.emoji} {factor.name}
                          </span>
                          <span className="text-purple-600 font-semibold">
                            +{factor.score} points
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 italic">{factor.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {result.claimAmount > 0 && (
                  <div className="mt-4 p-3 bg-pink-50 rounded-lg text-center">
                    <p className="text-pink-600 font-medium">
                      🎯 Pro tip: Get insurance now and claim ${result.claimAmount} when reality hits!
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-white border border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-50 transition-colors"
                >
                  Try Again
                </button>
                {result.claimAmount > 0 ? (
                  <button 
                    onClick={handleGetInsurance}
                    className="flex-1 bg-white border border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-50 transition-colors text-center"
                  >
                    Get Insurance
                  </button>
                ) : (
                  <button 
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-2 rounded-md cursor-not-allowed"
                  >
                    Get Insurance
                  </button>
                )}
              </div>

              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showInsuranceDetails ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="mt-6 space-y-4 bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
                  <h3 className="text-xl font-semibold text-pink-600 text-center mb-4">
                    Your Regret Insurance Policy
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Coverage Amount:</span>
                      <span className="font-semibold text-pink-600">${insuranceDetails?.coverage}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Premium:</span>
                      <span className="font-semibold text-pink-600">${insuranceDetails?.premium}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Policy Term:</span>
                      <span className="font-semibold text-pink-600">{insuranceDetails?.term}</span>
                    </div>
                    
                    <div className="pt-3 border-t border-pink-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Covers:</span> {activity}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg mt-4">
                      <p className="text-sm text-gray-500 italic">
                        Note: This insurance policy is valid for one regrettable decision only. 
                        Multiple regrets require separate policies. Terms and conditions apply.*
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        *Terms and conditions: Your regret must be genuine and Instagram-worthy.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowInsuranceDetails(false)}
                    className="w-full mt-4 bg-white border border-pink-600 text-pink-600 py-2 rounded-md hover:bg-pink-50 transition-colors"
                  >
                    Hide Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 