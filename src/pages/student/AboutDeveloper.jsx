import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Code, Brain, Palette, Cpu, Heart, Sparkles, Eye, Mic, Database, Zap, Monitor, GitBranch } from 'lucide-react'

const AnimatedText = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const GlassCard = ({ icon: Icon, title, description, delay = 0, color = "blue" }) => {
  const colorMap = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-400/30 hover:border-blue-400/60",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/60",
    green: "from-green-500/20 to-emerald-500/20 border-green-400/30 hover:border-green-400/60",
    orange: "from-orange-500/20 to-red-500/20 border-orange-400/30 hover:border-orange-400/60",
    teal: "from-teal-500/20 to-cyan-500/20 border-teal-400/30 hover:border-teal-400/60",
    pink: "from-pink-500/20 to-rose-500/20 border-pink-400/30 hover:border-pink-400/60"
  }

  const colorClass = colorMap[color] || colorMap.blue

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -8 }}
      className={'relative backdrop-blur-xl bg-gradient-to-br ' + colorClass + ' border-2 rounded-2xl p-6 overflow-hidden group cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl'}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-14 h-14 mb-4 bg-white/10 rounded-xl flex items-center justify-center"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

const ToolBadge = ({ name, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 cursor-pointer"
    >
      {name}
    </motion.div>
  )
}

