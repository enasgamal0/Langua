<template>
  <div :dir="locale == 'en' ? 'ltr' : 'rtl'">
    <NuxtLoadingIndicator color="#4B007D" />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const tokenCookie = useCookie("langua_token");
const OtpTokenCookie = useCookie("langua_otp_token");
const email = useCookie("langua_email_otp");
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
useHead({
  title: 'Langua | لانجوا'
});
onMounted(async () => {
  if (tokenCookie.value && route.path.includes("auth")) {
    router.push(localePath("/"));
  }
  if (!OtpTokenCookie.value && route.path=="/auth/otp") {
    router.push(localePath("/auth/login"));
  }
});
</script>