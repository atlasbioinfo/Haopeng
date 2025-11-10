<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Selected Publications' : '主要学术论文' }}</h2>

    <div class="publications">
      <div v-for="(item, index) in data" :key="index" class="pub-item">
        <p class="pub-text">
          <strong>{{ item.authors }}</strong> ({{ item.year }}). {{ item.title }}
          <em>{{ item.journal }}</em><template v-if="item.volume">, {{ item.volume }}</template><template v-if="item.pages">, {{ item.pages }}</template>.
          {{ item.doi }}<template v-if="item.note"> {{ item.note }}</template>
        </p>
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
