<template>
  <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
    <n-layout style="height: 100vh; overflow: hidden;" :class="{ 'dark-mode': isDark }">
      <!-- Top Navigation Bar -->
      <n-layout-header bordered class="top-nav">
        <div class="nav-content">
          <div class="nav-links">
            <a @click="scrollToSection('education')" class="nav-link" :class="{ active: activeSection === 'education' }">Education</a>
            <a @click="scrollToSection('employment')" class="nav-link" :class="{ active: activeSection === 'employment' }">Employment</a>
            <a @click="scrollToSection('grants')" class="nav-link" :class="{ active: activeSection === 'grants' }">Grants</a>
            <a @click="scrollToSection('awards')" class="nav-link" :class="{ active: activeSection === 'awards' }">Awards</a>
            <a @click="scrollToSection('presentations')" class="nav-link" :class="{ active: activeSection === 'presentations' }">Presentations</a>
            <a @click="scrollToSection('publications')" class="nav-link" :class="{ active: activeSection === 'publications' }">Publications</a>
          </div>
          <div class="nav-controls">
            <n-select
              v-model:value="currentLang"
              :options="languageOptions"
              size="small"
              style="width: 120px;"
            />
            <n-button
              quaternary
              circle
              @click="toggleTheme"
              :title="isDark ? 'Light Mode' : 'Dark Mode'"
            >
              <template #icon>
                <n-icon>
                  <sunny-outline v-if="isDark" />
                  <moon-outline v-else />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </n-layout-header>

      <!-- Main Container -->
      <div class="main-container">
        <!-- Left Fixed Panel -->
        <aside class="left-fixed-panel">
          <div class="profile-section">
            <div class="photo-wrapper">
              <img :src="resumeData.personal.photo" alt="Profile Photo" class="profile-photo" />
            </div>
            <h1 class="profile-name">{{ resumeData.personal.name[currentLang] }}</h1>
            <p class="profile-title">{{ resumeData.personal.title[currentLang] }}</p>
            <p class="profile-subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>
          </div>
        </aside>

        <!-- Right Scrollable Content -->
        <main class="right-content-panel" ref="contentPanel" @scroll="handleScroll">
          <!-- Education & Employment Section -->
          <section id="education-employment" class="content-section">
            <div class="two-column-layout">
              <div class="column" id="education">
                <Education :data="resumeData.education" :lang="currentLang" />
              </div>
              <div class="column" id="employment">
                <Employment :data="resumeData.employment" :lang="currentLang" />
              </div>
            </div>
          </section>

          <!-- Grants & Awards Section -->
          <section id="grants-awards" class="content-section">
            <div class="two-column-layout">
              <div class="column" id="grants">
                <Grants :data="resumeData.grants" :lang="currentLang" />
              </div>
              <div class="column" id="awards">
                <Awards :data="resumeData.awards" :lang="currentLang" />
              </div>
            </div>
          </section>

          <!-- Presentations Section -->
          <section id="presentations" class="content-section">
            <Presentations :data="resumeData.presentations" :lang="currentLang" />
          </section>

          <!-- Publications Section -->
          <section id="publications" class="content-section">
            <h2 class="section-title">
              {{ currentLang === 'en' ? 'Publications' : '学术出版物' }}
            </h2>
            <div class="publications-list">
              <div
                v-for="(pub, index) in resumeData.publications"
                :key="index"
                class="publication-item"
              >
                <div class="pub-year-badge">{{ pub.year }}</div>
                <div class="pub-content">
                  <h4 class="pub-title">{{ pub.title }}</h4>
                  <p class="pub-authors">{{ pub.authors }}</p>
                  <p class="pub-journal">
                    <strong>{{ pub.journal }}</strong>
                    <span v-if="pub.volume"> · {{ pub.volume }}</span>
                  </p>
                  <a v-if="pub.doi" :href="pub.doi" target="_blank" class="pub-doi-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    DOI: {{ pub.doi.replace('https://doi.org/', '') }}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="content-footer">
            <p>
              {{ currentLang === 'en' ? '© 2025 Haopeng Yu. All rights reserved.' : '© 2025 余浩鹏. 版权所有.' }}
            </p>
          </footer>
        </main>
      </div>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NButton,
  NIcon,
  NSelect,
  darkTheme
} from 'naive-ui'
import {
  MoonOutline,
  SunnyOutline
} from '@vicons/ionicons5'

