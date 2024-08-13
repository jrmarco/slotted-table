<template>
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#007bff"
      stroke-width="6"
      fill="none"
      stroke-dasharray="251.2"
      stroke-dashoffset="251.2"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="251.2"
        to="0"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="1"
        to="0"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <text x="50%" y="60%" text-anchor="middle" font-size="10px" fill="#007bff">
      {{ text }}
    </text>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>
