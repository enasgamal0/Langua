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
            <div class="relative">
              <div class="text-[16px] font-[400] text-[#202020] mb-12">
                {{ $t("auth.check_otp1") }}
                <span class="text-[#4B007D] font-[800]">{{
                  $t("auth.check_otp_email", { email: email })
                }}</span>
                {{ $t("auth.check_otp2") }}
              </div>
              <label class="block text-[16px] font-[400] text-[#202020] mb-5">
                {{ $t("auth.enter_otp") }}
              </label>
              <div class="flex justify-between gap-2" dir="ltr">
                <div>
                  <input
                    v-model="form.digit1"
                    ref="input0"
                    type="text"
                    placeholder="-"
                    @input="handleInput($event, 0)"
                    @keydown="handleKeydown($event, 0)"
                    @paste="handlePaste"
                    :class="{
                      'border-red-500': hasError('digit1'),
                      'border-[#EEEDEE]': !hasError('digit1'),
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                  />
                  <VeeField v-model="form.digit1" name="digit1" type="hidden" />
                </div>
                <div>
                  <input
                    v-model="form.digit2"
                    ref="input1"
                    type="text"
                    placeholder="-"
                    @input="handleInput($event, 1)"
                    @keydown="handleKeydown($event, 1)"
                    @paste="handlePaste"
                    :class="{
                      'border-red-500': hasError('digit2'),
                      'border-[#EEEDEE]': !hasError('digit2'),
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                  />
                  <VeeField v-model="form.digit2" name="digit2" type="hidden" />
                </div>
                <div>
                  <input
                    v-model="form.digit3"
                    ref="input2"
                    type="text"
                    placeholder="-"
                    @input="handleInput($event, 2)"
                    @keydown="handleKeydown($event, 2)"
                    @paste="handlePaste"
                    :class="{
                      'border-red-500': hasError('digit3'),
                      'border-[#EEEDEE]': !hasError('digit3'),
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                  />
                  <VeeField v-model="form.digit3" name="digit3" type="hidden" />
                </div>
                <div>
                  <input
                    v-model="form.digit4"
                    ref="input3"
                    type="text"
                    placeholder="-"
                    @input="handleInput($event, 3)"
                    @keydown="handleKeydown($event, 3)"
                    @paste="handlePaste"
                    :class="{
                      'border-red-500': hasError('digit4'),
                      'border-[#EEEDEE]': !hasError('digit4'),
                    }"
                    class="w-[102.5px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                  />
                  <VeeField v-model="form.digit4" name="digit4" type="hidden" />
                </div>
              </div>
              <p
                class="text-red-500 text-sm mt-5 block"
                v-if="
                  errors.digit1 ||
                  errors.digit2 ||
                  errors.digit3 ||
                  errors.digit4
                "
              >
                {{
                  errors.digit1 ||
                  errors.digit2 ||
                  errors.digit3 ||
                  errors.digit4
                }}
              </p>
              <p
                class="text-red-500 text-sm mt-5 block"
                v-if="backendError"
                data-aos="fade-up"
              >
                {{ backendError }}
              </p>
              <p
                class="text-green-500 text-sm mt-5 block"
                v-if="resendSuccess"
                data-aos="fade-up"
              >
                {{ resendSuccess }}
              </p>
            </div>

            <!-- Resend Code Section -->
            <div class="flex justify-center items-center mt-6">
              <span class="text-[14px] text-[#202020] mx-2">
                {{ $t("auth.didnt_receive_code") }}
              </span>
              <button
                type="button"
                @click="handleResendCode"
                :disabled="isResendDisabled || isResending"
                :class="{
                  'text-[#4B007D] hover:underline cursor-pointer':
                    !isResendDisabled && !isResending,
                  'text-gray-400 cursor-not-allowed':
                    isResendDisabled || isResending,
                }"
                class="text-[14px] font-[600] transition-colors"
              >
                <span v-if="isResending">{{ $t("auth.sending") }}</span>
                <span v-else-if="isResendDisabled">
                  {{ $t("auth.resend_in") }} {{ formatTime(resendTimer) }}
                </span>
                <span v-else>{{ $t("auth.resend_code") }}</span>
              </button>
            </div>

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
const route = useRoute();
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
const resendSuccess = ref("");

