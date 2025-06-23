<template>
  <div
    class="relative py-20 bg-no-repeat responsive-bg mx-5 lg:!mx-0"
    v-if="!loading"
  >
    <div
       class="lg:!mx-20 mx-7 relative"
      v-if="
        !loading &&
        advertisements &&
        advertisements?.data?.advertisment?.length > 0
      "
    >
      <Swiper
        ref="swiperRef"
        :key="swiperKey"
        :slides-per-view="getSlidesPerView()"
        :space-between="10"
        :modules="[Autoplay, Pagination, Navigation]"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :navigation="
          $i18n.locale === 'ar'
            ? { prevEl: '.swiper-button-next', nextEl: '.swiper-button-prev' }
            : { prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }
        "
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :speed="800"
        :loop="advertisements?.data?.advertisment?.length > 1"
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
          v-if="advertisements?.data?.advertisment?.length > 0"
          v-for="(advertisement, index) in advertisements?.data?.advertisment"
          :key="index"
        >
          <div class="flex flex-wrap w-full">
            <div
              data-aos="zoom-in"
              class="bg-[#4B007D] z-50 text-white w-[100%] lg:!w-[40%] lg:!h-[390px] h-[210px] xl:!px-22 md:!px-12 px-5 lg:!py-12 py-5"
              style="background-image: url('/slider_text_bg.png')"
            >
              <h1
                class="text-[18px] 2xl:!text-[40px] xl:!text-[36px] lg:!text-[32px] font-[800] leading-[1.2] mb-2 line-clamp-2"
              >
                {{ advertisement?.name }}
              </h1>
              <p
                class="lg:!text-[16px] text-[13px] mt-4 mb-8 m-auto leading-[2] lg:!leading-[2.3] line-clamp-3 px-3"
              >
                {{ advertisement?.description }}
              </p>
              <div class="flex items-center gap-5 lg:!my-5 my-2 mx-5 lg:!mx-0">
                <NuxtLink :to="localePath('/courses')">
                  <BaseButton
                    :content="$t('S1.start_learning')"
                    border-color="white"
                    bg-color="#E77C5A"
                    width="200px"
                    :lg_space="true"
                  />
                </NuxtLink>
              </div>
            </div>
            <div
              data-aos="zoom-out"
              class="w-[100%] lg:!w-[60%] lg:!h-[390px] sm:!h-[250px] h-[187.5px] relative"
            >
              <!-- Image Media -->
              <img
                v-if="getMediaType(advertisement?.image) === 'image'"
                :src="advertisement?.image"
                alt="Advertisement Media"
                class="w-full h-full object-cover"
              />
              <!-- Video Media -->
              <video
                v-else-if="getMediaType(advertisement?.image) === 'video'"
                :src="advertisement?.image"
                class="w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline
              >
                Your browser does not support the video tag.
              </video>

              <!-- Fallback for legacy 'image' property -->
              <img
                v-else-if="advertisement?.image"
                :src="advertisement?.image"
                alt="Advertisement Image"
                class="w-full h-full object-cover"
              />

              <div
                class="absolute bottom-0 bg-[#00000033] h-[100%] w-[100%]"
              ></div>

              <div
                class="absolute bottom-0 z-[999] hidden lg:!block"
                :class="{ 'rotate-180': $i18n.locale == 'en' }"
              >
                <img
                  src="/overlay.png"
                  alt="Slider Overlay"
                  class="h-full w-[202px] z-[999]"
                />
              </div>
              <div class="absolute top-0 z-[999] block lg:!hidden">
                <img
                  src="/overlay_top.png"
                  alt="Slider Overlay"
                  class="h-full w-[100vw] z-[999]"
                />
              </div>
              <div
                class="absolute bottom-0 h-[100%] w-[100%] bg-[#00000033]"
              ></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        class="swiper-button-prev absolute !left-8 !top-[47%] -translate-y-1/2 z-40"
      ></div>
      <div
        class="swiper-button-next absolute !right-8 !top-[47%] -translate-y-1/2 z-40"
      ></div>
      <div
        v-if="advertisements?.data?.advertisment?.length > 0"
        class="swiper-pagination absolute !-bottom-[40px] left-1/2 z-40 m-auto flex justify-center gap-3 cursor-pointer"
      ></div>
    </div>
    <UIButtonLoader class="mx-auto !my-20" v-if="loading" />
  </div>
  <Popup
    :show="showMore"
    @close="showMore = false"
    type="advertisement"
    :advertisement="feature"
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
const advertisements = ref([]);
const tokenCookie = useCookie("langua_token");
const loading = ref(true);
const swiperRef = ref(null);
const swiperKey = ref(0);

// Helper function to get slides per view
const getSlidesPerView = () => {
  const dataLength = advertisements.value?.data?.advertisment?.length || 1;
  return 1;
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
    advertisements.value = await apiRequest(
      "GET",
      `/advertisements?limit=0&page=0&is_active=1`,
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
    console.error("Failed to load advertisements:", error);
    advertisements.value = [];
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

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});
const getMediaType = (mediaUrl) => {
  if (!mediaUrl) return "unknown";

  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".mkv",
    ".m4v",
  ];
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".bmp",
  ];

  const fileExtension = mediaUrl
    .toLowerCase()
    .substring(mediaUrl.lastIndexOf("."));

  if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else if (imageExtensions.includes(fileExtension)) {
    return "image";
  }

  // Default to image if extension is not recognized
  return "image";
};
</script>

<style>
.hero .swiper {
  width: 100%;
  height: 100%;
}

.hero .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero .swiper-wrapper {
  display: flex;
  align-items: center;
}
.swiper-button-next,
.swiper-button-prev {
  margin-top: 20px !important;
  height: 32px !important;
  width: 32px !important;
  color: white !important;
  background-color: #ffffff4d !important;
  border-radius: 100% !important;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: #ffffff !important;
  color: #4b007d !important;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 10px !important;
  font-weight: 600 !important;
}
/*
.swiper-button-next:after,
.swiper-button-prev:after {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
*/


.swiper-pagination-bullet-active {
  background: #4b007d !important;
}

video {
  object-fit: cover;
}
video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-panel {
  display: none !important;
}
video::-webkit-media-controls-play-button {
  display: none !important;
}
video::-webkit-media-controls-start-playback-button {
  display: none !important;
}
.responsive-bg {
  background-image: url("/slider_top.png"), url("/slider_bottom.png");
  background-repeat: no-repeat;
  background-position: top 50px right 48px, bottom 50px left 48px;
  background-size: auto;
}
@media (max-width: 1022px) {
  .responsive-bg {
    background-position: top 50px right 0px, bottom 50px left 0px;
  }
}
</style>
