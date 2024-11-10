import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-purple-50 to-pink-50">
      <main className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Pachta-wah!
        </h1>
        
        <p className="text-lg text-gray-600">
          Every Pachta-wah gets a second chance!
        </p>

        <div className="grid gap-6 mt-12 md:grid-cols-3">
          <Link 
            href="/regret-o-meter"
            className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-purple-200"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              Try Pachta-wah!
            </h2>
            <p className="text-gray-600 text-sm">
              Calculate your potential regret before it happens!
            </p>
          </Link>

          <Link 
            href="/regret-insurance"
            className="transform transition-all duration-300 hover:scale-105 hover:rotate-1 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-pink-200"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">
              Get Pachta-wah Insurance
            </h2>
            <p className="text-gray-600 text-sm">
              Protect yourself against future regrets!
            </p>
          </Link>

          <Link 
            href="/regret-therapy"
            className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl border-2 border-purple-200"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              Book Pachta-wah Therapy
            </h2>
            <p className="text-gray-600 text-sm">
              Professional help for your regrettable decisions
            </p>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Don&apos;t worry about regretting these buttons - they&apos;re fully refundable!</p>
        </div>
      </main>
    </div>
  )
}
