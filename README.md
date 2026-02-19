<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🖱️ Pixel Click

Generate custom pixel art cursor sets using AI! Create unique, retro-style cursors for your desktop with just a text prompt.

## ✨ Features

- 🎨 **AI-Powered Generation**: Uses Google Gemini to create pixel art cursors
- 🖱️ **5 Cursor States**: Normal, pointing, loading, clicking, and typing cursors
- 🎮 **Retro Aesthetic**: Beautiful pixel art style with cozy colors
- 🧪 **Live Preview**: Test your cursors before downloading
- 💾 **Easy Export**: Download as PNG or ZIP files

## 🚀 Live Demo

Visit: **https://huxyay.github.io/Pixel-Click/**

## 🛠️ Run Locally

**Prerequisites:** Node.js (v16+)

1. **Clone the repository**
   ```bash
   git clone https://github.com/huxyay/Pixel-Click.git
   cd Pixel-Click
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a free API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Click "Add API Key" and paste your Gemini API key
   - Start generating cursors!

## 📦 Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions:

1. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select:
     - **Source**: GitHub Actions

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Wait for deployment**
   - GitHub Actions will automatically build and deploy
   - Check the "Actions" tab to monitor progress
   - Your site will be live at: `https://[your-username].github.io/Pixel-Click/`

## 🎯 How to Use

1. Enter a creative prompt (e.g., "pink donut", "magical stars", "grumpy cat")
2. Click **GENERATE** and wait for AI to create your cursors
3. Preview the generated cursor set
4. Test them in the interactive area
5. Download as PNG files or ZIP package
6. Install on your system following the guide

## 🔑 API Key Storage

Your API key is stored locally in your browser's localStorage and never sent to any server except Google's Gemini API. It's completely private and secure.

## 🛡️ Content Filter

The app includes a profanity filter to keep prompts family-friendly.

## 📄 License

MIT License - Feel free to use and modify!

## 🙏 Credits

Built with:
- React + TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Lucide Icons
