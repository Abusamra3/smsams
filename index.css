:root {
  --primary-color: #1a73e8;
  --primary-hover-color: #1765cc;
  --background-color: #f8f9fa;
  --card-background: #ffffff;
  --text-color: #3c4043;
  --light-text-color: #5f6368;
  --border-color: #dadce0;
  --error-color: #d93025;
  --font-family: 'Cairo', 'Roboto', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  text-align: start;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2.5rem;
}

header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

header p {
  font-size: 1.1rem;
  color: var(--light-text-color);
  margin-top: 0.5rem;
}

.card {
  background: var(--card-background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  animation: fadeIn 0.5s ease-in-out;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input,
.textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-family);
  transition: border-color 0.2s;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.file-input-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border: 2px dashed var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.file-input-label:hover {
  border-color: var(--primary-color);
  background-color: #f1f3f4;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-name {
  margin-top: 0.75rem;
  font-style: italic;
  color: var(--light-text-color);
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s, box-shadow 0.2s;
  background-color: var(--primary-color);
  color: white;
}

.btn:hover:not(:disabled) {
  background-color: var(--primary-hover-color);
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);
}

.btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  color: #9e9e9e;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--primary-color);
  animation: spin 1s ease infinite;
}

.loader-overlay p {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--text-color);
}

.error-message {
  color: var(--error-color);
  background-color: #fce8e6;
  border: 1px solid var(--error-color);
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1.5rem;
  text-align: center;
}

.question-item {
  margin-bottom: 2rem;
}

.question-item p {
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.result-score {
  text-align: center;
  margin-bottom: 2rem;
}

.result-score-display {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    var(--primary-color) 0deg,
    var(--primary-color) var(--score-angle, 0deg),
    #e0e0e0 var(--score-angle, 0deg),
    #e0e0e0 360deg
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: --score-angle 1s ease-in-out;
}

.result-score-display .score {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.result-score-display .total {
  font-size: 1rem;
  color: var(--light-text-color);
}

.result-justification {
  background: #f1f3f4;
  border-inline-start: 4px solid var(--primary-color);
  padding: 1rem 1.5rem;
  border-radius: 4px;
}

.ai-detection-note {
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  color: var(--light-text-color);
  font-size: 0.9rem;
}

.ai-detection-note strong {
    color: var(--text-color);
}

.lang-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.lang-btn {
  padding: 0.5rem 1.5rem;
  border: 1px solid var(--border-color);
  background-color: transparent;
  cursor: pointer;
  color: var(--text-color);
  font-family: var(--font-family);
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s;
}

.lang-btn:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right-width: 0.5px;
}

html[dir="rtl"] .lang-btn:first-child {
  border-radius: 0 4px 4px 0;
  border-left-width: 0.5px;
  border-right-width: 1px;
}

.lang-btn:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left-width: 0.5px;
}

html[dir="rtl"] .lang-btn:last-child {
    border-radius: 4px 0 0 4px;
    border-right-width: 0.5px;
    border-left-width: 1px;
}

.lang-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.lang-btn:not(.active):hover {
    background-color: #f1f3f4;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  body {
    padding: 10px;
  }
  .container {
    padding: 1rem;
  }
  header h1 {
    font-size: 2rem;
  }
}
