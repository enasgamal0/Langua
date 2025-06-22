<template>
  <div
    class="relative py-20 bg-no-repeat responsive-bg mx-5 lg:!mx-0"
  >
    <div class="lg:!mx-20 mx-7 relative">
      <Swiper
        :slides-per-view="1"
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
          v-if="advertisements?.data?.advertisment?.length > 0"
          v-for="(advertisement, index) in advertisements?.data?.advertisment"
          :key="index"
        >
          <div class="flex flex-wrap w-full">
            <div
              data-aos="zoom-in"
              class="bg-[#4B007D] z-50 text-white w-[100%] lg:!w-[40%] lg:!h-[390px] h-[187.5px] lg:!px-22 px-5 lg:!py-12 py-5"
              style="background-image: url('/slider_text_bg.png')"
            >
              <h1
                class="text-[18px] lg:!text-[40px] font-[800] leading-[1.2] mb-2 line-clamp-2"
              >
                {{ advertisement?.name }}
              </h1>
              <p
                class="lg:!text-[16px] text-[12px] mt-4 mb-8 m-auto leading-[2.3] line-clamp-3 px-3"
              >
                {{ advertisement?.description }}aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
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
              class="w-[100%] lg:!w-[60%] lg:!h-[390px] h-[187.5px] relative"
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
              >
              </div>

              <div
                class="absolute bottom-0 z-[999]"
                :class="{ 'rotate-180': $i18n.locale == 'en' }"
              >
                <img
                  src="/overlay.png"
                  alt="Slider Layout"
                  class="h-full w-[202px] z-[999]"
                />
              </div>
              <div
                class="absolute bottom-0 h-[100%] w-[100%] bg-[#00000033]"
              ></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Pagination & Navigation elements -->
      <div
        class="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
      <div
        class="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-40"
      ></div>
      <div
        class="swiper-pagination1 absolute !-bottom-[40px] left-1/2 -translate-x-1/2 z-40"
      ></div>
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
const tokenCookie = useCookie("langua_token");
const advertisements = ref([]);

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

  // Default to image if extension is not recognized
  return "image";
};

onMounted(async () => {
  try {
    advertisements.value = await apiRequest(
      "GET",
      `/advertisements?limit=0&page=0`,
      {},
      {},
      tokenCookie.value,
      locale.value
    );
  } catch (error) {
    console.error("Failed to load advertisements:", error);
    advertisements.value = [];
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
  background-image: url('/slider_top.png'), url('/slider_bottom.png');
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
