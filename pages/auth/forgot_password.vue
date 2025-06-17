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
      <div class="flex flex-wrap justify-center gap-10">
        <div class="w-[80%] lg:!w-[50%]">
          <img
            src="/auth.png"
            alt="Auth Img"
            class="m-auto"
            data-aos="zoom-in"
          />
        </div>
        <div class="w-[90%] lg:!w-[40%]">
          <VeeForm
            @submit="handleSubmit"
            :validation-schema="validationSchema"
            class="space-y-6"
            v-slot="{ errors }"
          >
            <!-- Email Field -->
            <div class="relative">
              <div class="text-[16px] font-[400] text-[#202020] mb-12">
                {{ $t("auth.forget_password_desc") }}
              </div>
              <label
                for="email"
                class="block text-[16px] font-[400] text-[#202020] mb-2"
              >
                {{ $t("auth.email") }}
              </label>
              <div class="relative">
                <VeeField
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  :placeholder="$t('auth.example') + ': name@gmail.com'"
                  :class="{
                    'border-red-500': errors.email,
                    'border-[#EEEDEE]': !errors.email,
                  }"
                  class="w-full px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                />
                <div
                  class="absolute start-3 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src="/mail_icon.png"
                    alt="email"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </div>
              <VeeErrorMessage
                name="email"
                class="text-red-500 text-sm mt-1 block"
              />
              <p
                class="text-red-500 text-sm mt-3 block"
                v-if="backendError"
                data-aos="fade-up"
              >
                {{ backendError }}
              </p>
            </div>

            <!-- Submit Button -->
            <BaseButton
              :content="$t('auth.submit')"
              border-color="#E77C5A"
              bg-color="#4B007D"
              class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
              :lg_reversed_space="true"
              width="100%"
              font_size="18px"
              :disabled="Object.keys(errors).length > 0"
            />
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { apiRequest, get, post, put, del } from "~/utils/api";

const { t } = useI18n();
const router = useRouter();
const { locale } = useI18n();
const form = reactive({
  email: "",
});

const tokenCookie = useCookie("langua_token");
const email = useCookie("langua_email_otp");
const backendError = ref("");

const validationSchema = yup.object({
  email: yup
    .string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid")),
});

const handleSubmit = async () => {
  backendError.value = "";
  try {
    const userData = {
      email: form.email,
    };
    const result = await apiRequest(
      "POST",
      "/auth/forget-password",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    email.value = form.email;
    tokenCookie.value = result?.access_token;
    router.push("/auth/otp");
  } catch (error) {
    console.error("Error logging in:", error);
    backendError.value = error?.response?.data?.message;
  }
};
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
</style>
