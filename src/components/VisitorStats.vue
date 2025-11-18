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
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  min-width: 280px;
  transition: all 0.3s ease;
}

.visitor-stats:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.visitor-stats.dark-mode {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.visitor-stats.dark-mode:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #6b7280;
}

.dark-mode .stats-header {
  color: #cbd5e1;
}

.stats-header svg {
  opacity: 0.7;
}

.stats-content {
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 6px;
  font-weight: 500;
}

.dark-mode .stat-label {
  color: #94a3b8;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0ea5e9;
  font-family: 'Courier New', monospace;
}

.dark-mode .stat-value {
  color: #38bdf8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, #e5e7eb, transparent);
}

.dark-mode .stat-divider {
  background: linear-gradient(to bottom, transparent, #334155, transparent);
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
  .visitor-stats {
    bottom: 16px;
    right: 16px;
    min-width: 240px;
    padding: 12px 16px;
  }

  .stats-header {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-label {
    font-size: 11px;
  }
}
</style>
