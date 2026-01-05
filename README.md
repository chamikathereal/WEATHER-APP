<div align="center">

  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTlxYmx4YjZ4YjZ4YjZ4YjZ4YjZ4YjZ4YjZ4YjZ4YjZ4/3o7rc0qU6m5maIgg4o/giphy.gif" width="100" alt="Weather Animation">

  <h1 style="font-size: 3rem; font-weight: 900; color: #61DAFB; margin-bottom: -10px;">
    The Ultimate Weather App
  </h1>
  
  <p style="font-size: 1.2rem; font-style: italic; color: #888;">
    "Where Engineering Precision Meets Aesthetic Perfection."
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  </p>

  <a href="https://weather-forecast-lk.vercel.app">
    <img src="https://img.shields.io/badge/🔴_View_Live_Demo-FF0000?style=for-the-badge&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/chamikathereal/WEATHER-APP/issues">
    <img src="https://img.shields.io/badge/🐞_Report_Bug-F44336?style=for-the-badge" alt="Report Bug">
  </a>
  <a href="https://github.com/chamikathereal/WEATHER-APP/issues">
    <img src="https://img.shields.io/badge/✨_Request_Feature-FF9800?style=for-the-badge" alt="Request Feature">
  </a>

</div>

<br />

<div align="center">
  <h2>🎬 The Cinematic Build</h2>
  <p>Witness the code come to life. From empty file to production masterpiece.</p>
  
  [![Watch the video](https://img.youtube.com/vi/skLX6YZyfh8/maxresdefault.jpg)](https://youtu.be/skLX6YZyfh8)
</div>

---

## 🔮 The Vision

This isn't just a weather app; it's a **statement piece** for modern frontend development. By leveraging **Glassmorphism**, the interface floats above dynamic backgrounds with a frosted-glass aesthetic, changing moods based on real-time weather data.

> **Performance Metric:** Powered by a robust **React + TypeScript** architecture, ensuring type safety, maintainability, and a lightning-fast user experience **(60 FPS)**.

### 💎 The "Wow" Factors

| Feature | Description |
| :--- | :--- |
| **🎨 Adaptive UI Engine** | The interface is alive. It shifts color palettes seamlessly—warm amber for sunny days, cool slate for storms, and deep indigo for clear nights. |
| **⚡ Intelligent Caching** | Built with `TanStack Query`, the app caches weather data for **5 minutes**. reduces API costs and provides instant data retrieval. |
| **🧠 Context Awareness** | **Auto-Location** detects preferences, while **History Memory** remembers your last visited cities using persistent Local Storage. |
| **🚀 Zero Layout Shift** | Custom **Skeleton Loaders** mimic the final UI perfectly, preventing jarring layout jumps while data fetches. |

---

## 🛠️ The Arsenal (Tech Stack)

<div align="center">

| Domain | Tech | Why? |
| :--- | :---: | :--- |
| **Core** | ![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB) | The gold standard for UI. |
| **Typing** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Bug-resistant code. |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first glassmorphism. |
| **State** | ![TanStack](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=react-query&logoColor=white) | Server state management. |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide_React-F75C7E?style=flat&logo=lucide&logoColor=white) | Consistent iconography. |
| **SEO** | ![Helmet](https://img.shields.io/badge/React_Helmet-000?style=flat&logo=react&logoColor=white) | Dynamic meta tags. |
| **Deploy** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Global edge network. |

</div>

---

## 🏗️ Project Architecture

A clean, modular structure designed for scalability.

```bash
WEATHER-APP/
├── 📂 public/              # Favicons, Manifest, OG Images
├── 📂 src/
│   ├── 📂 components/      # 🧩 Reusable UI Blocks
│   │   ├── CityCard.tsx
│   │   ├── CityHeader.tsx
│   │   ├── CitySkeleton.tsx
│   │   ├── ExtendedForecast.tsx
│   │   ├── Footer.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── MainWeatherCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SkeletonCard.tsx
│   │   └── StatsDisplay.tsx
│   ├── 📂 extra/           # 🛠️ Utilities & API
│   │   ├── Api.ts          # OpenWeatherMap Endpoints
│   │   └── weatherUtils.ts # Gradient generators & Logic
│   ├── 📂 images/          # 🖼️ Static Assets
│   │   ├── home-bg.jpg
│   │   └── profile.jpg
│   ├── 📂 pages/           # 📄 Application Views
│   │   ├── Home.tsx        # Dashboard & Search
│   │   └── City.tsx        # Detailed Analytics
│   ├── App.tsx             # Root Component
│   └── index.tsx           # Entry Point & Providers
├── .env                    # Secrets
└── tailwind.config.js      # Design System

```

---

## 🧠 Leveling Up: Learning Outcomes

Building this project was a deep dive into advanced React patterns.

* [x] **Hook Mastery:** Deep implementation of `useMemo` and `useCallback` for referential stability.
* [x] **Type Safety:** Moving beyond `any` with strict interfaces (`WeatherData`, `ForecastData`).
* [x] **CSS Alchemy:** Pushing Tailwind to limits with arbitrary values and backdrop filters.
* [x] **CI/CD Ops:** Automated deployment pipelines with Vercel.

---

## 🚀 Getting Started

Ready to run this on your machine?

**1. Clone the Repository**

```bash
git clone [https://github.com/chamikathereal/WEATHER-APP.git](https://github.com/chamikathereal/WEATHER-APP.git)
cd WEATHER-APP

```

**2. Install Dependencies**

```bash
yarn install

```

**3. Configure Environment**
Create a `.env` file in the root directory:

```env
REACT_APP_WEATHER_API_KEY=your_openweather_api_key

```

**4. Ignite the Server**

```bash
yarn start

```
## 🧑‍💻 Author

<div align="center">

  <img src="https://github.com/chamikathereal.png" width="120px" style="border-radius: 50%; border: 4px solid #61DAFB; box-shadow: 0 0 20px rgba(97, 218, 251, 0.6);" alt="Chamika Gayashan">

  ### **Chamika Gayashan**
  *Undergraduate Software Engineer | Sri Lanka*
  
  > *"Code is poetry, and I'm just trying to make it rhyme."* 🚀

  <p>
    <a href="https://www.linkedin.com/in/chamikathereal">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
    <a href="https://github.com/chamikathereal">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://medium.com/@chamikathereal">
      <img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium">
    </a>
  </p>
  <p>
    <a href="https://www.instagram.com/chamikathereal/">
      <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
    </a>
    <a href="https://www.facebook.com/chamikathereaI">
      <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook">
    </a>
  </p>

  <br />

  <code>Last Updated: Saturday, July 05, 2025, 10:48 AM +0530</code>

</div>

---

<p align="center">
  <sub>Built with ❤️ and ☕ by Chamika Gayashan. Star this repo if you found it useful! ⭐</sub>
</p>
