<template>
  <div
    class="relative hover:scale-[1.02] transition duration-300 ease-in-out"
    :class="`w-[${width || `200px`}]`, pending ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <button
      class="flex items-center text-white font-[700]"
      :class="pending ? 'cursor-not-allowed' : 'cursor-pointer'"
      :style="{ backgroundColor: bgColor, width: width, fontSize: font_size }"
      :disabled="pending"
    >
      <div v-if="pending" class="flex justify-center items-center gap-3 px-3 h-[48px] m-auto">
        <UIButtonLoader />
      </div>
      <div v-else class="flex justify-center items-center gap-3 px-3 h-[48px] m-auto">
        <img v-if="icon" :alt="content" :src="icon" class="w-[20px] h-[20px]" />
        <span>{{ content }}</span>
        <img v-if="hasArrow" src="/arrow_nav.png" class="w-[24px] h-[24px]" />
      </div>
    </button>
    <div
      class="absolute top-[5px] left-[5px] h-[48px] border-2 -z-1 transition duration-300 ease-in-out"
      :class="{ '!top-[9px] !left-[9px]': lg_space, '!top-[9px] !right-[9px]': lg_reversed_space }"
      :style="{ borderColor: borderColor, width: width }"
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
    default: false,
  },
  bgColor: {
    type: String,
    default: "#4B007D",
  },
  borderColor: {
    type: String,
    default: "transparent",
  },
  width: {
    type: String,
    default: "186px",
  },
  lg_space: {
    type: Boolean,
    default: false,
  },
  lg_reversed_space: {
    type: Boolean,
    default: false,
  },
  font_size: {
    type: String,
    default: "14px",
  },
  hasArrow: {
    type: Boolean,
    default: false,
  },
});
</script>
