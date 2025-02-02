import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

const Hero = ({ setShowLogin }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const glowAnimation = {
    initial: { boxShadow: "0 0 0 rgba(255,255,255,0)" },
    animate: {
      boxShadow: ["0 0 20px rgba(255,255,255,0.2)", "0 0 40px rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.2)"],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const particlesConfig = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 160,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#000000"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false
        }
      },
      links: {
        enable: false
      },
      move: {
        enable: true,
        speed: 1,
        direction: "top",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onHover: {
          enable: true,
          mode: "bubble"
        },
        onClick: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 150,
          size: 6,
          duration: 2,
          opacity: 0.3,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    retina_detect: true,
    background: {
      color: "transparent"
    },
    fullScreen: {
      enable: false,
      zIndex: 0
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-x-hidden">
      <div className="absolute inset-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <motion.nav className="sticky top-0 px-8 py-6 flex justify-between items-center border-b border-gray-100 backdrop-blur-sm bg-white/50">
          <div className="text-black text-2xl font-bold tracking-tight flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-8 h-8 border-t-2 border-r-2 border-black rounded-full"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
              FinovateX
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 text-sm text-black bg-black/5 rounded-lg 
                     border border-black/10 hover:bg-black/10 
                     transition-colors duration-300 hover:border-black/20"
          >
            Request Access →
          </motion.button>
        </motion.nav>

        <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-8 py-4 min-h-[calc(100vh-80px)]">
          <div className="text-center space-y-4 w-full max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2 px-2 sm:px-4 md:px-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight 
                          leading-[1.3] bg-clip-text text-transparent
                          bg-gradient-to-r from-black via-black to-gray-700">
                Innovating
                <br />
                Finance & AI
              </h1>
              <div className="h-0.5 w-16 bg-gradient-to-r from-black to-gray-400 mx-auto rounded-full"/>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            >
              AI-driven analytics to track stocks, trends, and financial movements with 
              <span className="text-black font-medium"> absolute precision </span> 
              in real-time.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto px-4"
            >
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-black">98%</h3>
                <p className="text-xs sm:text-sm text-gray-600">Accuracy Rate</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-black">24/7</h3>
                <p className="text-xs sm:text-sm text-gray-600">Real-time Updates</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-black">500+</h3>
                <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <motion.button
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate="animate"
                variants={glowAnimation}
                className="px-10 py-5 bg-gradient-to-r from-black to-gray-800 
                         text-white rounded-xl font-semibold text-xl
                         transform transition-all duration-300 hover:from-gray-800 
                         hover:to-black shadow-lg"
              >
                Start Tracking Now
              </motion.button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Hero

