<template>
  <div
    class="relative py-20 bg-no-repeat"
    style="
      background-image: url('/slider_top.png'), url('/slider_bottom.png');
      background-position: top 50px right 48px, bottom 50px left 48px;
    "
  >
    <div class="lg:mx-20 mx-10 relative">
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
          v-if="advertisements?.data?.data?.length > 0"
          v-for="(advertisement, index) in advertisements?.data?.data"
          :key="index"
        >
          <div class="flex flex-wrap w-full">
            <div
              class="bg-[#4B007D] z-50 text-white w-[50%] lg:!w-[40%] h-[390px] px-22 py-12"
              style="background-image: url('/slider_text_bg.png')"
            >
              <h1
                class="text-[40px] font-[800] leading-[1.2] mb-2 line-clamp-2"
              >
                {{ advertisement?.name }}
              </h1>
              <p
                class="text-[16px] mt-4 mb-8 m-auto leading-[2.3] line-clamp-4 px-3"
              >
                {{ advertisement?.description }}
              </p>
              <div class="flex items-center gap-5 my-5">
                <NuxtLink :to="localePath('/courses')">
                  <BaseButton
                    :content="$t('S1.start_learning')"
                    border-color="white"
                    bg-color="#E77C5A"
                    width="200px"
                  />
                </NuxtLink>
              </div>
            </div>
            <div class="w-[50%] lg:!w-[60%] h-[390px] relative">
              <img
                :src="advertisement?.advertisement"
                alt="Spark Image"
                class="w-full h-full"
              />
              <div
                class="absolute bottom-0"
                :class="{ 'rotate-180': $i18n.locale == 'en' }"
              >
                <img
                  src="/overlay.png"
                  alt="Slider Layout"
                  class="h-full w-[202px]"
                />
              </div>
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
const advertisements = {
  status: 200,
  message: "--",
  data: {
    data: [
      {
        id: 3,
        name: "مؤثرين حقيقيين",
        name_ar: "مؤثرين حقيقيين",
        name_en: "Real influencers",
        description:
          "من المرحلة الابتدائية إلى الثانوية، منصة Langua Learn تساعدك على تطوير مهارات اللغة الإنجليزية بأسلوب ممتع وتفاعلي.",
        description_ar:
          "هل تبحث عن مؤثرين حقيقيين يروجون لعلامتك التجارية باحترافية؟",
        description_en:
          "Are you looking for real influencers who promote your brand professionally",
        advertisement: "/hero_section.jpg",
        created_at: "2025-05-28",
      },
      {
        id: 2,
        name: "علامات تجارية متنوعة",
        name_ar: "علامات تجارية متنوعة",
        name_en: "Various brands",
        description:
          "من المرحلة الابتدائية إلى الثانوية، منصة Langua Learn تساعدك على تطوير مهارات اللغة الإنجليزية المرحلة الابتدائية المرحلة الابتدائية المرحلة الابتدائية بأسلوب ممتع وتفاعلي.",
        description_ar: "تواصل مباشر مع علامات تجارية متنوعة",
        description_en: "Direct contact with various brands",
        advertisement:
          "https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg?semt=ais_hybrid&w=740",
        created_at: "2025-05-28",
      },
      {
        id: 1,
        name: "أكبر العلامات التجارية",
        name_ar: "أكبر العلامات التجارية",
        name_en: "The largest brands",
        description: "الآن يمكنك التعاون مع أكبر العلامات التجارية عبر منصتنا",
        description_ar:
          "الآن يمكنك التعاون مع أكبر العلامات التجارية عبر منصتنا",
        description_en:
          "Now you can collaborate with the biggest brands via our platform",
        advertisement:
          "https://school-education.ec.europa.eu/sites/default/files/styles/oe_theme_full_width/public/2025-05/course_ai_and_data_in_education.png?itok=RHk5qgp3",
        created_at: "2025-05-28",
      },
    ],
    links: {
      first:
        "https://backend.spark.moltaqadev.com/client-api/v1/advertisements?page=1",
      last: "https://backend.spark.moltaqadev.com/client-api/v1/advertisements?page=1",
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [
        {
          url: null,
          label: "&laquo; السابق",
          active: false,
        },
        {
          url: "https://backend.spark.moltaqadev.com/client-api/v1/advertisements?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "التالي &raquo;",
          active: false,
        },
      ],
      path: "https://backend.spark.moltaqadev.com/client-api/v1/advertisements",
      per_page: 10,
      to: 3,
      total: 3,
    },
    status: 200,
  },
  errors: {},
};
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
</style>
