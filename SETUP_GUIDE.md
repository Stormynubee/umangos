# UmangOS - Complete Setup Guide

**Developed by Hansraj**

Follow these steps to get UmangOS running on your system.

---

## Step 1: Install Node.js

If you don't have Node.js installed:

1. Visit: https://nodejs.org/
2. Download and install the LTS version (v18 or higher)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

## Step 2: Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router
- Vite
- Tailwind CSS
- face-api.js
- TensorFlow.js
- Recharts
- Lucide React

---

## Step 3: Download Face-api.js Models (CRITICAL)

**The app will NOT work without these models!**

### Option A: Manual Download

1. Visit: https://github.com/vladmandic/face-api/tree/master/model
2. Download ALL files from the model directory
3. Place them in: `public/models/`

### Required Files:
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`
- `face_landmark_68_model-weights_manifest.json`
- `face_landmark_68_model-shard1`
- `face_recognition_model-weights_manifest.json`
- `face_recognition_model-shard1`
- `face_recognition_model-shard2`
- `face_expression_model-weights_manifest.json`
- `face_expression_model-shard1`

### Option B: Using Git (if you have git installed)

```bash
git clone https://github.com/vladmandic/face-api.git temp-models
xcopy temp-models\model\* public\models\ /E /Y
rmdir /S /Q temp-models
```

---

## Step 4: Run the Application

### Development Mode

```bash
npm run dev
```

The app will open at: `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

---

## Step 5: Grant Permissions

When the app loads:

1. **Splash Screen** - Shows for 3 seconds
2. **Permission Screen** - Click "Grant Permissions"
3. **Browser Prompt** - Allow camera and microphone access
4. **Dashboard** - Start using UmangOS!

---

## Troubleshooting

### Issue: "Models not loading"
**Solution:** Ensure all model files are in `public/models/` directory

### Issue: "Camera not working"
**Solution:** 
- Use Chrome or Edge browser
- Check browser permissions
- Ensure you're on HTTPS or localhost

### Issue: "npm install fails"
**Solution:**
```bash
npm cache clean --force
npm install
```

### Issue: "Port 3000 already in use"
**Solution:** Edit `vite.config.js` and change the port number

---

## Browser Requirements

- **Chrome/Edge**: ✅ Full support (Recommended)
- **Firefox**: ✅ Works well
- **Safari**: ⚠️ Limited support (use Chrome/Edge)

---

## System Requirements

- **OS**: Windows 10/11, macOS, Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Camera**: Any webcam
- **Microphone**: Built-in or external
- **Internet**: Required only for initial setup (downloading models)

---

## Features You'll Get

✅ Real-time facial emotion detection (7 emotions)  
✅ Voice emotion analysis with waveform  
✅ Multimodal emotion fusion (28+ states)  
✅ Live dashboards with charts  
✅ 100% browser-based (no backend)  
✅ Complete privacy (no data upload)  

---

## Quick Start Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Models downloaded to `public/models/`
- [ ] App running (`npm run dev`)
- [ ] Camera/mic permissions granted
- [ ] Enjoying UmangOS!

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all model files are present
3. Check browser console for errors
4. Try a different browser (Chrome recommended)

---

**UmangOS** - Developed by Hansraj  
Privacy-First Wellbeing System for Students and Teachers
