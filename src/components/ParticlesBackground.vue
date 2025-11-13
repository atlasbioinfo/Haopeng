<template>
  <vue-particles
    id="tsparticles"
    :options="particlesOptions"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
});

// Reactive options based on theme
const particlesOptions = computed(() => ({
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.5,
        },
      },
    },
  },
  particles: {
    color: {
      value: props.isDark ? "#38bdf8" : "#0ea5e9",
    },
    links: {
      color: props.isDark ? "#38bdf8" : "#0ea5e9",
      distance: 150,
      enable: true,
      opacity: 0.25,
      width: 1.2,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "bounce",
      },
    },
    number: {
      value: 60,
      density: {
        enable: true,
        area: 800,
      },
    },
    opacity: {
      value: 0.4,
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 2.5 },
    },
  },
  detectRetina: true,
}));
</script>

<style scoped>
#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
