import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="projects">
        <div className="projects-header">
          <p className="section-label">Featured Projects</p>
          <h2>Recent work</h2>
        </div>

        <div className="projects-grid">
          <article className="project-card glass-panel">
            <div className="project-card-top">
              <span className="project-badge">AI &amp; MACHINE LEARNING</span>
              <span className="project-number">04</span>
            </div>
            <h3>Safe Guard Pro – AI Crime Prediction System</h3>
            <p className="project-description">
              Developed an AI-powered crime prediction and hotspot analysis platform that identifies crime-prone areas using machine learning and interactive geospatial visualization.
            </p>
            <ul className="project-tech">
              <li>Python</li>
              <li>React</li>
              <li>Flask</li>
              <li>Scikit-learn</li>
              <li>TensorFlow</li>
              <li>XGBoost</li>
              <li>SHAP</li>
              <li>Joblib</li>
              <li>Leaflet</li>
            </ul>
            <ul className="project-highlights">
              <li>Developed a crime prediction model achieving approximately 85% accuracy on 100K+ crime records.</li>
              <li>Performed data preprocessing, feature engineering, and model training using Pandas, NumPy, and Scikit-learn.</li>
              <li>Integrated machine learning models using Joblib and created REST APIs for real-time predictions.</li>
              <li>Visualized crime hotspots through interactive Leaflet maps and analytical dashboards.</li>
              <li>Built a full-stack application using React and Flask with real-time prediction capabilities.</li>
              <li>Implemented explainable AI techniques using SHAP to improve model transparency and interpretability.</li>
            </ul>
            <a
              href="https://github.com/Anbhuti/Safeguard-Pro"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub Repo
            </a>
          </article>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
