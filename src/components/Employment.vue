<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Employment' : '工作经历' }}</h2>

    <div v-for="(item, index) in data" :key="index" class="timeline-item">
      <div class="timeline-year">{{ item.year }}</div>
      <div class="timeline-content">
        <h3>{{ item.position[lang] }}</h3>
        <p v-for="(detail, idx) in item.details" :key="idx">{{ detail[lang] }}</p>
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
