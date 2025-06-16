<template>
    <BreadCrumb :title="$t('bread_crumb.about')" :current="$t('nav.about')" :prev="$t('nav.home')" />
    <HomeAbout :home="false" />
</template>