import resumeData from './data/resume.json'
import Education from './components/Education.vue'
import Employment from './components/Employment.vue'
import Grants from './components/Grants.vue'
import Awards from './components/Awards.vue'
import Presentations from './components/Presentations.vue'

// State
const currentLang = ref('en')
const isDark = ref(false)
const selectedPublication = ref(null)
const contentPanel = ref(null)
const activeSection = ref('education')

// Language options
const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '中文', value: 'cn' }
]

// Theme
const themeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    borderRadius: '12px'
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section && contentPanel.value) {
    const offset = section.offsetTop - contentPanel.value.offsetTop
    contentPanel.value.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  if (!contentPanel.value) return

  const sections = ['education', 'employment', 'grants', 'awards', 'presentations', 'publications']
  const scrollPosition = contentPanel.value.scrollTop + 100

  for (const sectionId of sections) {
    const section = document.getElementById(sectionId)
    if (section) {
      const sectionTop = section.offsetTop - contentPanel.value.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection.value = sectionId
        break
      }
    }
  }
}
</script>

<style scoped>
/* Global Variables - New Color Scheme */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border-color: #e5e7eb;
  --accent-primary: #0ea5e9;
  --accent-secondary: #8b5cf6;
  --accent-tertiary: #ec4899;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.dark-mode {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --border-color: #334155;
  --accent-primary: #38bdf8;
  --accent-secondary: #a78bfa;
  --accent-tertiary: #f472b6;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}

/* Top Navigation */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

.nav-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.nav-link:hover {
  color: var(--accent-primary);
  background: var(--bg-secondary);
}

.nav-link.active {
  color: var(--accent-primary);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: var(--accent-primary);
  border-radius: 2px;
}

.nav-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Main Container */
.main-container {
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 60px);
  overflow: hidden;
}

/* Left Fixed Panel */
.left-fixed-panel {
  position: relative;
  width: 420px;
  height: 100%;
  padding: 48px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  background: var(--bg-primary);
  overflow: hidden;
}

/* AI Neural Network Background */
.left-fixed-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    /* Subtle hexagon pattern */
    radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.02) 2px, transparent 2px),
    radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.02) 2px, transparent 2px),
    radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.02) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(14, 165, 233, 0.02) 2px, transparent 2px),
    /* Main neural glow */
    radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%);
  background-size:
    60px 60px,
    60px 60px,
    60px 60px,
    60px 60px,
    100% 100%,
    100% 100%,
    100% 100%;
  animation: aiGlow 8s ease-in-out infinite, floatingDots 20s linear infinite;
  z-index: 0;
}

@keyframes floatingDots {
  0% {
    background-position: 0 0, 15px 15px, 30px 30px, 45px 45px, 0 0, 0 0, 0 0;
  }
  100% {
    background-position: 60px 60px, 75px 75px, 90px 90px, 105px 105px, 0 0, 0 0, 0 0;
  }
}

/* AI Grid Pattern with Circuit Lines */
.left-fixed-panel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    /* Diagonal tech lines */
    linear-gradient(45deg, transparent 48%, rgba(14, 165, 233, 0.015) 48%, rgba(14, 165, 233, 0.015) 52%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(139, 92, 246, 0.015) 48%, rgba(139, 92, 246, 0.015) 52%, transparent 52%),
    /* Main grid */
    linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px),
    /* Circuit board dots at intersections */
    radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
  background-size:
    120px 120px,
    120px 120px,
    30px 30px,
    30px 30px,
    30px 30px;
  animation: gridMove 20s linear infinite, circuitPulse 4s ease-in-out infinite;
  z-index: 0;
}

