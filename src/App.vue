<template>
  <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
    <n-layout style="min-height: 100vh;" :class="{ 'dark-mode': isDark }">
      <!-- Top Navigation Bar -->
      <n-layout-header bordered class="top-nav">
        <div class="nav-content">
          <div class="nav-links">
            <a href="#education" class="nav-link">Education</a>
            <a href="#employment" class="nav-link">Employment</a>
            <a href="#grants" class="nav-link">Grants</a>
            <a href="#awards" class="nav-link">Awards</a>
            <a href="#presentations" class="nav-link">Presentations</a>
            <a href="#publications" class="nav-link">Publications</a>
          </div>
          <div class="nav-controls">
            <n-button
              quaternary
              circle
              @click="toggleLanguage"
              :title="currentLang === 'en' ? '切换到中文' : 'Switch to English'"
            >
              <template #icon>
                <n-icon><globe-outline /></n-icon>
              </template>
            </n-button>
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
        <main class="right-content-panel">
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

          <!-- Publications Section with Horizontal Timeline -->
          <section id="publications" class="content-section">
            <h2 class="section-title">
              {{ currentLang === 'en' ? 'Publications' : '学术出版物' }}
            </h2>
            <div class="publications-timeline">
              <div class="timeline-track">
                <div
                  v-for="(pub, index) in resumeData.publications"
                  :key="index"
                  class="publication-card"
                  @click="selectedPublication = selectedPublication === index ? null : index"
                  :class="{ expanded: selectedPublication === index }"
                >
                  <div class="pub-year">{{ pub.year }}</div>
                  <div class="pub-marker"></div>
                  <div class="pub-content">
                    <h4 class="pub-title">{{ pub.title }}</h4>
                    <p class="pub-authors">{{ pub.authors }}</p>
                    <div v-if="selectedPublication === index" class="pub-details">
                      <p class="pub-journal"><strong>{{ pub.journal }}</strong></p>
                      <p class="pub-volume">{{ pub.volume }}</p>
                      <a v-if="pub.doi" :href="pub.doi" target="_blank" class="pub-doi">
                        DOI: {{ pub.doi.replace('https://doi.org/', '') }}
                      </a>
                    </div>
                  </div>
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
  darkTheme
} from 'naive-ui'
import {
  GlobeOutline,
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

// Theme
const themeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    borderRadius: '12px'
  }
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'cn' : 'en'
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<style scoped>
/* Global Variables */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --text-muted: #718096;
  --border-color: #e2e8f0;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.dark-mode {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;
  --text-muted: #cbd5e1;
  --border-color: #4a5568;
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
  transition: color 0.2s;
  padding: 8px 12px;
  border-radius: 6px;
}

.nav-link:hover {
  color: #2563eb;
  background: var(--bg-secondary);
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
  min-height: calc(100vh - 60px);
}

/* Left Fixed Panel */
.left-fixed-panel {
  position: sticky;
  top: 80px;
  width: 420px;
  height: calc(100vh - 100px);
  padding: 48px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-section {
  text-align: center;
  max-width: 360px;
}

.photo-wrapper {
  width: 220px;
  height: 220px;
  margin: 0 auto 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid var(--bg-secondary);
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.2);
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
  color: var(--text-primary);
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.profile-title {
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 16px 0;
}

.profile-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* Right Content Panel */
.right-content-panel {
  flex: 1;
  padding: 48px 48px 48px 32px;
  overflow-y: auto;
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
  border-bottom: 3px solid #2563eb;
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

/* Publications Timeline */
.publications-timeline {
  position: relative;
  padding: 32px 0;
}

.timeline-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 24px 8px 32px 8px;
  position: relative;
  scroll-snap-type: x mandatory;
}

.timeline-track::before {
  content: '';
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #2563eb, #3b82f6, #60a5fa);
  z-index: 0;
}

.publication-card {
  position: relative;
  min-width: 320px;
  max-width: 320px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  scroll-snap-align: start;
  z-index: 1;
}

.publication-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: #2563eb;
}

.publication-card.expanded {
  min-width: 400px;
  max-width: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.publication-card.expanded .pub-year,
.publication-card.expanded .pub-title,
.publication-card.expanded .pub-authors {
  color: white;
}

.pub-year {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
  background: var(--bg-primary);
  padding: 4px 16px;
  border-radius: 20px;
  border: 2px solid #2563eb;
  white-space: nowrap;
}

.pub-marker {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #2563eb;
  border: 4px solid var(--bg-primary);
  border-radius: 50%;
  z-index: 2;
}

.publication-card.expanded .pub-marker {
  width: 20px;
  height: 20px;
  background: white;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3);
}

.pub-content {
  margin-top: 24px;
}

.pub-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.publication-card.expanded .pub-title {
  -webkit-line-clamp: unset;
}

.pub-authors {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.pub-details {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.pub-journal,
.pub-volume {
  font-size: 14px;
  margin: 8px 0;
  opacity: 0.95;
}

.pub-doi {
  display: inline-block;
  margin-top: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-size: 13px;
  transition: background 0.2s;
}

.pub-doi:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Footer */
.content-footer {
  padding: 32px 0;
  border-top: 1px solid var(--border-color);
  text-align: center;
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

/* Scrollbar Styling */
.timeline-track::-webkit-scrollbar {
  height: 8px;
}

.timeline-track::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.timeline-track::-webkit-scrollbar-thumb {
  background: #2563eb;
  border-radius: 4px;
}

.timeline-track::-webkit-scrollbar-thumb:hover {
  background: #1d4ed8;
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
