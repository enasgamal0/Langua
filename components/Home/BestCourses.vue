<template>
  <div
    class="bg-no-repeat lg:m-10 2xl:m-20 m-8"
    style="
      background-image: url('/slider_top.png'), url('/slider_bottom.png');
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <div class="text-[#202020] text-center">
      <h1 class="text-[32px] font-[800]">
        <span v-if="locale == 'ar'" class="mx-2">{{ $t("S4.courses") }}</span>
        <span
          style="
            background-image: url('/top_rated_title.png');
          "
          class="bg-no-repeat inline-block w-[213px] h-[76px] text-white pt-5"
          >{{ props.type == 'top_rated' ? $t("S4.top_rated") : $t("S4.recent") }}</span
        >
        <span v-if="locale == 'en'" class="mx-2">{{ $t("S4.courses") }}</span>
      </h1>
      <p class="text-[18px] font-[400] mt-1 mb-12">{{ $t("S4.subtitle") }}</p>
    </div>
    <div class="lg:!flex hidden flex-wrap gap-12 px-40 xl:!px-60 2xl:!px-0 justify-center text-center">
      <CourseCard
        v-for="course in courses"
        :key="course.title"
        :id="course.id"
        :title="course.title"
        :grade="course.grade"
        :stage="course.stage"
        :level="course.level"
        :rating="course.rating"
        :image="course.image"
        :is_fav="course.is_fav"
      />
    </div>
    <div class="lg:!hidden flex flex-wrap justify-center gap-5 lg:!h-[500px] h-[450px] relative">
      <Swiper
        :slides-per-view="
          courses?.length == 1
            ? 1
            : courses?.length == 2
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
        <SwiperSlide v-for="course in courses" :key="course.title">
          <CourseCard
            :id="course.id"
            :title="course.title"
            :grade="course.grade"
            :stage="course.stage"
            :level="course.level"
            :rating="course.rating"
            :image="course.image"
            :is_fav="course.is_fav"
            class="mx-auto"
          />
        </SwiperSlide>
      </Swiper>
      <div
        class="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-40 !bg-[#4B007D] hover:!bg-white hover:border hover:border-[#4B007D]"
      ></div>
      <div
        class="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-40 !bg-[#4B007D] hover:!bg-white hover:border hover:border-[#4B007D]"
      ></div>
    </div>
    <NuxtLink :to="localePath('/courses')">
      <BaseButton
        :content="$t('S4.show_all')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        width="200px"
        class="m-auto lg:!mt-20 z-50 !mb-20"
        :lg_reversed_space="true"
      />
    </NuxtLink>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
const { t, locale } = useI18n();

const courses = [
  {
    id: 1,
    title: t("S4.course1_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course1.png",
    is_fav: true,
  },
  {
    id: 2,
    title: t("S4.course2_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course2.png",
    is_fav: false,
  },
  {
    id: 3,
    title: t("S4.course3_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course3.png",
    is_fav: true,
  },
  {
    id: 4,
    title: t("S4.course4_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course4.png",
    is_fav: true,
  },
];

const props = defineProps({
    type: {
      type: String,
    },
  })
</script>
