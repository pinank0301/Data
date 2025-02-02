import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Zap } from "lucide-react"

function LoginForm({ setShowLogin }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-800 mb-6">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-2"
        >
          Welcome to FinovateX
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          Manage your finances smarter, faster, better
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors"
            >
              Sign In
            </motion.button>
          </form>
          
          <motion.button
            onClick={() => setShowLogin(false)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full mt-4 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium 
                     hover:bg-gray-200 transition-colors text-sm"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginForm

