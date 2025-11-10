<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Education' : '教育背景' }}</h2>

    <div v-for="(item, index) in data" :key="index" class="timeline-item">
      <div class="timeline-year">{{ item.year }}</div>
      <div class="timeline-content">
        <h3>{{ item.degree[lang] }}</h3>
        <p>{{ item.institution[lang] }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
})
</script>
