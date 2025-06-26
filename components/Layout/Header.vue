<template>
  <header
    class="py-6 px-6 xl:!px-8 xl:!px-20 2xl:!px-60 xl:!py-7 border-b border-[#EEEDEE]"
  >
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="outline-none">
        <img
          alt="Langua Logo"
          src="/logo.png"
          class="h-[50px] w-[110px] outline-none"
          data-aos="zoom-in"
        />
      </NuxtLink>

      <!-- Desktop Menu -->
      <nav class="hidden xl:!flex xl:gap-6 gap-3 text-[15px] text-[#202020]">
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
      <div class="hidden xl:!flex items-center gap-5">
        <NuxtLink :to="localePath('/placement_test')">
          <BaseButton
            :content="$t('nav.placement_test')"
            border-color="#E77C5A"
            bg-color="#4B007D"
            icon="/feather.png"
          />
        </NuxtLink>
        <NuxtLink :to="localePath('/auth/login')" v-if="!isLoggedIn">
          <BaseButton
            :content="$t('nav.login')"
            border-color="#4B007D"
            bg-color="#E77C5A"
            icon="/user_white.png"
          />
        </NuxtLink>

        <!-- Profile Dropdown -->
        <div class="relative" ref="profileDropdownRef" v-if="isLoggedIn">
          <div @click="toggleProfileDropdown" class="cursor-pointer">
            <BaseButton
              :content="$t('nav.profile')"
              border-color="#4B007D"
              bg-color="#E77C5A"
              icon="/user_white.png"
              :has-arrow="true"
            />
          </div>
          <div
            v-if="isProfileDropdownOpen"
            class="absolute -start-5 mt-2 bg-white shadow-[0px_0px_15px_0px_#0000000F] z-50 w-56 py-2"
          >
            <NuxtLink
              v-for="item in profileMenuItems"
              :key="item.path"
              :to="localePath(item.path)"
              class="flex items-center justify-between px-4 py-3 text-sm text-[#A3A2A3] hover:bg-[#F9F9F9] transition-colors duration-200 border-b border-[#EEEDEE] last:border-b-0"
              @click="closeProfileDropdown"
            >
              <div class="flex items-center gap-3">
                <img :src="item.icon" class="w-[24px] h-[24px]" />
                <span>{{ $t(item.label) }}</span>
              </div>
              <img src="/arrow_left.png" class="w-[24px] h-[24px]" :class="{ 'rotate-180': locale == 'en' }" />
            </NuxtLink>

            <!-- Logout Button -->
            <div
              class="flex items-center justify-center mt-4 mb-2 text-[#DC3545] cursor-pointer transition-colors duration-200"
              @click="openLogoutPopup=true"
            >
              <div class="flex items-center gap-3 border border-[#DC3545] px-5 py-2 hover:bg-red-50">
                <img src="/logout.png" class="w-[20px] h-[20px]" />
                <span>{{ $t("nav.logout") }}</span>
              </div>
            </div>
          </div>
        </div>

        <img
          src="/bell.png"
          class="w-[24px] h-[24px] cursor-pointer"
          v-if="isLoggedIn"
        />

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
      <div class="xl:hidden cursor-pointer" @click="toggleSmallMenu">
        <img src="/bars.svg" class="w-[24px] h-[24px]" />
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isSmallMenuOpen"
      class="xl:!hidden mt-0 flex flex-col gap-0 text-[#202020] transition-all duration-300 h-[calc(100vh-64px)] pt-8 overflow-y-auto"
    >
      <!-- Regular Navigation Items -->
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
        <span>{{ $t(item?.label) }}</span>
      </NuxtLink>
      <NuxtLink
        v-if="isLoggedIn"
        :to="localePath('/notifications')"
        :class="[
          'py-2 border-b border-gray-200 hover:text-[#4B007D]',
          route.path === localePath('/notifications')
            ? 'text-[#4B007D] font-bold'
            : '',
        ]"
        @click="toggleSmallMenu"
      >
        <span>{{ $t('nav.notifications') }}</span>
      </NuxtLink>

      <!-- Profile Menu Items (Mobile Only) -->
      <template v-if="isLoggedIn">
        <NuxtLink
          v-for="item in profileMenuItems"
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
          <span>{{ $t(item.label) }}</span>
        </NuxtLink>
        
        <!-- Logout Button (Mobile) -->
        <div
          class="flex items-center gap-3 py-2 border-b border-gray-200 text-[#DC3545] cursor-pointer hover:bg-red-50 transition-colors duration-200"
          @click="openLogoutPopup=true, toggleSmallMenu"
        >
          <img src="/logout.png" class="w-[20px] h-[20px]" />
          <span>{{ $t("nav.logout") }}</span>
        </div>
      </template>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-5 my-5">
        <NuxtLink :to="localePath('/placement_test')" @click="toggleSmallMenu">
          <BaseButton
            :content="$t('nav.placement_test')"
            border-color="#E77C5A"
            bg-color="#4B007D"
            icon="/feather.png"
          />
        </NuxtLink>
        <NuxtLink :to="localePath('/auth/login')" v-if="!isLoggedIn" @click="toggleSmallMenu">
          <BaseButton
            :content="$t('nav.login')"
            border-color="#4B007D"
            bg-color="#E77C5A"
            icon="/user_white.png"
          />
        </NuxtLink>
      </div>

      <!-- Language Switcher (Mobile) -->
      <div
        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="changeLanguage('en'), toggleSmallMenu()"
        v-if="locale === 'ar'"
      >
        <img src="/usa_flag.png" class="w-[20px] h-[14px]" />
        <span class="text-sm font-medium">English</span>
      </div>
      <div
        class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
        @click="changeLanguage('ar'), toggleSmallMenu()"
        v-if="locale === 'en'"
      >
        <img src="/sa_flag.png" class="w-[20px] h-[14px]" />
        <span class="text-sm font-medium">العربية</span>
      </div>
    </div>
  </header>
  <Popup :show="openLogoutPopup" @close="openLogoutPopup = false" type="logout" />
</template>

<script setup>
const { locale, setLocale } = useI18n();
const isMenuOpen = ref(false);
const isSmallMenuOpen = ref(false);
const isLangDropdownOpen = ref(false);
const isProfileDropdownOpen = ref(false);
const langDropdownRef = ref(null);
const profileDropdownRef = ref(null);
const route = useRoute();
const isLoggedIn = useCookie("langua_token");
const openLogoutPopup = ref(false);

const toggleLangDropdown = () => {
  isLangDropdownOpen.value = !isLangDropdownOpen.value;
  // Close profile dropdown if open
  isProfileDropdownOpen.value = false;
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
  // Close language dropdown if open
  isLangDropdownOpen.value = false;
};

const closeProfileDropdown = () => {
  isProfileDropdownOpen.value = false;
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

  if (
    isProfileDropdownOpen.value &&
    profileDropdownRef.value &&
    !profileDropdownRef.value.contains(e.target)
  ) {
    isProfileDropdownOpen.value = false;
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

// Profile menu items based on your image
const profileMenuItems = [
  {
    path: "/profile",
    label: "nav.profile_settings",
    icon: "/settings.png",
  },
  { path: "/profile?name=courses", label: "nav.my_courses", icon: "/book.png" },
  {
    path: "/profile?name=favorites",
    label: "nav.favorites",
    icon: "/heart_nav.png",
  },
  {
    path: "/profile?name=subscriptions",
    label: "nav.subscriptions",
    icon: "/subscription.png",
  },
];

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>