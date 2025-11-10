<template>
  <div>
    <!-- Language Toggle -->
    <div class="language-toggle">
      <button @click="toggleLanguage">{{ currentLang === 'en' ? '中文' : 'English' }}</button>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-image">
            <img :src="resumeData.personal.photo" :alt="resumeData.personal.name.en">
          </div>
          <div class="hero-text">
            <h1 class="name">{{ resumeData.personal.name[currentLang] }}</h1>
            <p class="title">{{ resumeData.personal.title[currentLang] }}</p>
            <p class="subtitle">{{ resumeData.personal.subtitle[currentLang] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="container">
      <Education :data="resumeData.education" :lang="currentLang" />
      <Employment :data="resumeData.employment" :lang="currentLang" />
      <Grants :data="resumeData.grants" :lang="currentLang" />
      <Awards :data="resumeData.awards" :lang="currentLang" />
      <AcademicService :data="resumeData.academicService" :lang="currentLang" />
      <Presentations :data="resumeData.presentations" :lang="currentLang" />
      <Publications :data="resumeData.publications" :lang="currentLang" />
    </main>

    <!-- Footer -->
    <footer>
      <div class="container">
        <p>{{ currentLang === 'en' ? '© 2025 Haopeng Yu. All rights reserved.' : '© 2025 余浩鹏. 版权所有.' }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import resumeData from './data/resume.json'
import Education from './components/Education.vue'
import Employment from './components/Employment.vue'
import Grants from './components/Grants.vue'
import Awards from './components/Awards.vue'
import AcademicService from './components/AcademicService.vue'
import Presentations from './components/Presentations.vue'
import Publications from './components/Publications.vue'

const currentLang = ref('en')

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'cn' : 'en'
}
</script>
