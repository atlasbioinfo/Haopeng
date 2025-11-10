<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Grants' : '科研基金' }}</h2>

    <div v-for="(item, index) in data" :key="index" class="grant-item">
      <div class="grant-year">{{ item.year }}</div>
      <div class="grant-content">
        <h3>{{ item.title[lang] }}</h3>
        <p v-if="item.description">{{ item.description[lang] }} | {{ item.role[lang] }} | <strong>{{ item.amount }}</strong></p>
        <p v-else>{{ item.role[lang] }} | <strong>{{ item.amount }}</strong></p>
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
