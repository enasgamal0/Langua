<template></template>
<script setup>
const router = useRouter();
const localePath = useLocalePath();
onMounted(() => {
  router.push(localePath("/not_found"));
})
</script>