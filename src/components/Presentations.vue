<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Selected Presentations' : '主要学术报告' }}</h2>

    <div class="presentation-grid">
      <div v-for="(item, index) in data" :key="index" class="presentation-item">
        <span class="pres-year">{{ item.year }}</span>
        <span class="pres-type" :class="item.type.toLowerCase()">{{ item.type }}</span>
        <p>{{ item.title[lang] }}</p>
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
