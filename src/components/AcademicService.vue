<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Academic Service' : '学术服务' }}</h2>

    <div class="service-item">
      <h3>{{ data.peerReview.title[lang] }}</h3>
      <p>{{ data.peerReview.journals[lang] }}</p>
    </div>

    <div class="service-item">
      <h3>{{ data.editorial.title[lang] }}</h3>
      <p>
        {{ data.editorial.journal[lang] }}<br>
        ({{ data.editorial.topics[lang] }})
      </p>
    </div>

    <div class="service-item">
      <h3>{{ data.mentoring.title[lang] }}</h3>
      <p>{{ data.mentoring.description[lang] }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
})
</script>
