<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout has-sider style="height: 100vh">
      <!-- Left Sidebar Navigation -->
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="background: var(--sidebar-bg)"
      >
        <div class="sidebar-header">
          <div class="avatar-container">
            <n-avatar
              :size="collapsed ? 40 : 80"
              :src="resumeData.personal.photo"
              style="transition: all 0.3s"
            />
          </div>
          <div v-show="!collapsed" class="user-info">
            <h3>{{ resumeData.personal.name[currentLang] }}</h3>
            <p class="user-title">{{ resumeData.personal.title[currentLang] }}</p>
          </div>
        </div>

        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-icon="renderMenuIcon"
          @update:value="handleMenuSelect"
        />

        <!-- Language Toggle at Bottom -->
        <div class="sidebar-footer">
          <n-button
            quaternary
            block
            @click="toggleLanguage"
            :title="currentLang === 'en' ? '切换到中文' : 'Switch to English'"
          >
            <template #icon>
              <n-icon><globe-outline /></n-icon>
            </template>
            <span v-show="!collapsed">{{ currentLang === 'en' ? '中文' : 'English' }}</span>
          </n-button>
        </div>
      </n-layout-sider>

      <!-- Main Content Area -->
      <n-layout :native-scrollbar="false">
        <n-layout-content
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <div class="content-container">
            <!-- Hero Section -->
            <section v-show="activeKey === 'home'" id="home" class="content-section">
              <div class="hero-banner">
                <h1 class="hero-name">{{ resumeData.personal.name[currentLang] }}</h1>
                <p class="hero-subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>
              </div>
            </section>

            <!-- Education Section -->
            <section v-show="activeKey === 'education'" id="education" class="content-section">
              <Education :data="resumeData.education" :lang="currentLang" />
            </section>

            <!-- Employment Section -->
            <section v-show="activeKey === 'employment'" id="employment" class="content-section">
              <Employment :data="resumeData.employment" :lang="currentLang" />
            </section>

            <!-- Grants Section -->
            <section v-show="activeKey === 'grants'" id="grants" class="content-section">
              <Grants :data="resumeData.grants" :lang="currentLang" />
            </section>

            <!-- Awards Section -->
            <section v-show="activeKey === 'awards'" id="awards" class="content-section">
              <Awards :data="resumeData.awards" :lang="currentLang" />
            </section>

            <!-- Publications Section -->
            <section v-show="activeKey === 'publications'" id="publications" class="content-section">
              <Publications :data="resumeData.publications" :lang="currentLang" />
            </section>

            <!-- Presentations Section -->
            <section v-show="activeKey === 'presentations'" id="presentations" class="content-section">
              <Presentations :data="resumeData.presentations" :lang="currentLang" />
            </section>

            <!-- Academic Service Section -->
            <section v-show="activeKey === 'service'" id="service" class="content-section">
              <AcademicService :data="resumeData.academicService" :lang="currentLang" />
            </section>

            <!-- AI Chat Section (Placeholder) -->
            <section v-show="activeKey === 'ai'" id="ai" class="content-section">
              <n-card title="Talk to AI" :bordered="false">
                <n-empty description="AI Chat feature coming soon...">
                  <template #icon>
                    <n-icon size="48" color="#2563eb">
                      <chatbubble-ellipses-outline />
                    </n-icon>
                  </template>
                </n-empty>
              </n-card>
            </section>
          </div>
        </n-layout-content>

        <!-- Footer -->
        <n-layout-footer bordered style="padding: 16px; text-align: center; background: var(--footer-bg);">
          <p style="color: var(--text-muted); font-size: 14px;">
            {{ currentLang === 'en' ? '© 2025 Haopeng Yu. All rights reserved.' : '© 2025 余浩鹏. 版权所有.' }}
          </p>
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, h } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NAvatar,
  NButton,
  NIcon,
  NCard,
  NEmpty
} from 'naive-ui'
import {
  HomeOutline,
  SchoolOutline,
  BusinessOutline,
  TrophyOutline,
  DocumentTextOutline,
  MicOutline,
  PeopleOutline,
  ChatbubbleEllipsesOutline,
  GlobeOutline,
  CashOutline
} from '@vicons/ionicons5'

import resumeData from './data/resume.json'
import Education from './components/Education.vue'
import Employment from './components/Employment.vue'
import Grants from './components/Grants.vue'
import Awards from './components/Awards.vue'
import AcademicService from './components/AcademicService.vue'
import Presentations from './components/Presentations.vue'
import Publications from './components/Publications.vue'

// State
const currentLang = ref('en')
const activeKey = ref('home')
const collapsed = ref(false)

// Academic + Tech Theme Colors
const themeOverrides = {
  common: {
    primaryColor: '#2563eb',
    primaryColorHover: '#3b82f6',
    primaryColorPressed: '#1d4ed8',
    infoColor: '#06b6d4',
    successColor: '#10b981',
    warningColor: '#f59e0b',
    errorColor: '#ef4444',
    textColorBase: '#2d3748',
    borderRadius: '8px'
  },
  Layout: {
    color: '#ffffff',
    siderColor: '#1e3a5f',
    footerColor: '#f8fafc'
  },
  Menu: {
    itemTextColor: '#e2e8f0',
    itemTextColorHover: '#ffffff',
    itemTextColorActive: '#ffffff',
    itemTextColorActiveHover: '#ffffff',
    itemIconColor: '#cbd5e1',
    itemIconColorHover: '#ffffff',
    itemIconColorActive: '#ffffff',
    itemColorActive: '#2563eb',
    itemColorActiveHover: '#3b82f6'
  }
}

// Menu Options
const menuOptions = [
  {
    label: 'Home',
    key: 'home',
    icon: HomeOutline
  },
  {
    label: 'Education',
    key: 'education',
    icon: SchoolOutline
  },
  {
    label: 'Employment',
    key: 'employment',
    icon: BusinessOutline
  },
  {
    label: 'Research Grants',
    key: 'grants',
    icon: CashOutline
  },
  {
    label: 'Awards',
    key: 'awards',
    icon: TrophyOutline
  },
  {
    label: 'Publications',
    key: 'publications',
    icon: DocumentTextOutline
  },
  {
    label: 'Presentations',
    key: 'presentations',
    icon: MicOutline
  },
  {
    label: 'Academic Service',
    key: 'service',
    icon: PeopleOutline
  },
  {
    label: 'Talk to AI',
    key: 'ai',
    icon: ChatbubbleEllipsesOutline
  }
]

const renderMenuIcon = (option) => {
  return h(NIcon, null, { default: () => h(option.icon) })
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'cn' : 'en'
}

const handleMenuSelect = (key) => {
  activeKey.value = key
}
</script>

<style scoped>
:root {
  --sidebar-bg: #1e3a5f;
  --footer-bg: #f8fafc;
  --text-muted: #718096;
}

.sidebar-header {
  padding: 24px 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
}

.avatar-container {
  margin-bottom: 16px;
}

.user-info h3 {
  color: #ffffff;
  margin: 8px 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  font-family: 'Crimson Text', serif;
}

.user-title {
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
}

.sidebar-footer {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  padding: 0 16px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  min-height: 400px;
  animation: fadeIn 0.3s ease;
}

.hero-banner {
  background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
  color: white;
  padding: 80px 48px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.hero-name {
  font-family: 'Crimson Text', serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  margin: 0;
  font-weight: 300;
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

@media (max-width: 768px) {
  .hero-name {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-banner {
    padding: 48px 24px;
  }
}
</style>
