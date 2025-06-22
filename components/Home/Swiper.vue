<template>
  <div
    class="relative py-20 bg-no-repeat responsive-bg mx-5 lg:!mx-0"
    v-if="!loading"
  >
    <div class="lg:!mx-20 mx-7 relative">
      <Swiper
         v-if="advertisements || advertisements.length > 0"
        :slides-per-view="1"
        :space-between="10"
        :modules="[Autoplay, Pagination, Navigation]"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :navigation="{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        effect="fade"
        :speed="800"
        loop
        class="w-full h-full"
        @swiper="onSwiper"
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
      
      <div class="flex flex-wrap w-full" v-if="!advertisements || advertisements?.length == 0">
        <div
          data-aos="zoom-in"
          class="bg-[#4B007D] z-50 text-white w-[100%] lg:!w-[40%] lg:!h-[390px] h-[210px] xl:!px-22 md:!px-12 px-5 lg:!py-12 py-5"
          style="background-image: url('/slider_text_bg.png')"
        >
          <h1
            class="text-[18px] 2xl:!text-[40px] xl:!text-[36px] lg:!text-[32px] font-[800] leading-[1.2] mb-2 line-clamp-2"
          >
            {{ $t("S1.start_learning") }}
          </h1>
          <p
            class="lg:!text-[16px] text-[13px] mt-4 mb-8 m-auto leading-[2] lg:!leading-[2.3] line-clamp-3 px-3"
          >
            {{ $t("S1.desc") }}
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
            src="/hero_section.jpg"
            alt="Advertisement Media"
            class="w-full h-full object-cover"
          />

          <div class="absolute bottom-0 bg-[#00000033] h-[100%] w-[100%]"></div>

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
          <div class="absolute bottom-0 h-[100%] w-[100%] bg-[#00000033]"></div>
        </div>
      </div>

      <!-- Navigation elements - moved outside conditional and using v-show -->
      <div
        v-show="advertisements?.data?.advertisment?.length > 0"
        class="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
      <div
        v-show="advertisements?.data?.advertisment?.length > 0"
        class="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
      <div
        v-show="advertisements?.data?.advertisment?.length > 0"
        class="swiper-pagination absolute !-bottom-[40px] left-1/2 -translate-x-1/2 z-40 m-auto flex gap-2 cursor-pointer"
      ></div>
    </div>
  </div>
  <UIButtonLoader :borderColor="`#4B007D`" class="mx-auto !my-20" v-else />
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { locale } = useI18n();
const tokenCookie = useCookie("langua_token");
const advertisements = ref([]);
const loading = ref(true);
const swiperInstance = ref(null);

// Function to determine media type based on file extension
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

  return "image";
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  
  // Force navigation update after swiper is ready
  nextTick(() => {
    if (swiper.navigation) {
      swiper.navigation.update();
    }
  });
};

onMounted(async () => {
  loading.value = true;
  try {
    advertisements.value = await apiRequest(
      "GET",
      `/advertisements?limit=0&page=0&is_active=1`,
      {},
      {},
      tokenCookie.value,
      locale.value
    );
    
    // Force navigation update after data is loaded
    await nextTick();
    if (swiperInstance.value?.navigation) {
      swiperInstance.value.navigation.update();
    }
  } catch (error) {
    console.error("Failed to load advertisements:", error);
    advertisements.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.swiper-pagination-bullet-active {
  background: #4b007d !important;
}
.swiper-button-next,
.swiper-button-prev {
  margin-top: 20px !important;
  height: 32px !important;
  width: 32px !important;
  color: white !important;
  background-color: #ffffff4d !important;
  border-radius: 100% !important;
  /* Ensure buttons are clickable */
  pointer-events: auto !important;
  cursor: pointer !important;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 10px !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: #ffffff !important;
  color: #4b007d !important;
}

/* Ensure navigation buttons are not disabled */
.swiper-button-disabled {
  opacity: 0.35 !important;
  cursor: auto !important;
  pointer-events: none !important;
}

/* Video specific styles */
video {
  object-fit: cover;
}

/* Ensure videos don't show controls */
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