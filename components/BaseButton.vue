<template>
  <div
    class="relative max-w-[186px] hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer"
  >
    <button
      class="flex items-center text-white text-[14px] font-[700] cursor-pointer"
      :style="{ backgroundColor: bgColor }"
      :disabled="pending"
    >
      <UIButtonLoader v-if="pending" />
      <div v-else class="flex justify-center items-center gap-3 px-3 h-[48px]">
        <img :alt="content" :src="icon" class="w-[20px] h-[20px]" />
        <span>{{ content }}</span>
      </div>
    </button>
    <div
      class="w-full absolute top-[5px] left-[5px] h-[48px] border-2 -z-1 hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer"
      :style="{ borderColor: borderColor }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  pending: {
    type: Boolean,
  },
  bgColor: {
    type: String,
    default: "#4B007D",
  },
  borderColor: {
    type: String,
    default: "#E77C5A",
  },
});
</script>
