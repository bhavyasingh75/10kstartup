'use client'

import { useState } from 'react'
import Link from 'next/link'

type InsuranceType = 'tattoo' | 'hairstyle' | 'life-choice' | null

export default function RegretInsurance() {
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceType>(null)
  const [showRefundMessage, setShowRefundMessage] = useState(false)

  const handleInsuranceSelect = (type: InsuranceType) => {
    setSelectedInsurance(type)
    setShowRefundMessage(false)
  }

  const handleRefund = () => {
    setShowRefundMessage(true)
  }

  const getInsuranceMessage = () => {
    switch (selectedInsurance) {
      case 'tattoo':
        return "Your temporary tattoo is now permanently insured!"
      case 'hairstyle':
        return "Your hair-raising decision is now covered!"
      case 'life-choice':
        return "Your questionable life choice is now officially someone else's problem!"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">Regret Insurance</h1>
          <p className="text-gray-600">Protect yourself against future regrets!</p>
        </div>

        <div className="space-y-4">
          {['tattoo', 'hairstyle', 'life-choice'].map((type) => (
            <button
              key={type}
              onClick={() => handleInsuranceSelect(type as InsuranceType)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedInsurance === type
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {type === 'tattoo' && "Insure my fake tattoo"}
                {type === 'hairstyle' && "Insure my extreme hairstyle"}
                {type === 'life-choice' && "Insure my questionable life choice"}
              </h3>
            </button>
          ))}
        </div>

        {selectedInsurance && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-green-800">{getInsuranceMessage()}</p>
            </div>
            
            {!showRefundMessage && (
              <button
                onClick={handleRefund}
                className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition-colors"
              >
                Get Refund
              </button>
            )}

            {showRefundMessage && (
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-blue-800">Refund processed. We told you so! 😉</p>
              </div>
            )}
          </div>
        )}

        <div className="pt-4">
          <Link 
            href="/"
            className="block w-full bg-gray-100 text-gray-600 py-3 rounded-md hover:bg-gray-200 transition-colors text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 