<template>
  <footer class="bg-[#323232] text-white px-8 bg-repeat-y lg:bg-[url('/footer_bg.png')]">
    <div
      class="mx-auto py-10 2xl:px-60 xl:px-48 lg:px-32 md:px-20 px-8 flex flex-wrap justify-between"
      v-bind="showAos ? { 'data-aos': 'fade-up' } : {}"
    >
      <!-- Column 1 -->
      <div class="lg:w-[18%]">
        <ul>
          <li class="pt-20 mb-5">
            <NuxtLink :to="localePath('/')" @click="scrollTop">
              <img
                src="/logo_footer.png"
                alt="Langua logo"
                class="w-[176px] h-[80px] m-auto xl:!m-0"
              />
            </NuxtLink>
          </li>
          <li class="px-0 xs:px-4 sm:px-20 lg:px-0">
            <p class="leading-8 text-[16px] lg:text-start text-start">
              {{ $t("FOOTER.desc") }}
            </p>
          </li>
        </ul>
      </div>
      <!-- Column 2 -->
      <div class="mt-20">
        <p class="text-[18px] font-[700] mb-8">{{ $t("FOOTER.quickLinks") }}</p>
        <div class="flex gap-x-20">
          <ul>
            <li>
              <NuxtLink
                :to="localePath('/')"
                class="block py-1 hover:text-[#E77C5A] mb-5"
                @click="scrollTop"
                >{{ $t("FOOTER.home") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/courses')"
                class="block py-1 hover:text-[#E77C5A] mb-5"
                @click="scrollTop"
                >{{ $t("FOOTER.courses") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/about')"
                class="block py-1 hover:text-[#E77C5A] mb-5"
                @click="scrollTop"
                >{{ $t("FOOTER.about_platform") }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/faq')"
                class="block py-1 hover:text-[#E77C5A] mt-2"
                @click="scrollTop"
                >{{ $t("FOOTER.faq") }}</NuxtLink
              >
            </li>
          </ul>
          <ul>
            <li>
              <NuxtLink
                :to="localePath('/contact')"
                class="block py-1 hover:text-[#E77C5A] mb-5"
                @click="scrollTop"
                >{{ $t("FOOTER.contact") }}</NuxtLink
              >
            </li>
            <li>
              <div
                class="block py-1 hover:text-[#E77C5A] mb-5 cursor-pointer"
                @click="openPrivacyPopup=true"
                >{{ $t("FOOTER.privacyPolicy") }}</div
              >
            </li>
            <li>
              <div
                class="block py-1 hover:text-[#E77C5A] mb-5 cursor-pointer"
                @click="openTermsPopup=true"
                >{{ $t("FOOTER.termsAndUse") }}</div
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- Column 3 -->
      <div>
        <ul>
          <li class="mt-20">
            <p
              class="text-[18px] font-[700] mb-8"
              v-if="
                data?.social?.mobile ||
                data?.social?.whatsapp ||
                data?.social?.email ||
                data?.social?.linkedin ||
                data?.social?.youtube ||
                data?.social?.facebook ||
                data?.social?.instagram ||
                data?.social?.tiktok
              "
            >
              {{ $t("FOOTER.followUs") }}
            </p>
            <div class="mt-5 flex gap-x-5 justify-center lg:justify-start">
              <NuxtLink
                v-for="phone in data?.mobile"
                :key="phone"
                :to="`tel:${phone}`"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img alt="Phone" src="/phone.png" class="w-[24px] h-[24px]" />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.whatsapp"
                :to="`https://wa.me/${data?.whatsapp}`"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img
                    alt="Whatsapp"
                    src="/Whatsapp.png"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.email"
                :to="data?.email"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img alt="Email" src="/email.png" class="w-[24px] h-[24px]" />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.social?.linkedin"
                :to="data.social?.linkedin"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img
                    alt="Linkedin"
                    src="/linkedin.png"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </NuxtLink>
            </div>
            <div class="mt-8 flex gap-x-5 justify-center lg:justify-start">
              <NuxtLink
                v-if="data?.social?.youtube"
                :to="data.social?.youtube"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img
                    alt="Youtube"
                    src="/youtube.png"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.social?.facebook"
                :to="data.social?.facebook"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img alt="Facebook" src="/fb.png" class="w-[24px] h-[24px]" />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.social?.instagram"
                :to="data.social?.instagram"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img
                    alt="Instagram"
                    src="/instagram.png"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </NuxtLink>
              <NuxtLink
                v-if="data?.social?.tiktok"
                :to="data.social?.tiktok"
                target="_blank"
                external
              >
                <div class="footer_social_icon">
                  <img
                    alt="Tiktok"
                    src="/tiktok.png"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </NuxtLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <hr class="w-full h-[1px] text-[#3a3a3a]" />
    <div class="text-center py-8" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <span>{{ $t("FOOTER.rightsReserved") }}</span>
      <span class="font-[700] text-[#E77C5A]" dir="ltr"> LanguaLearn </span>
      <span> ©{{ new Date().getFullYear() }}</span>
    </div>
  </footer>
  <Popup :show="openPrivacyPopup" @close="openPrivacyPopup = false" type="privacy" />
  <Popup :show="openTermsPopup" @close="openTermsPopup = false" type="terms" />
</template>
<script setup>
const data = {
  email: "info@langua.com",
  mobile: ["+966555884466"],
  whatsapp: "+966555884466",
  social: {
    tiktok: "https://www.tiktok.com/@langua",
    facebook: "https://www.facebook.com/people/langua/61572193234028/#",
    instagram: "https://www.instagram.com/langua/",
    youtube: "https://www.youtube.com/@langua",
    linkedin: "https://www.linkedin.com/company/langua/",
  },
};
const localePath = useLocalePath();
const { locale } = useI18n();
const isLogin = false;
const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const route = useRoute();
const showAos = computed(() => !route.path.endsWith("/profile"));
const openTermsPopup = ref(false);
const openPrivacyPopup = ref(false);
</script>
