<template>
  <div
    v-if="!loading"
    class="flex flex-wrap pt-10 pb-20 bg-no-repeat about_bg items-center"
    style="
      background-image: url('/about_top.png'), url('/about_bottom.png');
      background-position: bottom 400px right 48px, bottom 50px left 48px;
      background-size: 85px 120px;
    "
  >
    <div class="md:!w-[50%] w-[100%] flex justify-center" data-aos="fade-up">
      <img
        :src="about?.data?.data[0]?.image || `/about.png`"
        alt="About Langua"
        class="lg:!max-w-[421px] lg:!max-h-[400px] md:!max-w-[321px] md:!max-h-[300px] w-[221px] h-[200px] m-auto"
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
  <div v-else>
    <UIButtonLoader :borderColor="`#4B007D`" class="mx-auto !my-20" />
  </div>
</template>
<script setup>
const about = ref(null);
const tokenCookie = useCookie("langua_token");
const { locale } = useI18n();
const loading = ref(true);
defineProps({
  home: {
    type: Boolean,
    default: true,
  },
});

onMounted(async () => {
  loading.value = true;
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
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
@media (max-width: 1040px) {
  .about_bg {
    background-position: bottom 300px right 20px, bottom 50px left 48px !important;
    background-image: url('/about_top.png'),url('') !important;
  }
}
</style>
