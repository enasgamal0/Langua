<template>{{isSmallMenuOpen}}
  <div v-if="!isSmallMenuOpen"
    class="flex justify-between 2xl:px-60 lg:px-20 md:px-20 px-10 py-10 items-center"
  >
    <NuxtLink :to="localePath('/')"
      ><img alt="Langua Logo" src="/logo.png" class="h-[50px] w-[110px]"
    /></NuxtLink>
    <div class="flex gap-6 text-[15px] text-[#202020]">
      <NuxtLink
        :to="localePath('/')"
        class="hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out"
        >{{ $t("nav.home") }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/about')"
        class="hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out"
        >{{ $t("nav.about") }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/courses')"
        class="hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out"
        >{{ $t("nav.courses") }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/packages')"
        class="hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out"
        >{{ $t("nav.packages") }}</NuxtLink
      >
      <NuxtLink
        :to="localePath('/contact')"
        class="hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out"
        >{{ $t("nav.contact") }}</NuxtLink
      >
    </div>
    <div class="flex items-center gap-5">
      <BaseButton
        :content="$t('placement_test')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        icon="/feather.png"
      />
      <BaseButton
        :content="$t('login')"
        border-color="#4B007D"
        bg-color="#E77C5A"
        icon="/user_white.png"
      />
      <div>
        <img alt="Notifications" src="/bell.png" class="w-[24px] h-[24px]" />
      </div>
      <div class="flex gap-1">
        <img alt="Language" src="/sa_flag.png" class="w-[26px] h-[16px]" />
        <span class="text-[13px] font-[700]">{{ $t("language.current") }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const isMenuOpen = ref(false);
const isSmallMenuOpen = ref(false);
const toggleSmallMenu = () => {
  if (window.innerWidth <= 768) {
    isSmallMenuOpen.value = !isSmallMenuOpen.value;
    isMenuOpen.value = !isMenuOpen.value;
    if (isMenuOpen.value) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.classList.add('overflow-hidden');
    isSmallMenuOpen.value = true;
  } else {
    document.body.classList.remove('overflow-hidden');
    isSmallMenuOpen.value = false;
  }
};
</script>