@keyframes circuitPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes aiGlow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

.profile-section {
  text-align: center;
  max-width: 360px;
  position: relative;
  z-index: 1;
}

/* Scan line effect */
.profile-section::before {
  content: '';
  position: absolute;
  left: -50%;
  right: -50%;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(14, 165, 233, 0.3) 20%,
    rgba(139, 92, 246, 0.5) 50%,
    rgba(236, 72, 153, 0.3) 80%,
    transparent 100%);
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.5);
  animation: scanLine 8s ease-in-out infinite;
  z-index: -1;
  opacity: 0.4;
}

@keyframes scanLine {
  0%, 100% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 0.4;
  }
  50% {
    top: 100%;
    opacity: 0.4;
  }
  60% {
    opacity: 0;
  }
}

.photo-wrapper {
  width: 220px;
  height: 220px;
  margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid var(--bg-secondary);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
  position: relative;
}

.photo-wrapper::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg,
    var(--accent-primary),
    var(--accent-secondary),
    var(--accent-tertiary),
    var(--accent-primary));
  background-size: 300% 300%;
  animation: aiGradient 4s ease infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-wrapper:hover::before {
  opacity: 0.6;
}

.photo-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(14, 165, 233, 0.3),
              0 0 40px rgba(139, 92, 246, 0.2);
}

@keyframes aiGradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-name {
  font-family: 'Crimson Text', serif;
  font-size: 38px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
  position: relative;
}

.profile-title {
  font-size: 18px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px 0;
  position: relative;
}

.profile-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--accent-primary);
  width: fit-content;
  animation: typing 3.5s steps(60, end), blink 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: var(--accent-primary);
  }
}

/* Right Content Panel */
.right-content-panel {
  flex: 1;
  padding: 48px 48px 0 32px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
}

.content-section {
  margin-bottom: 80px;
  animation: fadeInUp 0.6s ease;
}

.section-title {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid var(--accent-primary);
}

/* Two Column Layout */
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.column {
  min-width: 0;
}

/* Publications List */
.publications-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.publication-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border-left: 4px solid var(--accent-primary);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.publication-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
  border-left-width: 6px;
}

.pub-year-badge {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-primary);
  text-align: center;
  padding-top: 4px;
}

.pub-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pub-title {
  font-family: 'Crimson Text', serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.5;
}

.pub-authors {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.pub-journal {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 4px 0;
}

.pub-journal strong {
  color: var(--text-primary);
  font-weight: 600;
}

.pub-doi-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 4px;
}

.pub-doi-link:hover {
  color: var(--accent-secondary);
  transform: translateX(4px);
}

.pub-doi-link svg {
  flex-shrink: 0;
}

.pub-note {
  display: inline-block;
  font-size: 12px;
  color: var(--accent-tertiary);
  font-weight: 600;
  margin-top: 4px;
}

/* Footer */
.content-footer {
  width: 100%;
  padding: 32px 0;
  margin-top: 40px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  background: var(--bg-primary);
  flex-shrink: 0;
}

.content-footer p {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-container {
    flex-direction: column;
  }

  .left-fixed-panel {
    position: relative;
    width: 100%;
    height: auto;
    top: 0;
    padding: 32px 24px;
  }

  .right-content-panel {
    padding: 32px 24px;
  }

  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .photo-wrapper {
    width: 180px;
    height: 180px;
  }

  .profile-name {
    font-size: 32px;
  }

  .section-title {
    font-size: 26px;
  }

  .publication-card {
    min-width: 280px;
    max-width: 280px;
  }

  .publication-card.expanded {
    min-width: 320px;
    max-width: 320px;
  }

  .nav-content {
    padding: 12px 16px;
  }
}
</style>
