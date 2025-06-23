<template>
  <div
    class="bg-no-repeat 2xl:m-10 2xl:m-20 m-8 best_courses"
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
    <div class="2xl:!flex hidden flex-wrap gap-12 px-40 xl:!px-60 2xl:!px-0 justify-center text-center">
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
    <div class="2xl:!hidden flex flex-wrap justify-center gap-5 lg:!h-[500px] h-[450px] relative lg:!px-30 md:!px-24 px-5">
      <Swiper
        ref="swiperRef"
        :key="swiperKey"
        :slides-per-view="getSlidesPerView()"
        :breakpoints="{
          0: { slidesPerView: 1 },
          900: {
            slidesPerView: Math.min(2, courses?.length || 1),
          },
          1200: {
            slidesPerView: Math.min(3, courses?.length || 1),
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
        :loop="courses?.length > 1"
        :observer="true"
        :observe-parents="true"
        :observe-slide-children="true"
        :update-on-window-resize="true"
        :resize-observer="true"
        class="w-full h-full"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
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
        class="swiper-button-prev absolute !left-5 lg:!left-0 top-1/2 -translate-y-1/2 z-40 !bg-[#4B007D] hover:!bg-white hover:border hover:border-[#4B007D]"
      ></div>
      <div
        class="swiper-button-next absolute !right-5 lg:!right-0  top-1/2 -translate-y-1/2 z-40 !bg-[#4B007D] hover:!bg-white hover:border hover:border-[#4B007D]"
      ></div>
    </div>
    <NuxtLink :to="localePath('/courses')">
      <BaseButton
        :content="$t('S4.show_all')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        width="200px"
        class="m-auto 2xl:!mt-10 lg:!-mt-3 z-50 !mb-20"
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

const swiperRef = ref(null);
const swiperKey = ref(0);

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
});

// Helper function to get slides per view
const getSlidesPerView = () => {
  const dataLength = courses?.length || 1;
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
};

const updateSwiper = () => {
  if (swiperRef.value && swiperRef.value.$el) {
    swiperRef.value.$el.swiper.update();
    swiperRef.value.$el.swiper.updateSize();
    swiperRef.value.$el.swiper.updateSlides();
  }
  swiperKey.value++;
};

onMounted(() => {
  setTimeout(() => {
    updateSwiper();
  }, 100);
  
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

watch(locale, () => {
  nextTick(() => {
    updateSwiper();
  });
});
</script>

<style>
.best_courses .swiper {
  width: 100%;
  height: 100%;
}

.best_courses .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.best_courses .swiper-wrapper {
  display: flex;
  align-items: center;
}

.best_courses.swiper-slide {
  flex-shrink: 0;
}
</style>