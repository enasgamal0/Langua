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
useHead({
  title: 'Langua | لانجوا'
});
</script>