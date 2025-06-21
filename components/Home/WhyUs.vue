<template>
  <div
    class="bg-[#4B007D] text-center px-12 py-20 bg-no-repeat relative"
    style="
      background-image: url('/why_us_top.png'), url('/why_us_bottom.png');
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <div class="text-white pb-5">
      <h1 class="text-[32px] font-[800]">
        {{ $t("S3.title") }}
        <span
          style="background-image: url('/why_us_title.png')"
          class="bg-no-repeat inline-block w-[233px] h-[75px] pt-4"
          >Langua Learn<span v-if="locale == 'ar'">؟</span
          ><span v-if="locale == 'en'">?</span></span
        >
      </h1>
      <p class="text-[18px] font-[400] my-8">{{ $t("S3.subtitle") }}</p>
    </div>
    <div class="flex flex-wrap gap-12 justify-center text-center">
      <Swiper
        :slides-per-view="
          advantages?.data?.data?.length == 1
            ? 1
            : advantages?.data?.data?.length == 2
            ? 2
            : 3
        "
        :breakpoints="{
          0: { slidesPerView: 1 },
          900: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }"
        :space-between="10"
        :modules="[Autoplay, Pagination, Navigation]"
        :pagination="{ el: '.swiper-pagination1', clickable: true }"
        :navigation="
          $i18n.locale === 'ar'
            ? { prevEl: '.swiper-button-next', nextEl: '.swiper-button-prev' }
            : { prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }
        "
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        effect="fade"
        :speed="800"
        loop
        class="w-full h-full"
      >
        <SwiperSlide
          v-if="advantages?.data?.data?.length > 0"
          v-for="(advantage, index) in advantages?.data?.data"
          :key="index"
        >
          <div
            class="bg-white w-[363px] h-[382px] pt-12 bg-no-repeat m-auto"
            data-aos="zoom-in"
            style="
              background-image: url('/slider_top.png'),
                url('/slider_bottom.png');
              background-position: top 0 right 0, bottom 0 left 0;
            "
          >
            <img
              :src="advantage?.image"
              alt="Why Us"
              class="w-[118px] h-[128px] m-auto object-contain"
            />
            <div class="px-10">
              <h1 class="text-[24px] font-[800] my-3 line-clamp-2">
                {{ advantage?.name }}
              </h1>
              <p class="text-[16px] font-[400] text-[#202020] line-clamp-3">
                {{ advantage?.description }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        class="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
      <div
        class="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
    </div>
    
    <div class="mt-12">
      <NuxtLink :to="localePath('/courses')" class="block">
        <BaseButton
          :content="$t('S3.start')"
          border-color="white"
          bg-color="#E77C5A"
          width="200px"
          class="mt-8 z-50 m-auto text-[18px]"
          :lg_reversed_space="true"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { locale } = useI18n();
const advantages = ref([]);
const tokenCookie = useCookie("langua_token");
onMounted(async () => {
  try {
    advantages.value = await apiRequest(
      "GET",
      `/advantage?limit=0&page=0`,
      {},
      {},
      tokenCookie.value,
      locale.value
    );
  } catch (error) {
    console.error("Failed to load advantages:", error);
    advantages.value = [];
  }
});
</script>
