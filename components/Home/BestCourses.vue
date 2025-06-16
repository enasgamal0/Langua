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
    <div class="flex flex-wrap justify-center gap-5">
      <CourseCard
        v-for="course in courses"
        :key="course.title"
        :title="course.title"
        :grade="course.grade"
        :stage="course.stage"
        :level="course.level"
        :rating="course.rating"
        :image="course.image"
        :is_fav="course.is_fav"
      />
    </div>
    <NuxtLink :to="localePath('/courses')">
      <BaseButton
        :content="$t('S4.show_all')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        width="200px"
        class="m-auto !mt-20 z-50 !mb-20"
        :lg_reversed_space="true"
      />
    </NuxtLink>
  </div>
</template>
<script setup>
const { t, locale } = useI18n();

const courses = [
  {
    title: t("S4.course1_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course1.png",
    is_fav: true,
  },
  {
    title: t("S4.course2_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course2.png",
    is_fav: false,
  },
  {
    title: t("S4.course3_title"),
    grade: t("S4.course_grade"),
    stage: t("S4.course_stage"),
    level: t("S4.course_level"),
    rating: 4.5,
    image: "/course3.png",
    is_fav: true,
  },
  {
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