function AboutDeveloper() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.3), transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 space-y-32">
        
        <motion.section 
          style={{ opacity: heroOpacity }}
          className="min-h-screen flex flex-col items-center justify-center text-center space-y-8"
        >
          <AnimatedText delay={0.2}>
            <motion.h1 
              className="text-7xl md:text-8xl font-black text-white mb-4"
              style={{
                textShadow: '0 0 60px rgba(99, 102, 241, 0.5), 0 0 100px rgba(168, 85, 247, 0.3)',
              }}
            >
              About the Developer
            </motion.h1>
          </AnimatedText>

          {/* Developer Photo with Premium Animations */}
          <AnimatedText delay={0.3}>
            <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'linear-gradient(45deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)', filter: 'blur(20px)' }} />
              <motion.div className="absolute -inset-4 rounded-full opacity-75" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ background: 'conic-gradient(from 0deg, rgb(102, 126, 234), rgb(118, 75, 162), rgb(240, 147, 251), rgb(102, 126, 234))', filter: 'blur(10px)' }} />
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <motion.div className="absolute inset-0 rounded-full p-1" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} style={{ background: 'linear-gradient(45deg, rgb(102, 126, 234), rgb(118, 75, 162), rgb(240, 147, 251), rgb(79, 172, 254))' }}>
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 p-2">
                    <motion.img src="/developer-photo.jpg" alt="Hansraj Tiwari" className="w-full h-full rounded-full object-cover shadow-2xl" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} />
                  </div>
                </motion.div>
                {[0,1,2,3,4,5,6,7].map((i) => (
                  <motion.div key={i} className="absolute w-2 h-2 bg-white rounded-full" style={{ top: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`, left: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%` }} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
              <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-300 animate-pulse" />
              <Sparkles className="absolute -bottom-4 -left-4 w-10 h-10 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <div className="space-y-2">
          Umang OS - A comprehensive student wellbeing and academic platform. Developed by Hansraj Tiwari
              <div className="flex items-center justify-center gap-3 text-xl text-white/70">
                <span>Student</span>
                <span>Ã¢â‚¬Â¢</span>
                <span>Product Architect</span>
                <span>Ã¢â‚¬Â¢</span>
                <span>AI & System Designer</span>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12"
            >
              <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
            </motion.div>
          </AnimatedText>
        </motion.section>

        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border-2 border-white/10 rounded-3xl p-12 space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl leading-relaxed text-white/90 font-light"
            >
              I am a <span className="font-bold text-white">PCM student</span> with over{' '}
              <span className="font-bold text-blue-400">6 years of hands-on experience</span> in development, 
              design, and system building.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-2xl leading-relaxed text-white/90 font-light"
            >
              <span className="font-bold text-purple-400">Umang OS</span> is not just an application â€” it is the result of years of experimentation in{' '}
              <span className="font-bold text-white">AI, student wellbeing, academic systems,</span> and{' '}
              <span className="font-bold text-white">human-centric design.</span>
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-5xl font-black text-white text-center mb-16">Philosophy & Work</h2>
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30 rounded-3xl p-12">
            <p className="text-2xl leading-relaxed text-white/90 font-light text-center">
              I have independently <span className="font-bold text-white">designed, developed, and tested</span> Umang OS by combining{' '}
              <span className="font-bold text-blue-400">software engineering</span>,{' '}
              <span className="font-bold text-purple-400">artificial intelligence</span>,{' '}
              <span className="font-bold text-green-400">hardware integration</span>, and{' '}
              <span className="font-bold text-pink-400">visual design</span> into a single institutional ecosystem.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-5xl font-black text-white text-center mb-16">Core Areas of Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard 
              icon={Eye}
              title="AI Emotion Detection"
              description="Face, voice, and behavior analysis using DeepFace, MediaPipe, and advanced ML models"
              delay={0.1}
              color="blue"
            />
            <GlassCard 
              icon={Heart}
              title="Student Wellbeing"
              description="Mental health monitoring, productivity analysis, and personalized support systems"
              delay={0.2}
              color="pink"
            />
            <GlassCard 
              icon={Monitor}
              title="Academic Dashboards"
              description="Comprehensive interfaces for students, teachers, and institutional management"
              delay={0.3}
              color="purple"
            />
            <GlassCard 
              icon={Cpu}
              title="Local AI Systems"
              description="Privacy-focused, offline-capable AI using Ollama and custom models"
              delay={0.4}
              color="green"
            />
            <GlassCard 
              icon={Zap}
              title="Hardware Integration"
              description="Arduino-powered desk assistants with real-time sensors and gesture control"
              delay={0.5}
              color="orange"
            />
            <GlassCard 
              icon={GitBranch}
              title="System Architecture"
              description="Research documentation, scalable design patterns, and technical specifications"
              delay={0.6}
              color="teal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-5xl font-black text-white text-center mb-16">Technologies & Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="backdrop-blur-xl bg-white/5 border-2 border-blue-400/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-400" />
                <h3 className="text-3xl font-bold text-white">Programming & AI</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Python', 'JavaScript', 'C/C++', 'DeepFace', 'MediaPipe', 'FER', 'Librosa', 'SoundDevice', 'SciPy', 'Ollama (Local AI)', 'OpenAI', 'HuggingFace', 'Streamlit', 'Tkinter', 'React', 'SQLite'].map((tool, i) => (
                  <ToolBadge key={tool} name={tool} delay={i * 0.05} />
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border-2 border-green-400/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-8 h-8 text-green-400" />
                <h3 className="text-3xl font-bold text-white">Hardware & Systems</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Arduino', 'Serial Communication', 'Real-time Sensors', 'Gesture Recognition', 'Embedded Systems'].map((tool, i) => (
                  <ToolBadge key={tool} name={tool} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-5xl font-black text-white text-center mb-8">Graphic Design & Creative Tools</h2>
          <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-400/30 rounded-3xl p-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Palette className="w-10 h-10 text-pink-400" />
              <h3 className="text-3xl font-bold text-white">Design Arsenal</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Figma', 'Canva', 'Blender', 'Inkscape', 'CorelDRAW'].map((tool, i) => (
                <ToolBadge key={tool} name={tool} delay={i * 0.05} />
              ))}
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl leading-relaxed text-white/90 text-center font-light"
            >
              Every visual element in <span className="font-bold text-white">Umang OS</span> � UI layouts, dashboards, logos, posters,
              pitch visuals, QR designs, and system diagrams � is{' '}
              <span className="font-bold text-pink-400">personally designed</span> to ensure{' '}
              <span className="font-bold text-white">clarity, accessibility, and impact.</span>
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            <h2 className="text-6xl font-black text-white mb-8">Vision</h2>
            <p className="text-3xl leading-relaxed text-white/90 font-light max-w-4xl">
              Umang OS is built with a single goal: to{' '}
              <span className="font-bold text-blue-400">humanize education</span> by combining{' '}
              <span className="font-bold text-purple-400">emotional intelligence</span>,{' '}
              <span className="font-bold text-green-400">technology</span>, and{' '}
              <span className="font-bold text-pink-400">academic structure</span> into one unified{' '}
              <span className="font-bold text-white">operating system for institutions.</span>
            </p>
          </motion.div>
        </AnimatedSection>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-white/10"
        >
          <p className="text-white/60 text-lg font-medium">
          Umang OS - A comprehensive student wellbeing and academic platform. Developed by Hansraj Tiwari
          </p>
        </motion.footer>

      </div>
    </div>
  )
}

export default AboutDeveloper
