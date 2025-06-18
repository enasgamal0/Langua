<template>
  <div>
    <BreadCrumb
      :title="$t('bread_crumb.forgot_password')"
      :current="$t('bread_crumb.forgot_password')"
      :prev="$t('bread_crumb.login')"
      :link="localePath('/auth/login')"
    />
    <div
      class="bg-no-repeat py-10 lg:px-20 lg:m-20 m-10"
      style="
        background-image: url('/slider_top.png'), url('/slider_bottom.png');
        background-position: top 0 right 0, bottom 0 left 0;
      "
    >
      <img
        alt="Successful Process"
        src="/success.png"
        class="w-[116px] h-[120px] m-auto !mb-12"
      />
      <div class="text-[18px] text-[#545454] text-center w-[50%] m-auto">
        <p class="font-[800] text-[24px] text-[#202020] mb-4">{{ $t("auth.password_success_title") }}</p>
        <p class="mb-2">{{ $t("auth.password_success1") }}</p>
        <p>{{ $t("auth.password_success2") }}</p>
        <!-- Submit Button -->
      <NuxtLink :to="localePath('/auth/login')">
        <BaseButton
          :content="$t('auth.go_to_login')"
          border-color="#E77C5A"
          bg-color="#4B007D"
          class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
          :lg_reversed_space="true"
          width="100%"
          font_size="18px"
        />
      </NuxtLink>
      </div>
      
    </div>
  </div>
</template>
