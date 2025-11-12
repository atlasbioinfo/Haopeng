<template>
  <n-config-provider :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
    <n-layout style="min-height: 100vh;" :class="{ 'dark-mode': isDark }">
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

          <!-- Publications Section with Vertical Timeline -->
          <section id="publications" class="content-section">
            <h2 class="section-title">
              {{ currentLang === 'en' ? 'Publications' : '学术出版物' }}
            </h2>
            <div class="publications-timeline-vertical">
              <div
                v-for="(pub, index) in resumeData.publications"
                :key="index"
                class="publication-item-vertical"
                @click="selectedPublication = selectedPublication === index ? null : index"
                :class="{ expanded: selectedPublication === index }"
              >
                <div class="pub-year-vertical">{{ pub.year }}</div>
                <div class="pub-marker-vertical"></div>
                <div class="pub-content-vertical">
                  <h4 class="pub-title-vertical">{{ pub.title }}</h4>
                  <p class="pub-authors-vertical">{{ pub.authors }}</p>
                  <div v-if="selectedPublication === index" class="pub-details-vertical">
                    <p class="pub-journal-vertical"><strong>{{ pub.journal }}</strong></p>
                    <p class="pub-volume-vertical">{{ pub.volume }}</p>
                    <a v-if="pub.doi" :href="pub.doi" target="_blank" class="pub-doi-vertical">
                      DOI: {{ pub.doi.replace('https://doi.org/', '') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- Footer -->
      <footer class="content-footer">
        <p>
          {{ currentLang === 'en' ? '© 2025 Haopeng Yu. All rights reserved.' : '© 2025 余浩鹏. 版权所有.' }}
        </p>
      </footer>
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
const contentPanel = ref(null)
const activeSection = ref('education')

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
  overflow-x: hidden;
  height: 100%;
  scroll-behavior: smooth;
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

/* Publications Horizontal Timeline */
.publications-timeline-vertical {
  position: relative;
  padding: 40px 0;
  overflow: hidden;
}

.publications-timeline-vertical::before {
  content: '';
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(14, 165, 233, 0.3);
}

.publication-item-vertical {
  display: inline-block;
  position: relative;
  width: 320px;
  margin-right: 24px;
  margin-bottom: 32px;
  vertical-align: top;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.publication-item-vertical:hover {
  transform: translateY(-8px);
}

.pub-year-vertical {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-primary);
  background: var(--bg-primary);
  padding: 6px 14px;
  border-radius: 20px;
  border: 2px solid var(--accent-primary);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);
  z-index: 2;
}

.pub-marker-vertical {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border: 4px solid var(--bg-primary);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15), 0 2px 8px rgba(14, 165, 233, 0.3);
  z-index: 3;
  transition: all 0.3s ease;
}

.publication-item-vertical:hover .pub-marker-vertical {
  transform: translateX(-50%) scale(1.3);
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 0 0 6px rgba(14, 165, 233, 0.2), 0 2px 8px rgba(14, 165, 233, 0.4);
}

.publication-item-vertical.expanded .pub-marker-vertical {
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, var(--accent-tertiary), var(--accent-secondary));
  box-shadow: 0 0 0 8px rgba(236, 72, 153, 0.25), 0 4px 16px rgba(236, 72, 153, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 8px rgba(236, 72, 153, 0.25), 0 4px 16px rgba(236, 72, 153, 0.5);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(236, 72, 153, 0.15), 0 4px 20px rgba(236, 72, 153, 0.6);
  }
}

.pub-content-vertical {
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  margin-top: 72px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  height: 100%;
  min-height: 200px;
}

.publication-item-vertical:hover .pub-content-vertical {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-md);
  background: var(--bg-secondary);
}

.publication-item-vertical.expanded {
  width: 400px;
}

.publication-item-vertical.expanded .pub-content-vertical {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border-color: transparent;
  box-shadow: var(--shadow-lg);
  min-height: 280px;
}

.pub-title-vertical {
  font-family: 'Crimson Text', serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  line-height: 1.5;
  transition: color 0.3s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.publication-item-vertical.expanded .pub-title-vertical {
  color: white;
  -webkit-line-clamp: unset;
}

.pub-authors-vertical {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 12px 0;
  line-height: 1.6;
  transition: color 0.3s;
}

.publication-item-vertical.expanded .pub-authors-vertical {
  color: rgba(255, 255, 255, 0.95);
}

.pub-details-vertical {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pub-journal-vertical,
.pub-volume-vertical {
  font-size: 13px;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
}

.pub-doi-vertical {
  display: inline-block;
  margin-top: 12px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
}

.pub-doi-vertical:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Footer */
.content-footer {
  width: 100%;
  padding: 24px 32px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  background: var(--bg-primary);
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
