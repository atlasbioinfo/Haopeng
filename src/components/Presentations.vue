<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Selected Presentations' : '主要学术报告' }}</h2>

    <div class="presentations-list">
      <div v-for="(item, index) in data" :key="index" class="presentation-item">
        <div class="pres-year">{{ item.year }}</div>
        <div class="pres-content">
          <span class="pres-type-badge" :class="item.type.toLowerCase()">{{ item.type }}</span>
          <p class="pres-title">{{ item.title[lang] }}</p>
        </div>
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

<style scoped>
/* Presentations List */
.section-title {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid var(--accent-primary);
}

.presentations-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.presentation-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border-left: 4px solid var(--accent-secondary);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.presentation-item:hover {
  transform: translateX(8px);
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
  border-left-width: 6px;
}

.pres-year {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent-secondary);
  text-align: center;
  padding-top: 2px;
}

.pres-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pres-type-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  width: fit-content;
}

.pres-type-badge.oral {
  background: linear-gradient(135deg, #7c3aed, #c026d3);
  color: white;
  box-shadow: 0 2px 6px rgba(124, 58, 237, 0.3);
}

.pres-type-badge.poster {
  background: linear-gradient(135deg, #0891b2, #0ea5e9);
  color: white;
  box-shadow: 0 2px 6px rgba(8, 145, 178, 0.3);
}

.presentation-item:hover .pres-type-badge {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(139, 92, 246, 0.4);
}

.pres-title {
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}
</style>
