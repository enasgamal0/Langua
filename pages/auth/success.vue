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
      <div class="text-[18px] text-[#545454] text-center w-[60%] lg:!w-[50%] 2xl:!w-[35%] m-auto">
        <p
          v-if="route?.query?.type == 'register'"
          class="font-[800] text-[24px] text-[#202020] mb-4"
        >
          {{ $t("auth.register_success_title") }}
        </p>
        <p v-if="route?.query?.type == 'register'" class="mb-2 leading-[2.3]">
          {{ $t("auth.register_success") }}
        </p>
        <p
          v-if="route?.query?.type == 'password'"
          class="font-[800] text-[24px] text-[#202020] mb-4"
        >
          {{ $t("auth.password_success_title") }}
        </p>
        <p v-if="route?.query?.type == 'password'" class="mb-2">
          {{ $t("auth.password_success1") }}
        </p>
        <p v-if="route?.query?.type == 'password'">
          {{ $t("auth.password_success2") }}
        </p>
        <!-- Submit Button -->
        <NuxtLink :to="localePath('/auth/login')">
          <BaseButton
            :content="type == 'password' ? $t('auth.go_to_login') : $t('auth.go_to_home')"
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
<script setup>
const route = useRoute();
const localePath = useLocalePath();

onMounted(() => {
  if (route?.query?.type == "register") {
    setTimeout(() => {
      navigateTo(localePath("/"));
    }, 5000);
  }
});
</script>