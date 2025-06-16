<template>
  <div class="w-[279px] h-[386px] bg-white" data-aos="zoom-in">
    <!-- Header Image Section -->
    <div class="relative">
      <img :src="image" alt="Course" class="w-full h-[209px] object-cover" />
      <!-- Fav Icon -->
      <div
        class="absolute top-4 left-4 bg-white rounded-full p-2 w-[40px] h-[40px] cursor-pointer"
        @click="is_favorited = !is_favorited"
      >
        <img
          src="/heart.png"
          alt="Favorite"
          class="w-[24px] h-[24px]"
          v-if="!is_favorited"
        />
        <img
          src="/filled_heart.png"
          alt="Favorite"
          class="w-[24px] h-[24px]"
          v-else
        />
      </div>

      <!-- Rating -->
      <div
        class="absolute top-4 right-4 bg-white rounded-full w-[64px] h-[28px] flex justify-center items-center gap-1"
      >
        <span class="text-[16px] font-[700] text-[#202020]">{{ rating }}</span>
        <img src="/star.png" alt="Rate" class="w-[20px] h-[20px]" />
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-3 border-x border-b border-[#E77C5A]">
      <h1 class="text-[18px] font-[700] text-[#202020] mb-2 line-clamp-1">
        {{ title }}
      </h1>

      <!-- Details Grid -->
      <div class="mb-2">
        <div class="flex flex-wrap justify-between">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="/icon1.png" alt="Level" class="w-[24px] h-[24px]" />
              <span class="text-[13px]"
                >{{ $t("S4.stage") }}:
                <span class="font-[700]">{{ stage }}</span></span
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="/icon2.png" alt="Grade" class="w-[24px] h-[24px]" />
              <span class="text-[13px]"
                >{{ $t("S4.grade") }}:
                <span class="font-[700]">{{ grade }}</span></span
              >
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center">
            <img src="/icon3.png" alt="Level" class="w-[24px] h-[24px]" />
            <span class="text-[13px]"
              >{{ $t("S4.level") }}:
              <span class="font-[700]">{{ level }}</span></span
            >
          </div>
        </div>
      </div>

      <BaseButton
        :content="$t('S4.course_details')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        width="200px"
        class="m-auto !mb-2 z-50"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  grade: {
    type: String,
  },
  stage: {
    type: String,
  },
  level: {
    type: String,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
    default: "/course1.png",
  },
  is_fav: {
    type: Boolean,
    default: false,
  },
});
const is_favorited = ref(props.is_fav);
</script>
