<template>
  <BreadCrumb
    :title="$t('bread_crumb.faq')"
    :current="$t('bread_crumb.faq')"
    :prev="$t('nav.home')"
  />
  <div
    class="flex flex-wrap justify-center m-10 bg-no-repeat py-10 lg:px-20 gap-3 faq_bg"
  >
    <div class="xl:!w-[30%] w-full">
      <img
        alt="FAQ"
        src="/faq.png"
        class="w-[120px] h-[120px] m-auto"
        data-aos="zoom-in"
      />
      <div class="text-center mb-5 xl:!mb-0">
        <h1 class="text-[32px] font-[700] text-[#4B007D] my-5">
          {{ $t("bread_crumb.faq") }}
        </h1>
        <p class="text-[18px] text-[#202020] mb-3">{{ $t("faq.desc") }}</p>
        <p class="font-[800] text-[18px]">
          <span class="text-[#E77C5A]">Langua</span
          ><span class="text-[#4B007D]"> Learn</span>
        </p>
      </div>
    </div>
    <div
      v-if="!loading && items?.length > 0"
      class="lg:!w-[70%] w-full max-w-2xl mx-auto"
      data-aos="zoom-out"
    >
      <Disclosure
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ open }"
        as="div"
        class="mb-5"
      >
        <DisclosureButton
          class="flex justify-between items-center cursor-pointer w-full px-4 py-2 text-[18px] font-[700] text-white h-[60px]"
          :class="
            open
              ? 'bg-[#E77C5A] hover:bg-[#E77C5AE5]'
              : 'bg-[#4B007D] hover:bg-[#4B017EE5]'
          "
        >
          {{ item.question }}
          <img
            alt="arrow"
            src="/arrow.png"
            class="w-[24px] h-[24px] transition-transform duration-200"
            :class="open ? 'rotate-90' : 'rotate-270'"
          />
        </DisclosureButton>
        <DisclosurePanel
          class="px-5 pt-4 pb-2 text-[16px] font-[400] text-[#202020] border-b border-[#EEEDEE]"
          data-aos="flip-down"
        >
          {{ item.answer }}
        </DisclosurePanel>
      </Disclosure>
    </div>
    <div v-if="loading" class="lg:!w-[70%] w-full max-w-2xl mx-auto">
      <UIButtonLoader class="mx-auto !my-20 block" borderColor="#4B007D" />
    </div>
    <div v-if="!loading && items?.length == 0" class="text-center my-20 m-auto">
      <p class="text-[18px] font-[500] !text-red-500 text-center">{{ $t("faq.no_faq") }}</p>
    </div>
  </div>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
const { t, locale } = useI18n();
const tokenCookie = useCookie("langua_token");
const items = ref([]);
const loading = ref(true);
onMounted(() => {
  apiRequest(
    "GET",
    "/common-questions?page=0&limit=0",
    {},
    {},
    tokenCookie.value,
    locale.value
  ).then((response) => {
    items.value = response?.data?.data;
  }).finally(() => {
    loading.value = false;
  });
});
</script>
<style scoped>
.faq_bg {
  background-image: url("/slider_top.png"), url("/slider_bottom.png");
  background-position: top 0 right 0, bottom 0 left 0;
}

@media (max-width: 1022px) {
  .faq_bg {
    background-image: none;
  }
}
</style>
