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
            <!-- Password Field -->
            <div class="relative">
              <div class="text-[16px] font-[400] text-[#202020] mb-12">
                {{ $t("auth.reset_password_desc") }}
              </div>
              <div>
                <label
                  for="password"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.new_password") }}
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
              </div>
              <div class="mt-5">
                <label
                  for="password_confirmation"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.new_password_confirmation") }}
                </label>
                <div class="relative">
                  <VeeField
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    name="password_confirmation"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    :class="{
                      'border-red-500': errors.password_confirmation,
                      'border-[#EEEDEE]': !errors.password_confirmation,
                    }"
                    class="w-full px-4 py-3 pr-12 pl-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-start"
                  />
                  <!-- Password toggle button -->
                  <button
                    type="button"
                    @click="
                      showPasswordConfirmation = !showPasswordConfirmation
                    "
                    class="absolute end-3 top-1/2 transform -translate-y-1/2 text-[#a2a2a2] hover:text-[#4B007D] cursor-pointer"
                  >
                    <svg
                      v-if="showPasswordConfirmation"
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
                  name="password_confirmation"
                  class="text-red-500 text-sm mt-1 block"
                />
              </div>
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
  password: "",
  password_confirmation: "",
});

const tokenCookie = useCookie("langua_token");
const backendError = ref("");
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const validationSchema = yup.object({
  password: yup.string().required(t("validation.password_required")),
  password_confirmation: yup
    .string()
    .required(t("validation.new_password_confirmation")),
});

const handleSubmit = async () => {
  backendError.value = "";
  try {
    const userData = {
      password: form.password,
      password_confirmation: form.password_confirmation,
    };
    const result = await apiRequest(
      "POST",
      "/auth/reset-password",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    router.push("/auth/success?type=reset");
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
