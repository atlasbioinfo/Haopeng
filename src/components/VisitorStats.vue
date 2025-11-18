<template>
  <div class="visitor-stats" :class="{ 'dark-mode': isDark }">
    <div class="stats-header">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <span>{{ lang === 'en' ? 'Visitor Stats' : '访问统计' }}</span>
    </div>
    <div class="stats-content">
      <div class="stat-item">
        <div class="stat-label">{{ lang === 'en' ? 'Total Views' : '总访问量' }}</div>
        <div class="stat-value">
          <span id="busuanzi_value_page_pv">
            <span class="loading-dot">•</span>
            <span class="loading-dot">•</span>
            <span class="loading-dot">•</span>
          </span>
        </div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-label">{{ lang === 'en' ? 'Visitors' : '访客数' }}</div>
        <div class="stat-value">
          <span id="busuanzi_value_site_uv">
            <span class="loading-dot">•</span>
            <span class="loading-dot">•</span>
            <span class="loading-dot">•</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  isDark: Boolean,
  lang: {
    type: String,
    default: 'en'
  }
})

onMounted(() => {
  // 等待不蒜子脚本加载完成
  const checkBusuanzi = setInterval(() => {
    if (window.busuanzi) {
      clearInterval(checkBusuanzi)
    }
  }, 100)
})
</script>

<style scoped>
.visitor-stats {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.3s ease;
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 13px;
  color: var(--text-muted, #9ca3af);
  justify-content: center;
}

.dark-mode .stats-header {
  color: var(--text-muted, #94a3b8);
}

.stats-header svg {
  opacity: 0.6;
  width: 14px;
  height: 14px;
}

.stats-content {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted, #9ca3af);
  margin-bottom: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dark-mode .stat-label {
  color: var(--text-muted, #94a3b8);
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent-primary, #0ea5e9);
  font-family: 'Courier New', monospace;
}

.dark-mode .stat-value {
  color: var(--accent-primary, #38bdf8);
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, transparent, var(--border-color, #e5e7eb), transparent);
}

.dark-mode .stat-divider {
  background: linear-gradient(to bottom, transparent, var(--border-color, #334155), transparent);
}

/* Loading animation */
.loading-dot {
  animation: loadingDots 1.4s infinite;
  opacity: 0.3;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingDots {
  0%, 60%, 100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .stats-content {
    gap: 16px;
  }

  .stats-header {
    font-size: 12px;
  }

  .stat-value {
    font-size: 18px;
  }

  .stat-label {
    font-size: 10px;
  }

  .stat-divider {
    height: 32px;
  }
}
</style>
