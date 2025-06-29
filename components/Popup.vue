<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#00000055] p-0 lg:!p-20"
    @click="handleClickOutside"
  >
    <div
      ref="modalRef"
      class="relative w-full p-6 bg-white bg-no-repeat mx-5 max-h-[80vh]"
      :class="type == 'logout' ? 'max-w-xl' : 'max-w-3xl'"
      style="
        background-image: url('/slider_top.png'), url('/slider_bottom.png');
        background-position: top 0 right 0, bottom 0 left 0;
      "
      data-aos="zoom-in"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-0 left-0 text-white bg-[#4B007D] h-[40px] w-[40px] text-[16px] font-[700] cursor-pointer"
      >
        ✕
      </button>
      <!-- Title -->
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'terms'"
      >
        {{ $t("static_pages.terms") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'privacy'"
      >
        {{ $t("static_pages.privacy") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'logout'"
      >
        {{ $t("static_pages.logout") }}
      </h2>

      <p
        v-if="type === 'logout'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.logout_desc") }}
      </p>

      <!-- Image -->
      <div class="flex justify-center mb-4">
        <img
          v-if="type == 'terms'"
          src="/terms.png"
          alt="Terms Icon"
          class="w-[106px] h-[120px]"
        />
        <img
          v-if="type == 'privacy'"
          src="/privacy.png"
          alt="Privacy Icon"
          class="w-[111px] h-[120px]"
        />
        <img
          v-if="type == 'logout'"
          src="/logout_img.png"
          alt="Logout Icon"
          class="w-[120px] h-[120px]"
        />
      </div>

      <!-- Content -->

      <div
        class="text-start text-[16px] font-[400] overflow-y-auto px-5 lg:px-16 max-h-[calc(80vh-300px)]"
        v-if="!loading"
      >
        <div
          v-if="type === 'terms' && locale === 'ar'"
          v-html="terms?.value?.ar"
        ></div>
        <div
          v-if="type === 'terms' && locale === 'en'"
          v-html="terms?.value?.en"
        ></div>
        <div
          v-if="type === 'privacy' && locale === 'ar'"
          v-html="privacy?.value?.ar"
        ></div>
        <div
          v-if="type === 'privacy' && locale === 'en'"
          v-html="privacy?.value?.en"
        ></div>
      </div>

      <!-- Logout Button -->
      <div
        v-if="type === 'logout'"
        class="flex items-center justify-center mt-4 mb-2 text-[#DC3545] cursor-pointer transition-colors duration-200"
        @click="handleLogout"
      >
        <div
          class="flex items-center justify-center gap-3 border border-[#DC3545] px-5 py-2 hover:bg-red-50 w-[314px] h-[48px]"
        >
          <img src="/logout.png" class="w-[20px] h-[20px]" />
          <span>{{ $t("nav.logout") }}</span>
        </div>
      </div>
      <!-- Advantage -->
      <div
        v-if="type == 'advantage'"
        class="bg-white m-auto text-center min-h-[300px]"
      >
        <img
          :src="advantage?.image"
          alt="Why Us"
          class="w-[118px] h-[128px] m-auto object-contain"
        />
        <div class="px-10">
          <h1 class="text-[24px] font-[800] my-3">
            {{ advantage?.name }}
          </h1>
          <div>
            <p :class="['text-[16px] font-[400] text-[#202020]']">
              {{ advantage?.description }}
            </p>
          </div>
        </div>
      </div>
      <UIButtonLoader
        class="mx-auto !my-20"
        border-color="#4B007D"
        v-if="loading"
      />
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const props = defineProps({
  show: Boolean,
  type: String,
  advantage: Object,
});
const emit = defineEmits(["close"]);
const terms = ref(``);
const privacy = ref(``);
const modalRef = ref(null);
const tokenCookie = useCookie("langua_token");
const OtpTokenCookie = useCookie("langua_otp_token");
const router = useRouter();
const localePath = useLocalePath();
const loading = ref(true);
const handleClickOutside = (e) => {
  if (modalRef.value && !modalRef.value.contains(e.target)) {
    emit("close");
  }
};

const handleLogout = () => {
  apiRequest("POST", "/auth/logout", {}, {}, tokenCookie.value, locale.value);
  tokenCookie.value = null;
  OtpTokenCookie.value = null;
  document.body.classList.remove("overflow-hidden");
  emit("close");
  router.push(localePath("/"));
};

watch(
  () => props.show,
  async (visible) => {
    if (!process.client) return;

    document.body.classList.toggle("overflow-hidden", visible);

    if (visible) {
      loading.value = true;

      if (props.type === "terms") {
        try {
          const response = await apiRequest(
            "GET",
            "/settings?key=terms_and_conditions",
            {},
            {},
            tokenCookie.value,
            locale.value
          );
          terms.value = response?.data?.data[0];
        } catch (err) {
          console.error("Failed to fetch terms:", err);
        }
      }

      if (props.type === "privacy") {
        try {
          const response = await apiRequest(
            "GET",
            "/settings?key=privacy_policy",
            {},
            {},
            tokenCookie.value,
            locale.value
          );
          privacy.value = response?.data?.data[0];
        } catch (err) {
          console.error("Failed to fetch privacy policy:", err);
        }
      }

      loading.value = false;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove("overflow-hidden");
  }
});
</script>
<style>
.ql-align-center {
  text-align: center;
}
</style>
