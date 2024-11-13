'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { FaSmile, FaMeh, FaSadTear } from 'react-icons/fa'

export function BlockPage() {
  const [action, setAction] = useState('')
  const [regretScore, setRegretScore] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateRegret = async () => {
    if (!action.trim()) return
    
    setIsCalculating(true)
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    const score = Math.floor(Math.random() * 101)
    setRegretScore(score)
    setIsCalculating(false)
  }

  const getRegretMessage = (score: number) => {
    if (score < 30) return { 
      message: 'No regrets... probably.',
      icon: <FaSmile className="text-3xl text-green-500" />
    }
    if (score < 60) return { 
      message: 'Medium chance of regret—proceed with caution!',
      icon: <FaMeh className="text-3xl text-yellow-500" />
    }
    return { 
      message: 'High chance of regret—think again!',
      icon: <FaSadTear className="text-3xl text-red-500" />
    }
  }

  const resetCalculator = () => {
    setAction('')
    setRegretScore(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Regret-o-Meter
          </CardTitle> 
          <CardDescription className="text-center text-lg">
            Calculate your potential regret before it happens!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="action">What are you thinking of doing?</Label>
            <Input
              id="action"
              placeholder="e.g., neon green mohawk..."
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            onClick={calculateRegret}
            disabled={isCalculating || !action.trim()}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Regret'}
          </Button>

          <AnimatePresence mode="wait">
            {regretScore !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-muted rounded-lg text-center space-y-4"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                    {regretScore}% Regret Score
                  </span>
                  {getRegretMessage(regretScore).icon}
                </div>
                <p className="text-xl">{getRegretMessage(regretScore).message}</p>
                <Button 
                  variant="outline" 
                  onClick={resetCalculator}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/insurance">
            <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
              Get Insurance Instead
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}