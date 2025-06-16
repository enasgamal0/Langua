<template>
  <div
    class="bg-[#4B007D] bg-no-repeat h-[167px] text-center pt-[40px]"
    style="
      background-image: url('/why_us_top.png'), url('/why_us_bottom.png');
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <h1 class="text-[32px] font-[800] text-white" data-aos="fade-down">
      {{ title }}
    </h1>
    <div class="flex items-center justify-center text-white gap-5 mt-4" data-aos="fade-up">
        <NuxtLink :to="localePath('/')" class="text-[16px] font-[400] hover:text-[#E77C5A]">
            {{ prev }}
        </NuxtLink>
        <img src="/arrow.png" alt="arrow" class="w-[24px] h-[24px]" :class="locale == 'en' ? 'rotate-180' : ''" />
        <span class="text-[16px] font-[700]">{{ current }}</span>
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
defineProps({
    title: {
        type: String,
        default: ""
    },
    current: {
        type: String,
        default: ""
    },
    prev: {
        type: String,
        default: ""
    }
})
</script>