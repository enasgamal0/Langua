<template>
  <div
    class="flex flex-wrap bg-[#4B007D] text-white bg-no-repeat"
    style="
      background-image: url('/join_us_left.png'), url('/join_us_bottom.png');
      background-position: left 0 top 0, bottom 0 left 10%;
    "
  >
    <div
      data-aos="fade-up"
      class="lg:!w-[50%] w-[100%] bg-no-repeat"
      style="
        background-image: url('/join_us_right_bg.png');
        background-position: center center;
      "
    >
      <img alt="Join Us" src="/join_us.png" class="m-auto h-full" />
    </div>
    <div
      data-aos="fade-down"
      class="xl:!w-[30%] lg:!w-[40%] w-[100%] my-20 mx-10 lg:mx-2 xl:mx-0"
    >
      <h1 class="lg:!text-[35px] text-[25px] font-[800]">
        {{ $t("S5.title") }}
      </h1>
      <p class="lg:!text-[20px] text-[16px] font-[400]">{{ $t("S5.desc") }}</p>
    </div>
  </div>
</template>
