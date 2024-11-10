'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegretTherapy() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [isBooked, setIsBooked] = useState(false)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (date && time) {
      setIsBooked(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">
            Book Your Regret Therapy Session!
          </h1>
          <p className="text-gray-600">Where laughter is the best medicine</p>
        </div>

        {!isBooked ? (
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your therapy date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Select a time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800 italic">
                Caution: Side effects may include laughter, relief, and the urge to make more questionable decisions.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              Book Now
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <p className="text-green-800 text-lg font-medium mb-2">
                You&apos;re booked!
              </p>
              <p className="text-green-600">
                Prepare to laugh it off with our comedian-therapist.
              </p>
              <div className="mt-4 text-sm text-green-700">
                <p>Date: {new Date(date).toLocaleDateString()}</p>
                <p>Time: {time}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBooked(false)
                setDate('')
                setTime('')
              }}
              className="w-full bg-purple-100 text-purple-600 py-3 rounded-md hover:bg-purple-200 transition-colors"
            >
              Book Another Session
            </button>
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