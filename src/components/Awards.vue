<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Fellowship and Awards' : '奖学金与荣誉' }}</h2>

    <div v-for="(item, index) in data" :key="index" class="award-item">
      <div class="award-year">{{ item.year }}</div>
      <div class="award-content">
        <h3>{{ item.title[lang] }}</h3>
        <p v-if="item.institution">{{ item.institution[lang] }}<span v-if="item.amount"> | <strong>{{ item.amount }}</strong></span></p>
        <p v-else-if="item.amount"><strong>{{ item.amount }}</strong></p>
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
