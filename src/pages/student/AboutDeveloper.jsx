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

// Redesigned AboutDeveloper Component
function AboutDeveloper() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 space-y-32">

        <motion.section
          style={{ opacity: heroOpacity }}
          className="min-h-screen flex flex-col items-center justify-center text-center space-y-12"
        >
          <AnimatedText delay={0.2}>
            <motion.h1
              className="text-7xl md:text-8xl font-bold text-white mb-4 tracking-tight"
            >
              About the Developer
            </motion.h1>
          </AnimatedText>

          {/* Developer Photo - Professional Look */}
          <AnimatedText delay={0.3}>
            <motion.div
              className="relative group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform rotate-3 opacity-50 group-hover:rotate-6 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform -rotate-3 opacity-50 group-hover:-rotate-6 transition-transform duration-500" />

                <div className="w-full h-full rounded-3xl overflow-hidden relative z-10 shadow-2xl border border-white/10">
                  <img
                    src="/developer-photo.jpg"
                    alt="Hansraj Tiwari"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatedText>

          <AnimatedText delay={0.4}>
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold text-white">Hansraj Tiwari</h2>
              <p className="text-xl text-white/60 font-light">
                Student • Product Architect • System Designer
              </p>
              <p className="text-white/80 leading-relaxed">
                Building <span className="text-blue-400 font-semibold">Umang OS</span> to revolutionize institutional wellbeing through human-centric technology.
              </p>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12"
            >
              <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
          </AnimatedText>
        </motion.section>

        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">The Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To humanize education by integrating emotional intelligence with academic structure, creating an ecosystem where technology serves student wellbeing first.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">The Work</h3>
              <p className="text-white/70 leading-relaxed">
                Combining <span className="text-blue-400">software engineering</span>, <span className="text-purple-400">AI</span>, and <span className="text-pink-400">visual design</span> to build comprehensive, intuitive, and effective institutional tools.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-4xl font-bold text-white text-center mb-16">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard
              icon={Eye}
              title="AI & ML"
              description="Emotion detection, behavior analysis, and predictive modeling using modern architectures."
              delay={0.1}
              color="blue"
            />
            <GlassCard
              icon={Heart}
              title="Wellbeing Systems"
              description="Designing for mental health, productivity tracking, and personalized support loops."
              delay={0.2}
              color="pink"
            />
            <GlassCard
              icon={GitBranch}
              title="Full-Stack Arc."
              description="Scalable system architecture, secure database design, and responsive frontend engineering."
              delay={0.3}
              color="teal"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-4xl font-bold text-white text-center mb-16">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {['Python', 'React', 'Node.js', 'DeepFace', 'MediaPipe', 'TensorFlow', 'Arduino', 'Figma', 'Adobe Suite', 'SQL', 'Git', 'System Design'].map((tool, i) => (
              <ToolBadge key={tool} name={tool} delay={i * 0.05} />
            ))}
          </div>
        </AnimatedSection>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-white/5"
        >
          <p className="text-white/40 text-sm">
            Designed & Developed by Hansraj Tiwari • Umang OS
          </p>
        </motion.footer>

      </div>
    </div>
  )
}

export default AboutDeveloper
