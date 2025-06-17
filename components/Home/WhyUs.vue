<template>
  <div
    class="bg-[#4B007D] text-center px-12 py-20 bg-no-repeat"
    style="
      background-image: url('/why_us_top.png'), url('/why_us_bottom.png');
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <div class="text-white pb-5">
      <h1 class="text-[32px] font-[800]">
        {{ $t("S3.title") }}
        <span
          style="background-image: url('/why_us_title.png');"
          class="bg-no-repeat inline-block w-[233px] h-[75px] pt-4"
          >Langua Learn<span v-if="locale == 'ar'">؟</span><span v-if="locale == 'en'">?</span></span
        >
      </h1>
      <p class="text-[18px] font-[400] my-8">{{ $t("S3.subtitle") }}</p>
    </div>
    <div class="flex flex-wrap gap-12 justify-center text-center">
      <div
        class="bg-white w-[363px] h-[382px] pt-12 bg-no-repeat"
        data-aos="zoom-in"
        style="
          background-image: url('/slider_top.png'), url('/slider_bottom.png');
          background-position: top 0 right 0, bottom 0 left 0;
        "
      >
        <img
          src="/why_us1.png"
          alt="Why Us"
          class="w-[118px] h-[128px] m-auto"
        />
        <div class="px-10">
          <h1 class="text-[24px] font-[800] my-3 line-clamp-2">
            {{ $t("S3.title1") }}
          </h1>
          <p class="text-[16px] font-[400] text-[#202020] line-clamp-3">
            {{ $t("S3.desc1") }}
          </p>
        </div>
      </div>
      <div
        class="bg-white w-[363px] h-[382px] pt-12 bg-no-repeat"
        data-aos="zoom-out"
        style="
          background-image: url('/slider_top.png'), url('/slider_bottom.png');
          background-position: top 0 right 0, bottom 0 left 0;
        "
      >
        <img
          src="/why_us2.png"
          alt="Why Us"
          class="w-[118px] h-[128px] m-auto"
        />
        <div class="px-12">
          <h1 class="text-[24px] font-[800] my-3 line-clamp-2">
            {{ $t("S3.title2") }}
          </h1>
          <p class="text-[16px] font-[400] text-[#202020] line-clamp-3">
            {{ $t("S3.desc2") }}
          </p>
        </div>
      </div>
      <div
        class="bg-white w-[363px] h-[382px] pt-12 bg-no-repeat"
        data-aos="zoom-in"
        style="
          background-image: url('/slider_top.png'), url('/slider_bottom.png');
          background-position: top 0 right 0, bottom 0 left 0;
        "
      >
        <img
          src="/why_us3.png"
          alt="Why Us"
          class="w-[118px] h-[128px] m-auto"
        />
        <div class="px-10">
          <h1 class="text-[24px] font-[800] my-3 line-clamp-2">
            {{ $t("S3.title3") }}
          </h1>
          <p class="text-[16px] font-[400] text-[#202020] line-clamp-3">
            {{ $t("S3.desc3") }}
          </p>
        </div>
      </div>
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
const { locale } = useI18n();
</script>