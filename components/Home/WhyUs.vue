<template>
  <div
    class="bg-[#4B007D] text-center px-12 py-20 bg-no-repeat relative why_us"
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
    <div class="flex flex-wrap gap-12 justify-center text-center" v-if="!loading && advantages && advantages?.data?.data?.length > 0">
      <Swiper
        ref="swiperRef"
        :key="swiperKey"
        :slides-per-view="getSlidesPerView()"
        :breakpoints="{
          0: { slidesPerView: 1 },
          900: {
            slidesPerView: Math.min(2, advantages?.data?.data?.length || 1),
          },
          1200: {
            slidesPerView: Math.min(3, advantages?.data?.data?.length || 1),
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
        :speed="800"
        :loop="advantages?.data?.data?.length > 1"
        :observer="true"
        :observe-parents="true"
        :observe-slide-children="true"
        :update-on-window-resize="true"
        :resize-observer="true"
        class="w-full h-full"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-if="advantages?.data?.data?.length > 0"
          v-for="(advantage, index) in advantages?.data?.data"
          :key="index"
        >
          <div
            class="bg-white w-[363px] h-[382px] pt-12 bg-no-repeat m-auto"
            :data-aos="index % 2 == 0 ? `zoom-out` : `zoom-in`"
            style="
              background-image: url('/slider_top.png'),
                url('/slider_bottom.png');
              background-position: top 0 right 0, bottom 0 left 0;
            "
          >
            <img
              :src="advantage?.image"
              alt="Why Us"
              class="w-[118px] h-[128px] bottom-0 m-auto object-contain"
            />
            <div class="px-10">
              <h1 class="text-[24px] font-[800] my-3 line-clamp-2">
                {{ advantage?.name }}
              </h1>
              <div>
                <p
                  :class="[
                    'text-[16px] font-[400] text-[#202020] line-clamp-3',
                  ]"
                >
                  {{ advantage?.description }}
                </p>

                <button
                  v-if="advantage?.description?.length > 110"
                  @click="(showMore = true), (feature = advantage)"
                  class="mt-2 text-[#4B007D] text-sm font-medium cursor-pointer"
                >
                  {{ $t("S3.show_more") }}
                </button>
              </div>
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
    <UIButtonLoader class="mx-auto !my-20" v-if="loading" />

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
  <Popup
    :show="showMore"
    @close="showMore = false"
    type="advantage"
    :advantage="feature"
  />
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

const showMore = ref(false);
const feature = ref({});
const { locale } = useI18n();
const advantages = ref([]);
const tokenCookie = useCookie("langua_token");
const loading = ref(true);
const swiperRef = ref(null);
const swiperKey = ref(0);

// Helper function to get slides per view
const getSlidesPerView = () => {
  const dataLength = advantages.value?.data?.data?.length || 1;
  if (dataLength === 1) return 1;
  if (dataLength === 2) return 2;
  return 3;
};

// Swiper event handlers
const onSwiper = (swiper) => {
  // Force update after swiper initialization
  nextTick(() => {
    swiper.update();
  });
};

const onSlideChange = () => {
  // Handle slide change if needed
};

// Force swiper update function
const updateSwiper = () => {
  if (swiperRef.value && swiperRef.value.$el) {
    swiperRef.value.$el.swiper.update();
  }
  // Force re-render by updating key
  swiperKey.value++;
};

onMounted(async () => {
  try {
    loading.value = true;
    advantages.value = await apiRequest(
      "GET",
      `/advantage?limit=0&page=0`,
      {},
      {},
      tokenCookie.value,
      locale.value
    );
    
    // Wait for DOM to be ready then update swiper
    await nextTick();
    setTimeout(() => {
      updateSwiper();
    }, 100);
    
  } catch (error) {
    console.error("Failed to load advantages:", error);
    advantages.value = [];
  } finally {
    loading.value = false;
  }
});

// Watch for window resize and update swiper
onMounted(() => {
  const handleResize = () => {
    setTimeout(() => {
      updateSwiper();
    }, 100);
  };
  
  window.addEventListener('resize', handleResize);
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.why_us .swiper {
  width: 100%;
  height: 100%;
}

.why_us .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.why_us .swiper-wrapper {
  display: flex;
  align-items: center;
}
</style>