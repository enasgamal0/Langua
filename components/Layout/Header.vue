<template>
  <header class="py-6 px-6 lg:px-8 xl:px-20 2xl:px-60 xl:py-7 border-b border-[#EEEDEE]">
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="outline-none">
        <img alt="Langua Logo" src="/logo.png" class="h-[50px] w-[110px] outline-none" data-aos="zoom-in" />
      </NuxtLink>

      <!-- Desktop Menu -->
      <nav class="hidden lg:!flex xl:gap-6 gap-3 text-[15px] text-[#202020]">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="localePath(item.path)"
          :class="[
            'hover:scale-[1.04] hover:text-[#4B007D] transition duration-300 ease-in-out',
            route.path === localePath(item.path)
              ? 'text-[#4B007D] font-bold'
              : '',
          ]"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>

      <!-- Right Actions (Desktop) -->
      <div class="hidden lg:!flex items-center gap-5">
        <BaseButton
          :content="$t('nav.placement_test')"
          border-color="#E77C5A"
          bg-color="#4B007D"
          icon="/feather.png"
        />
        <NuxtLink :to="localePath('/auth/login')">
          <BaseButton
            :content="$t('nav.login')"
            border-color="#4B007D"
            bg-color="#E77C5A"
            icon="/user_white.png"
          />
        </NuxtLink>
        <img src="/bell.png" class="w-[24px] h-[24px] cursor-pointer" />

        <!-- Language Dropdown -->
        <div class="relative" ref="langDropdownRef">
          <div class="flex gap-1 cursor-pointer" @click="toggleLangDropdown">
            <img
              :src="locale === 'en' ? '/usa_flag.png' : '/sa_flag.png'"
              class="w-[26px] h-[16px]"
            />
            <span class="text-[13px] font-[700]">{{
              $t("language.current")
            }}</span>
            <img src="/arrow_down.png" class="w-[6px] h-[4px] m-auto" />
          </div>
          <div
            v-if="isLangDropdownOpen"
            class="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-50 w-28"
          >
            <div
              class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              @click="changeLanguage('en')"
            >
              <img src="/usa_flag.png" class="w-[20px] h-[14px]" />
              <span class="text-sm font-medium">English</span>
            </div>
            <div
              class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              @click="changeLanguage('ar')"
            >
              <img src="/sa_flag.png" class="w-[20px] h-[14px]" />
              <span class="text-sm font-medium">العربية</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Burger Icon (Mobile) -->
      <div class="lg:hidden cursor-pointer" @click="toggleSmallMenu">
        <img src="/bars.svg" class="w-[24px] h-[24px]" />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isSmallMenuOpen"
      class="lg:!hidden mt-4 flex flex-col gap-4 text-[#202020] transition-all duration-300 h-[calc(100vh-64px)] pt-8"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="localePath(item.path)"
        :class="[
          'py-2 border-b border-gray-200 hover:text-[#4B007D]',
          route.path === localePath(item.path)
            ? 'text-[#4B007D] font-bold'
            : '',
        ]"
        @click="toggleSmallMenu"
      >
        {{ $t(item.label) }}
      </NuxtLink>

      <div class="flex items-center gap-5 my-5">
        <BaseButton
          :content="$t('nav.placement_test')"
          border-color="#E77C5A"
          bg-color="#4B007D"
          icon="/feather.png"
        />
        <NuxtLink :to="localePath('/auth/login')">
          <BaseButton
            :content="$t('nav.login')"
            border-color="#4B007D"
            bg-color="#E77C5A"
            icon="/user_white.png"
          />
        </NuxtLink>
      </div>
      <div
        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="changeLanguage('en')"
        v-if="locale === 'ar'"
      >
        <img src="/usa_flag.png" class="w-[20px] h-[14px]" />
        <span class="text-sm font-medium">English</span>
      </div>
      <div
        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="changeLanguage('ar')"
        v-if="locale === 'en'"
      >
        <img src="/sa_flag.png" class="w-[20px] h-[14px]" />
        <span class="text-sm font-medium">العربية</span>
      </div>
    </div>
  </header>
</template>
<script setup>
const { locale, setLocale } = useI18n();
const isMenuOpen = ref(false);
const isSmallMenuOpen = ref(false);
const isLangDropdownOpen = ref(false);
const langDropdownRef = ref(null);
const route = useRoute();

const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

const changeLanguage = async (lang) => {
  isLangDropdownOpen.value = false;
  if (lang !== locale.value) {
    await setLocale(lang);
  }
};

const handleClickOutside = (e) => {
  if (
    isLangDropdownOpen.value &&
    langDropdownRef.value &&
    !langDropdownRef.value.contains(e.target)
  ) {
    isLangDropdownOpen.value = false;
  }
};

const toggleSmallMenu = () => {
  isSmallMenuOpen.value = !isSmallMenuOpen.value;
  if (isSmallMenuOpen.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};

const navItems = [
  { path: "/", label: "nav.home" },
  { path: "/about", label: "nav.about" },
  { path: "/courses", label: "nav.courses" },
  { path: "/packages", label: "nav.packages" },
  { path: "/contact", label: "nav.contact" },
];

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