// Resend functionality
const isResending = ref(false);
const isResendDisabled = ref(false);
const resendTimer = ref(0);
const timerInterval = ref(null);

const input0 = ref(null);
const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);

const validationSchema = yup.object({
  digit1: yup.string().required(t("validation.code_required")),
  digit2: yup.string().required(t("validation.code_required")),
  digit3: yup.string().required(t("validation.code_required")),
  digit4: yup.string().required(t("validation.code_required")),
});

const hasError = (fieldName) => {
  return false;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const startResendTimer = (duration = 60) => {
  isResendDisabled.value = true;
  resendTimer.value = duration;

  timerInterval.value = setInterval(() => {
    resendTimer.value--;

    if (resendTimer.value <= 0) {
      clearInterval(timerInterval.value);
      isResendDisabled.value = false;
      resendTimer.value = 0;
    }
  }, 1000);
};

const handleResendCode = async () => {
  if (isResendDisabled.value || isResending.value) return;

  isResending.value = true;
  backendError.value = "";
  resendSuccess.value = "";

  try {
    const result = await apiRequest(
      "POST",
      "/auth/resend-otp",
      { email: email.value },
      {},
      tokenCookie.value,
      locale.value
    );

    resendSuccess.value = t("auth.otp_resent_successfully");

    // Clear the form
    form.digit1 = "";
    form.digit2 = "";
    form.digit3 = "";
    form.digit4 = "";

    // Focus on first input
    nextTick(() => {
      const firstInput = getInputRef(0);
      if (firstInput) {
        firstInput.focus();
      }
    });

    // Start the timer
    startResendTimer(60); // 2 minutes

    // Clear success message after 5 seconds
    setTimeout(() => {
      resendSuccess.value = "";
    }, 5000);
  } catch (error) {
    console.error("Error resending OTP:", error);
    backendError.value =
      error?.response?.data?.message || t("auth.resend_error");
  } finally {
    isResending.value = false;
  }
};

const handleSubmit = async () => {
  backendError.value = "";
  resendSuccess.value = "";
  try {
    const otpCode = form.digit1 + form.digit2 + form.digit3 + form.digit4;
    const userData = {
      code: otpCode,
    };
    const result = await apiRequest(
      "POST",
      "/auth/verify-otp",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    if (route?.query?.type == "register") {
      router.push("/auth/success?type=register");
    } else if (route?.query?.type == "password") {
      router.push("/auth/reset_password");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    backendError.value = error?.response?.data?.message;
  }
};

const handleInput = (event, index) => {
  const value = event.target.value.replace(/\D/g, "").slice(0, 1);

  form[`digit${index + 1}`] = value;
  event.target.value = value;

  if (value && index < 3) {
    const nextInput = getInputRef(index + 1);
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const handleKeydown = (event, index) => {
  if (event.key === "Backspace") {
    if (!form[`digit${index + 1}`] && index > 0) {
      event.preventDefault();
      const prevInput = getInputRef(index - 1);
      if (prevInput) {
        prevInput.focus();
      }
    }
  } else if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    const prevInput = getInputRef(index - 1);
    if (prevInput) {
      prevInput.focus();
    }
  } else if (event.key === "ArrowRight" && index < 3) {
    event.preventDefault();
    const nextInput = getInputRef(index + 1);
    if (nextInput) {
      nextInput.focus();
    }
  } else if (
    !/\d/.test(event.key) &&
    !["Backspace", "Delete", "Tab", "Enter"].includes(event.key)
  ) {
    event.preventDefault();
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData("text");
  const digits = paste.replace(/\D/g, "").slice(0, 4).split("");

  digits.forEach((digit, index) => {
    if (index < 4) {
      form[`digit${index + 1}`] = digit;
      const input = getInputRef(index);
      if (input) {
        input.value = digit;
      }
    }
  });

  const nextEmptyIndex = digits.length < 4 ? digits.length : 3;
  const targetInput = getInputRef(nextEmptyIndex);
  if (targetInput) {
    targetInput.focus();
  }
};

const getInputRef = (index) => {
  const refs = [input0, input1, input2, input3];
  return refs[index]?.value;
};

onMounted(() => {
  nextTick(() => {
    const firstInput = getInputRef(0);
    if (firstInput) {
      firstInput.focus();
    }
  });
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
</style>
