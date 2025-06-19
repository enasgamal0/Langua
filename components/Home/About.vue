<template>
  <div
    class="flex flex-wrap py-20 bg-no-repeat about_bg items-center"
    style="
      background-image: url('/about_top.png'), url('/about_bottom.png');
      background-position: bottom 400px right 48px, bottom 50px left 48px;
      background-size: 85px 120px;
    "
  >
    <div class="md:!w-[50%] w-[100%] flex justify-center" data-aos="fade-up">
      <img
        :src="about?.data?.data[0]?.value?.image || `/about.png`"
        alt="About Langua"
        class="lg:!w-[421px] lg:!h-[400px] w-[321px] h-[300px] m-auto"
      />
    </div>
    <div class="md:!w-[50%] w-[100%] mx-10 md:mx-0" data-aos="fade-down">
      <h1 class="text-[32px] font-[800]">{{ $t("S2.title") }}</h1>
      <h2 class="text-[24px] font-[700] md:w-[75%] mb-5 mt-3">
        {{ $t("S2.platform") }}
        <span class="text-[#4B007D]">{{ $t("S2.langua_learn") }}</span>
        {{ $t("S2.subtitle") }}
      </h2>
      <p class="text-[16px] font-[400] text-[#202020] md:w-[75%]" :class="home ? 'line-clamp-4' : ''">
        {{ locale === "ar" ? about?.data?.data[0]?.value?.text?.ar : about?.data?.data[0]?.value?.text?.en }}
      </p>
      <NuxtLink :to="localePath('/about')" class="block">
        <BaseButton
          :content="$t('S2.more')"
          border-color="#E77C5A"
          bg-color="#4B007D"
          width="200px"
          class="mt-8"
          :lg_space="true"
          v-if="home"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const about = ref(null);
const tokenCookie = useCookie("langua_token");
const { locale } = useI18n();
defineProps({
  home: {
    type: Boolean,
    default: true,
  },
});

onMounted(async () => {
  try {
    about.value = await apiRequest(
      "GET",
      `/settings?key=about_us`,
      {},
      {},
      tokenCookie.value,
      locale.value
    );
  } catch (error) {
    console.error("Failed to load advertisements:", error);
    about.value = null;
  }
});
</script>
<style scoped>
@media (max-width: 570px) {
  .about_bg {
    background-position: bottom 680px right 20px, bottom 50px left 48px !important;
  }
}
</style>
