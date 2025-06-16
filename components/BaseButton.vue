<template>
  <div
    data-aos="zoom-in"
    class="relative hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer max-w-[200px]"
    :class="`w-[${width}]`"
  >
    <button
      class="flex items-center text-white text-[14px] font-[700] cursor-pointer w-[200px]"
      :style="{ backgroundColor: bgColor }"
      :disabled="pending"
    >
      <UIButtonLoader v-if="pending" />
      <div v-else class="flex justify-center items-center gap-3 px-3 h-[48px] m-auto">
        <img v-if="icon" :alt="content" :src="icon" class="w-[20px] h-[20px]" />
        <span>{{ content }}</span>
      </div>
    </button>
    <div
      class="w-full absolute top-[5px] left-[5px] h-[48px] border-2 -z-1 hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer"
      :class="{ '!top-[9px] !left-[9px]': lg_space, '!top-[9px] !right-[9px]': lg_reversed_space }"
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
});
</script>
