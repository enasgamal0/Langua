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
                {{ $t("auth.check_otp1") }} <span class="text-[#4B007D] font-[800]">{{ $t("auth.check_otp_email", { email: email }) }}</span> {{ $t("auth.check_otp2") }}
              </div>
              <label class="block text-[16px] font-[400] text-[#202020] mb-5">
                {{ $t("auth.enter_otp") }}
              </label>
              <div class="flex justify-between gap-2" dir="ltr">
                <div>
                  <VeeField
                    v-model="form.digit1"
                    name="digit1"
                    type="text"
                    placeholder="-"
                    :ref="el => (otpRefs[0] = el?.$el?.querySelector('input'))"
                    @input="handleInput($event, 0)"
                    @keydown.backspace="handleBackspace($event, 0)"
                    :class="{
                      'border-red-500': errors.digit1,
                      'border-[#EEEDEE]': !errors.digit1,
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                </div>
                <div>
                  <VeeField
                    v-model="form.digit2"
                    name="digit2"
                    type="text"
                    placeholder="-"
                    :ref="el => (otpRefs[1] = el?.$el?.querySelector('input'))"
                    @input="handleInput($event, 1)"
                    @keydown.backspace="handleBackspace($event, 1)"
                    :class="{
                      'border-red-500': errors.digit2,
                      'border-[#EEEDEE]': !errors.digit2,
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                </div>
                <div>
                  <VeeField
                    v-model="form.digit3"
                    name="digit3"
                    type="text"
                    placeholder="-"
                    :ref="el => (otpRefs[2] = el?.$el?.querySelector('input'))"
                    @input="handleInput($event, 2)"
                    @keydown.backspace="handleBackspace($event, 2)"
                    :class="{
                      'border-red-500': errors.digit3,
                      'border-[#EEEDEE]': !errors.digit3,
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                </div>
                <div>
                  <VeeField
                    v-model="form.digit4"
                    name="digit4"
                    type="text"
                    :ref="el => (otpRefs[3] = el?.$el?.querySelector('input'))"
                    @input="handleInput($event, 3)"
                    @keydown.backspace="handleBackspace($event, 3)"
                    placeholder="-"
                    :class="{
                      'border-red-500': errors.digit4,
                      'border-[#EEEDEE]': !errors.digit4,
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                </div>
              </div>
              <VeeErrorMessage
                name="digit1"
                class="text-red-500 text-sm mt-5 block"
              />
              <p
                class="text-red-500 text-sm mt-5 block"
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
  digit1: "",
  digit2: "",
  digit3: "",
  digit4: "",
});

const tokenCookie = useCookie("langua_token");
const email = useCookie("langua_email_otp");
const backendError = ref("");
const otpRefs = ref([]);

const validationSchema = yup.object({
  digit1: yup
    .string()
    .required(t("validation.code_required")),
  digit2: yup
    .string()
    .required(t("validation.code_required")),
  digit3: yup
    .string()
    .required(t("validation.code_required")),
  digit4: yup
    .string()
    .required(t("validation.code_required")),
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
    router.push("/auth/otp");
  } catch (error) {
    console.error("Error logging in:", error);
    backendError.value = error?.response?.data?.message;
  }
};

const handleInput = (event, index) => {
  const value = event.target.value.replace(/\D/g, "").slice(0, 1);
  form[`digit${index + 1}`] = value;

  if (value && otpRefs.value[index + 1]) {
    otpRefs.value[index + 1].focus();
  }
};

const handleBackspace = (event, index) => {
  if (!form[`digit${index + 1}`] && otpRefs.value[index - 1]) {
    otpRefs.value[index - 1].focus();
  }
};

</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
</style>
