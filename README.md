# UmangOS

**Developed by Hansraj**

A fully functional, privacy-first, browser-based Student–Teacher Wellbeing & Institutional Operating System with real-time emotion detection.

## Features

✅ **Real Camera Access** - Live webcam feed with face tracking  
✅ **Facial Emotion Detection** - Using face-api.js (TensorFlow.js)  
✅ **Voice Emotion Analysis** - Web Audio API for real-time voice stress detection  
✅ **Multimodal Fusion** - Combines face + voice emotions intelligently  
✅ **Live Dashboards** - Student, Teacher, Parent, and Admin views  
✅ **100% Privacy-First** - No backend, no cloud, all processing in browser  
✅ **No Paid APIs** - Completely free and open-source  

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **face-api.js** (@vladmandic/face-api)
- **TensorFlow.js**
- **Web Audio API**
- **Recharts**
- **Lucide React Icons**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Download Face-api.js Models

**IMPORTANT:** The app requires face-api.js model files to work.

1. Visit: https://github.com/vladmandic/face-api/tree/master/model
2. Download ALL model files from the repository
3. Place them in `/public/models/` directory

Required files:
- tiny_face_detector_model-*
- face_landmark_68_model-*
- face_recognition_model-*
- face_expression_model-*

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Usage

1. **Splash Screen** - Shows UmangOS branding (2-3 seconds)
2. **Permission Screen** - Grant camera and microphone access
3. **Main Dashboard** - Choose from 4 dashboard types:
   - **Student Dashboard** - Personal wellbeing monitoring
   - **Teacher Dashboard** - Class-wide emotion trends
   - **Parent Dashboard** - Child's wellbeing summary
   - **Admin Dashboard** - Institution-wide system overview

## How It Works

### Face Emotion Detection
- Uses face-api.js with TinyFaceDetector
- Detects 7 emotions: happy, sad, angry, fearful, disgusted, surprised, neutral
- Real-time bounding box and confidence display
- Runs at 15-30 FPS depending on device

### Voice Emotion Analysis
- Captures microphone input via Web Audio API
- Analyzes volume, pitch, energy, and spectral features
- Maps audio features to emotional states
- Real-time waveform visualization

### Multimodal Fusion
- Intelligently combines face + voice emotions
- Weighted scoring (60% face, 40% voice)
- Detects emotion compatibility
- Outputs 28+ fused emotion states

## Privacy Guarantee

- ✅ All processing happens in the browser
- ✅ No data uploaded to any server
- ✅ No backend required
- ✅ No tracking or analytics
- ✅ Camera/mic streams never leave your device

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (Limited)
- ⚠️ Requires HTTPS for camera/mic access in production

## Project Structure

```
umangos/
├── public/
│   └── models/           # Face-api.js models (download separately)
├── src/
│   ├── components/       # UI components
│   │   ├── SplashScreen.jsx
│   │   ├── PermissionScreen.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── CameraView.jsx
│   ├── emotion/          # Emotion detection engines
│   │   ├── FaceEmotionEngine.js
│   │   ├── VoiceEmotionEngine.js
│   │   └── EmotionFusion.js
│   ├── dashboards/       # Dashboard views
│   │   ├── StudentDashboard.jsx
│   │   ├── TeacherDashboard.jsx
│   │   ├── ParentDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useCamera.js
│   │   └── useMicrophone.js
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Troubleshooting

### Camera/Mic not working
- Ensure you're using HTTPS (or localhost)
- Check browser permissions
- Try a different browser

### Face detection not working
- Download and place face-api.js models in `/public/models/`
- Check browser console for errors
- Ensure good lighting conditions

### Low FPS
- Use a smaller video resolution
- Close other tabs/applications
- Try a more powerful device

## Credits

**Developed by Hansraj**

Built with ❤️ for student and teacher wellbeing

## License

Open source - Free to use and modify

---

**UmangOS** - Privacy-First Wellbeing System
