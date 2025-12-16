import React, { useState } from 'react'
import { Award, Trophy, Flame, Star, TrendingUp, Target, Zap, Crown, Medal, Gift } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function GamificationPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const userStats = {
    level: 12,
    currentXP: 2450,
    xpToNextLevel: 3000,
    totalXP: 15450,
    rank: 3,
    totalStudents: 150,
    streaks: {
      current: 7,
      longest: 21
    }
  }

  const badges = [
    {
      id: 1,
      name: 'Perfect Attendance',
      description: 'Attended 30 consecutive days',
      icon: '??',
      rarity: 'gold',
      earned: true,
      earnedDate: '2025-12-01',
      progress: 100
    },
    {
      id: 2,
      name: 'Top Scorer',
      description: 'Scored 95% or above in 5 tests',
      icon: '??',
      rarity: 'legendary',
      earned: true,
      earnedDate: '2025-11-15',
      progress: 100
    },
    {
      id: 3,
      name: 'Study Warrior',
      description: 'Complete 100 study sessions',
      icon: '??',
      rarity: 'epic',
      earned: true,
      earnedDate: '2025-10-20',
      progress: 100
    },
    {
      id: 4,
      name: 'Early Bird',
      description: 'Study before 7 AM for 15 days',
      icon: '??',
      rarity: 'rare',
      earned: false,
      progress: 60,
      current: 9,
      target: 15
    },
    {
      id: 5,
      name: 'Assignment Ace',
      description: 'Submit 20 assignments on time',
      icon: '??',
      rarity: 'rare',
      earned: false,
      progress: 85,
      current: 17,
      target: 20
    },
    {
      id: 6,
      name: 'Focus Champion',
      description: 'Complete 50 Pomodoro sessions',
      icon: '??',
      rarity: 'epic',
      earned: false,
      progress: 72,
      current: 36,
      target: 50
    },
    {
      id: 7,
      name: 'All-rounder',
      description: 'Score above 80% in all subjects',
      icon: '?',
      rarity: 'legendary',
      earned: false,
      progress: 40,
      current: 2,
      target: 5
    },
    {
      id: 8,
      name: 'Helper',
      description: 'Help 10 classmates with doubts',
      icon: '??',
      rarity: 'common',
      earned: true,
      earnedDate: '2025-11-28',
      progress: 100
    }
  ]

  const achievements = [
    { id: 1, title: 'Reached Level 10', xp: 500, date: '2025-11-20', icon: '???' },
    { id: 2, title: '7-Day Study Streak', xp: 200, date: '2025-12-10', icon: '??' },
    { id: 3, title: 'Perfect Test Score', xp: 300, date: '2025-12-05', icon: '??' },
    { id: 4, title: 'Completed 50 Assignments', xp: 400, date: '2025-11-30', icon: '?' }
  ]

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', level: 15, xp: 18500, avatar: 'S' },
    { rank: 2, name: 'Michael Brown', level: 13, xp: 16200, avatar: 'M' },
    { rank: 3, name: 'You', level: 12, xp: 15450, avatar: 'Y', isCurrentUser: true },
    { rank: 4, name: 'Emma Wilson', level: 12, xp: 15100, avatar: 'E' },
    { rank: 5, name: 'David Lee', level: 11, xp: 14800, avatar: 'D' },
    { rank: 6, name: 'Olivia Taylor', level: 11, xp: 14200, avatar: 'O' },
    { rank: 7, name: 'James Anderson', level: 10, xp: 13500, avatar: 'J' },
    { rank: 8, name: 'Sophia Martinez', level: 10, xp: 13200, avatar: 'S' }
  ]

  const streakCalendar = [
    { day: 1, completed: true },
    { day: 2, completed: true },
    { day: 3, completed: true },
    { day: 4, completed: true },
    { day: 5, completed: true },
    { day: 6, completed: true },
    { day: 7, completed: true },
    { day: 8, completed: false },
    { day: 9, completed: false },
    { day: 10, completed: false }
  ]

  const rewards = [
    { id: 1, name: 'Profile Theme', cost: 500, icon: '??', unlocked: true },
    { id: 2, name: 'Custom Badge', cost: 1000, icon: '??', unlocked: true },
    { id: 3, name: 'Avatar Frame', cost: 1500, icon: '???', unlocked: false },
    { id: 4, name: 'Special Title', cost: 2000, icon: '??', unlocked: false }
  ]

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-500 to-orange-500'
      case 'epic': return 'from-purple-500 to-pink-500'
      case 'rare': return 'from-blue-500 to-cyan-500'
      case 'gold': return 'from-yellow-600 to-yellow-400'
      default: return 'from-gray-500 to-gray-400'
    }
  }

  const getRarityBorder = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'border-yellow-500 shadow-yellow-500/50'
      case 'epic': return 'border-purple-500 shadow-purple-500/50'
      case 'rare': return 'border-blue-500 shadow-blue-500/50'
      case 'gold': return 'border-yellow-600 shadow-yellow-600/50'
      default: return 'border-gray-500'
    }
  }

  const levelProgress = (userStats.currentXP / userStats.xpToNextLevel) * 100

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Achievements & Rewards</h1>
              <p className="text-white/70 text-lg">Track your progress and earn rewards</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-sm">Developed by Hansraj</p>
          </div>
        </div>

        {/* User Progress Card */}
        <div className="glass-effect rounded-2xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Level & XP */}
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={levelProgress}
                  text={`Lv ${userStats.level}`}
                  styles={buildStyles({
                    textSize: '20px',
                    pathColor: '#f59e0b',
                    textColor: '#fff',
                    trailColor: 'rgba(255,255,255,0.1)'
                  })}
                />
              </div>
              <div>
                <p className="text-white/70 text-sm">Current Level</p>
                <p className="text-2xl font-bold text-white">{userStats.level}</p>
                <p className="text-white/60 text-xs">{userStats.currentXP} / {userStats.xpToNextLevel} XP</p>
              </div>
            </div>

            {/* Rank */}
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500/20 p-4 rounded-xl">
                <Crown className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Class Rank</p>
                <p className="text-2xl font-bold text-purple-400">#{userStats.rank}</p>
                <p className="text-white/60 text-xs">out of {userStats.totalStudents}</p>
              </div>
            </div>

            {/* Current Streak */}
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500/20 p-4 rounded-xl">
                <Flame className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{userStats.streaks.current} days</p>
                <p className="text-white/60 text-xs">Longest: {userStats.streaks.longest} days</p>
              </div>
            </div>

            {/* Total XP */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500/20 p-4 rounded-xl">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total XP</p>
                <p className="text-2xl font-bold text-blue-400">{userStats.totalXP.toLocaleString()}</p>
                <p className="text-white/60 text-xs">Lifetime earned</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progress to Level {userStats.level + 1}</span>
              <span className="text-white font-semibold">{Math.round(levelProgress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-effect rounded-xl p-2 border border-white/10 inline-flex">
          {[
            { key: 'overview', label: 'Overview', icon: Star },
            { key: 'badges', label: 'Badges', icon: Award },
            { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { key: 'rewards', label: 'Rewards', icon: Gift }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                selectedTab === tab.key
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4 flex items-center space-x-2">
                <Medal className="w-6 h-6 text-yellow-400" />
                <span>Recent Achievements</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map(achievement => (
                  <div key={achievement.id} className="bg-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-white/10 transition-all">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{achievement.title}</h4>
                      <p className="text-white/60 text-sm">{achievement.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold">+{achievement.xp}</p>
                      <p className="text-white/60 text-xs">XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Calendar */}
            <div className="glass-effect rounded-2xl p-6 border border-orange-500/30 bg-orange-500/5">
              <h3 className="text-white font-semibold text-xl mb-4 flex items-center space-x-2">
                <Flame className="w-6 h-6 text-orange-400" />
                <span>Study Streak</span>
              </h3>
              <div className="flex items-center space-x-3 mb-4">
                {streakCalendar.map(day => (
                  <div
                    key={day.day}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all ${
                      day.completed
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
              <p className="text-white/80">
                Keep studying daily to maintain your streak! Current streak: <span className="text-orange-400 font-bold">{userStats.streaks.current} days</span>
              </p>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {selectedTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`glass-effect rounded-2xl p-6 border-2 transition-all hover:scale-105 ${
                  badge.earned 
                    ? getRarityBorder(badge.rarity) + ' shadow-lg'
                    : 'border-white/10 opacity-60'
                }`}
              >
                <div className="text-center space-y-3">
                  <div className={`text-6xl ${badge.earned ? 'animate-pulse' : 'grayscale'}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{badge.name}</h4>
                    <p className="text-white/60 text-sm mt-1">{badge.description}</p>
                  </div>
                  
                  {badge.earned ? (
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`}>
                        {badge.rarity.toUpperCase()}
                      </span>
                      <p className="text-white/60 text-xs mt-2">Earned on {badge.earnedDate}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(badge.rarity)}`}
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <p className="text-white/70 text-sm">
                        {badge.current} / {badge.target} ({badge.progress}%)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <div className="glass-effect rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-xl mb-6">Class Leaderboard</h3>
            <div className="space-y-3">
              {leaderboard.map(student => (
                <div
                  key={student.rank}
                  className={`rounded-xl p-4 flex items-center space-x-4 transition-all ${
                    student.isCurrentUser
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`text-2xl font-bold ${
                    student.rank === 1 ? 'text-yellow-400' :
                    student.rank === 2 ? 'text-gray-400' :
                    student.rank === 3 ? 'text-orange-600' :
                    'text-white/70'
                  }`}>
                    #{student.rank}
                  </div>
                  
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    student.isCurrentUser
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                  }`}>
                    {student.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{student.name}</h4>
                    <p className="text-white/60 text-sm">Level {student.level}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">{student.xp.toLocaleString()}</p>
                    <p className="text-white/60 text-xs">Total XP</p>
                  </div>
                  
                  {student.rank <= 3 && (
                    <div className="text-3xl">
                      {student.rank === 1 ? '??' : student.rank === 2 ? '??' : '??'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {selectedTab === 'rewards' && (
          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-4 border border-blue-500/30 bg-blue-500/5">
              <p className="text-center text-white">
                <span className="text-white/70">Your XP Balance: </span>
                <span className="font-bold text-blue-400 text-2xl">{userStats.totalXP.toLocaleString()}</span>
                <span className="text-white/70"> XP</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map(reward => (
                <div
                  key={reward.id}
                  className={`glass-effect rounded-2xl p-6 border transition-all ${
                    reward.unlocked
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-white/10 hover:scale-105'
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className="text-6xl">{reward.icon}</div>
                    <div>
                      <h4 className="text-white font-bold">{reward.name}</h4>
                      <p className="text-yellow-400 font-semibold mt-2">{reward.cost} XP</p>
                    </div>
                    
                    {reward.unlocked ? (
                      <span className="inline-block px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-semibold">
                        Unlocked ?
                      </span>
                    ) : (
                      <button
                        disabled={userStats.totalXP < reward.cost}
                        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                          userStats.totalXP >= reward.cost
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                            : 'bg-white/10 text-white/50 cursor-not-allowed'
                        }`}
                      >
                        {userStats.totalXP >= reward.cost ? 'Unlock' : 'Insufficient XP'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamificationPage
