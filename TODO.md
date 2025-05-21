## ✅ Core Features

1. **Error boundary**
2. **Splash screen**
3. **Audio**
   - Recording
   - Playback
   - Analysis
4. **Images**
   - Pick
   - Edit
   - Display
5. **Maps, Navigation, and Location**
6. **Camera & Barcode Scanning**
7. **Sensors**
   - Gyroscope
   - Accelerometer
   - Others
8. **Push Notifications & Background Tasks**
9. **Bluetooth**
   - Requires Bare Workflow

---

## 🎧 Audio Features

- Record a voice using device microphone
- Replay the recorded voice
- Change volume dynamically
- Control playback speed
- Load and play an audio/music file from device storage (supported formats only)
- Load audio file and display its metadata (e.g., duration, status)
- Next/Previous buttons for audio playlist control
- Countdown / display remaining duration
- Pause / Resume playback
- Loop playback (repeat audio)
- Display current playback progress bar
- Upload recording to server (e.g., for sharing or storage)
- Show list of saved recordings
- Handle permissions (microphone, media library, file access)
- Display waveform of recorded/playing audio
- Extract and display audio metadata (title, artist, album)
- Equalizer / audio effects control

---

## 🔒 Security & Permissions

- [ ] Biometric auth (Face ID / Touch ID) for secure access
- [ ] Secure storage for tokens & sensitive data (`expo-secure-store`)
- [ ] Permissions handling UX (centralized and user-friendly)

---

## 🌐 Network & Data

- [ ] Offline support (e.g., React Query cache, fallback UI)
- [ ] Error/retry strategies for network failures (auto + manual)
- [ ] Background sync (using Expo background tasks or polling)
- [ ] API mocking for testing without backend (e.g., MSW)

---

## ⚙️ Performance & UX

- [ ] App startup optimization (preloading fonts/assets, lazy imports)
- ✅ Smooth animations (`react-native-reanimated`)
- [ ] Skeleton loading states (instead of spinners)
- [ ] Pagination / Infinite scroll for large lists
- ✅ Debounced input fields (search/filter)

---

## 📱 Device Integration

- ✅ Dynamic theming (light/dark mode with context or `useColorScheme`)
- [ ] In-app update prompts
- [ ] Deep linking & universal links

---

## 🧪 Testing & Dev Tools

- [ ] E2E testing setup (Detox / Playwright for Expo)
- [ ] Component-level unit tests (Jest + Testing Library)
- [ ] Storybook for React Native components
- [ ] Crash/error reporting (Sentry, Firebase Crashlytics)

---

## 📈 Analytics & Feedback

- [ ] Analytics (Firebase, Amplitude, PostHog, etc.)
- [ ] In-app feedback or bug report mechanism
- [ ] Onboarding walkthrough / coach marks for new users
