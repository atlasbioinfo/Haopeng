<template>
  <section class="section">
    <h2 class="section-title">{{ lang === 'en' ? 'Selected Presentations' : '主要学术报告' }}</h2>

    <div class="presentations-timeline-horizontal">
      <div v-for="(item, index) in data" :key="index" class="presentation-item-horizontal">
        <div class="pres-year-badge">{{ item.year }}</div>
        <div class="pres-marker-circle"></div>
        <div class="pres-content-card">
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
/* Presentations Horizontal Timeline */
.section-title {
  font-family: 'Crimson Text', serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 32px 0;
  padding-bottom: 16px;
  border-bottom: 3px solid var(--accent-primary);
}

.presentations-timeline-horizontal {
  position: relative;
  padding: 40px 0;
  overflow: hidden;
}

.presentations-timeline-horizontal::before {
  content: '';
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, var(--accent-secondary), var(--accent-tertiary), var(--accent-secondary));
  border-radius: 2px;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
}

.presentation-item-horizontal {
  display: inline-block;
  position: relative;
  width: 280px;
  margin-right: 24px;
  margin-bottom: 32px;
  vertical-align: top;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.presentation-item-horizontal:hover {
  transform: translateY(-8px);
}

.pres-year-badge {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-secondary);
  background: var(--bg-primary);
  padding: 6px 14px;
  border-radius: 20px;
  border: 2px solid var(--accent-secondary);
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
  z-index: 2;
}

.pres-marker-circle {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary));
  border: 4px solid var(--bg-primary);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15), 0 2px 8px rgba(139, 92, 246, 0.3);
  z-index: 3;
  transition: all 0.3s ease;
}

.presentation-item-horizontal:hover .pres-marker-circle {
  transform: translateX(-50%) scale(1.3);
  background: linear-gradient(135deg, var(--accent-tertiary), var(--accent-primary));
  box-shadow: 0 0 0 6px rgba(236, 72, 153, 0.2), 0 2px 8px rgba(236, 72, 153, 0.4);
}

.pres-content-card {
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-top: 72px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  min-height: 160px;
}

.presentation-item-horizontal:hover .pres-content-card {
  border-color: var(--accent-secondary);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05));
}

.pres-type-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.pres-type-badge.oral {
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary));
  color: white;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.pres-type-badge.poster {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
}

.presentation-item-horizontal:hover .pres-type-badge {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.pres-title {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.7;
  margin: 0;
  font-weight: 500;
}
</style>
