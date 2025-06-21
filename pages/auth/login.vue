<template>
  <div>
    <BreadCrumb
      :title="$t('bread_crumb.login')"
      :desc="$t('bread_crumb.login_desc')"
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
            </div>

            <!-- Password Field -->
            <div class="relative">
              <label
                for="password"
                class="block text-[16px] font-[400] text-[#202020] mb-2"
              >
                {{ $t("auth.password") }}
              </label>
              <div class="relative">
                <VeeField
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="{
                    'border-red-500': errors.password,
                    'border-[#EEEDEE]': !errors.password,
                  }"
                  class="w-full px-4 py-3 pr-12 pl-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-start"
                />
                <!-- Password toggle button -->
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute end-3 top-1/2 transform -translate-y-1/2 text-[#a2a2a2] hover:text-[#4B007D] cursor-pointer"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <!-- Lock icon -->
                <div
                  class="absolute start-3 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src="/password_icon.png"
                    alt="lock"
                    class="w-[24px] h-[24px]"
                  />
                </div>
              </div>
              <VeeErrorMessage
                name="password"
                class="text-red-500 text-sm mt-1 block"
              />
              <p class="text-red-500 text-sm mt-3 block" v-if="backendError" data-aos="fade-up">
                {{ backendError }}
              </p>
              <NuxtLink
                :to="localePath('/auth/forgot_password')"
                class="block mt-4 text-[16px] font-[400] text-[#E77C5A] text-end hover:underline"
              >
                {{ $t("auth.forgot_password") }}
              </NuxtLink>
            </div>

            <!-- Submit Button -->
            <BaseButton
              :content="$t('auth.login')"
              border-color="#E77C5A"
              bg-color="#4B007D"
              class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
              :lg_reversed_space="true"
              width="100%"
              font_size="18px"
              :disabled="Object.keys(errors).length > 0"
              :pending="isSubmitting"
            />
          </VeeForm>
          <div class="mt-12 flex justify-center text-[16px]">
            <span>{{ $t("auth.dont_have_account") }}</span>
            <NuxtLink
              :to="localePath('/auth/register')"
              class="text-[#E77C5A] mx-2 font-[700] hover:underline"
            >
              {{ $t("auth.create_account") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { apiRequest, get, post, put, del } from "~/utils/api";
import { configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const { t } = useI18n();
const router = useRouter();
const { locale } = useI18n();
const form = reactive({
  email: "",
  password: "",
});
const isSubmitting = ref(false);

const showPassword = ref(false);
const tokenCookie = useCookie("langua_token");
const backendError = ref("");

const validationSchema = yup.object({
  email: yup
    .string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid")),
  password: yup.string().required(t("validation.password_required")),
});

const handleSubmit = async () => {
  backendError.value = "";
  try {
    isSubmitting.value = true;
    const userData = {
      email: form.email,
      password: form.password,
    };
    const result = await apiRequest(
      "POST",
      "/auth/login",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    tokenCookie.value = result?.data?.access_token;
    router.push("/");
  } catch (error) {
    console.error("Error logging in:", error);
    backendError.value = error?.response?.data?.message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
</style>