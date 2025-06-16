<template>
  <BreadCrumb
    :title="$t('bread_crumb.faq')"
    :current="$t('bread_crumb.faq')"
    :prev="$t('nav.home')"
  />
  <div
    class="flex m-20 bg-no-repeat py-20 px-40"
    style="
      background-image: url('/slider_top.png'), url('/slider_bottom.png');
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <div>
      <img alt="FAQ" src="/faq.png" class="w-[120px] h-[120px] m-auto" data-aos="zoom-in" />
      <div class="text-center">
        <h1 class="text-[32px] font-[700] text-[#4B007D] my-5">{{ $t('bread_crumb.faq') }}</h1>
        <p class="text-[18px] text-[#202020] mb-3">{{ $t('faq.desc') }}</p>
        <p class="font-[800] text-[18px]"><span class="text-[#E77C5A]">Langua</span><span class="text-[#4B007D]"> Learn</span></p>
      </div>
    </div>
  </div>
</template>
