<template>
  <div>
    <BreadCrumb
      :title="$t('bread_crumb.forgot_password')"
      :current="$t('bread_crumb.forgot_password')"
      :prev="$t('bread_crumb.login')"
      :link="localePath('/auth/login')"
      v-if="route?.query?.type == 'password'"
    />
    <BreadCrumb
      :title="$t('bread_crumb.register_otp')"
      :desc="$t('bread_crumb.register_desc')"
      v-if="route?.query?.type == 'register'"
    />
    <div
      class="bg-no-repeat py-10 lg:px-20 lg:m-20 m-10"
      style="
        background-image: url('/slider_top.png'), url('/slider_bottom.png');
        background-position: top 0 right 0, bottom 0 left 0;
      "
    >
      <div class="flex flex-wrap justify-center gap-10 mx-10 lg:!mx-0">
        <div class="w-[80%] lg:!w-[50%]">
          <img
            src="/auth.png"
            alt="Auth Img"
            class="m-auto hidden lg:!block"
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
                <span class="text-[#4B007D] font-[800] break-words">{{
                  $t("auth.check_otp_email", { email: email })
                }}</span>
                {{ $t("auth.check_otp2") }}
              </div>
              <label class="block text-[16px] font-[400] text-[#202020] mb-5">
                {{ $t("auth.enter_otp") }}
              </label>
              <div class="flex justify-center lg:!justify-between gap-2" dir="ltr">
                <div>
                  <input
                    v-model="form.digit1"
                    ref="input0"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="-"
                    @input="handleInput($event, 0)"
                    @keydown="handleKeydown($event, 0)"
                    @paste="handlePaste"
                    @focus="handleFocus(0)"
                    :class="{
                      'border-red-500': hasError('digit1'),
                      'border-[#EEEDEE]': !hasError('digit1'),
                    }"
                    class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                    autocomplete="one-time-code"
                  />
                  <VeeField v-model="form.digit1" name="digit1" type="hidden" @input="backendError = ''" />
                </div>
                <div>
                  <input
                    v-model="form.digit2"
                    ref="input1"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="-"
                    @input="handleInput($event, 1)"
                    @keydown="handleKeydown($event, 1)"
                    @paste="handlePaste"
                    @focus="handleFocus(1)"
                    :class="{
                      'border-red-500': hasError('digit2'),
                      'border-[#EEEDEE]': !hasError('digit2'),
                    }"
                    class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                    autocomplete="one-time-code"
                  />
                  <VeeField v-model="form.digit2" name="digit2" type="hidden" @input="backendError = ''" />
                </div>
                <div>
                  <input
                    v-model="form.digit3"
                    ref="input2"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="-"
                    @input="handleInput($event, 2)"
                    @keydown="handleKeydown($event, 2)"
                    @paste="handlePaste"
                    @focus="handleFocus(2)"
                    :class="{
                      'border-red-500': hasError('digit3'),
                      'border-[#EEEDEE]': !hasError('digit3'),
                    }"
                    class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                    autocomplete="one-time-code"
                  />
                  <VeeField v-model="form.digit3" name="digit3" type="hidden" @input="backendError = ''" />
                </div>
                <div>
                  <input
                    v-model="form.digit4"
                    ref="input3"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="-"
                    @input="handleInput($event, 3)"
                    @keydown="handleKeydown($event, 3)"
                    @paste="handlePaste"
                    @focus="handleFocus(3)"
                    :class="{
                      'border-red-500': hasError('digit4'),
                      'border-[#EEEDEE]': !hasError('digit4'),
                    }"
                    class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                    maxlength="1"
                    autocomplete="one-time-code"
                  />
                  <VeeField v-model="form.digit4" name="digit4" type="hidden" @input="backendError = ''" />
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
              :pending="isSubmitting"
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
import { configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const isSubmitting = ref(false);
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();

const form = reactive({
  digit1: "",
  digit2: "",
  digit3: "",
  digit4: "",
});

const OtpTokenCookie = useCookie("langua_otp_token");
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

// Track if we're on mobile
const isMobile = ref(false);

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
      OtpTokenCookie.value,
      locale.value
    );

    resendSuccess.value = t("auth.otp_resent_successfully");

    // Clear the form
    form.digit1 = "";
    form.digit2 = "";
    form.digit3 = "";
    form.digit4 = "";

    // Focus on first input with delay for mobile
    setTimeout(() => {
      const firstInput = getInputRef(0);
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);

    startResendTimer(60);

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
    isSubmitting.value = true;
    const otpCode = form.digit1 + form.digit2 + form.digit3 + form.digit4;
    const userData = {
      code: otpCode,
    };
    const result = await apiRequest(
      "POST",
      "/auth/verify-otp",
      userData,
      {},
      OtpTokenCookie.value,
      locale.value
    );
    if (route?.query?.type == "register") {
      router.push(localePath("/auth/success?type=register"));
    } else if (route?.query?.type == "password") {
      router.push(localePath("/auth/reset_password"));
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    backendError.value = error?.response?.data?.message;
  } finally {
    isSubmitting.value = false;
  }
};

const moveToNextInput = (currentIndex) => {
  if (currentIndex < 3) {
    const nextInput = getInputRef(currentIndex + 1);
    if (nextInput) {
      // Use setTimeout to ensure the focus happens after the current input event
      setTimeout(() => {
        nextInput.focus();
        // On mobile, also trigger a click to ensure keyboard stays open
        if (isMobile.value) {
          nextInput.click();
        }
      }, 10);
    }
  }
};

const moveToPrevInput = (currentIndex) => {
  if (currentIndex > 0) {
    const prevInput = getInputRef(currentIndex - 1);
    if (prevInput) {
      setTimeout(() => {
        prevInput.focus();
        if (isMobile.value) {
          prevInput.click();
        }
      }, 10);
    }
  }
};

const handleInput = (event, index) => {
  let value = event.target.value;
  
  // Handle multiple characters (for mobile auto-complete or paste)
  if (value.length > 1) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    
    // Fill all available fields starting from current index
    for (let i = 0; i < digits.length && (index + i) < 4; i++) {
      form[`digit${index + i + 1}`] = digits[i];
      const input = getInputRef(index + i);
      if (input) {
        input.value = digits[i];
      }
    }
    
    // Move focus to the next empty field or last field
    const nextIndex = Math.min(index + digits.length, 3);
    const nextInput = getInputRef(nextIndex);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
        if (isMobile.value) {
          nextInput.click();
        }
      }, 10);
    }
    
    return;
  }
  
  // Handle single character input
  value = value.replace(/\D/g, "").slice(0, 1);
  form[`digit${index + 1}`] = value;
  event.target.value = value;

  // Move to next input if value is entered
  if (value) {
    moveToNextInput(index);
  }
};

const handleKeydown = (event, index) => {
  if (event.key === "Backspace") {
    if (!form[`digit${index + 1}`] && index > 0) {
      event.preventDefault();
      moveToPrevInput(index);
    }
  } else if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    moveToPrevInput(index);
  } else if (event.key === "ArrowRight" && index < 3) {
    event.preventDefault();
    moveToNextInput(index);
  } else if (
    !/\d/.test(event.key) &&
    !["Backspace", "Delete", "Tab", "Enter"].includes(event.key)
  ) {
    event.preventDefault();
  }
};

const handleFocus = (index) => {
  // Select all text in the input when focused (helpful for mobile)
  const input = getInputRef(index);
  if (input && input.value) {
    setTimeout(() => {
      input.select();
    }, 10);
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
    setTimeout(() => {
      targetInput.focus();
      if (isMobile.value) {
        targetInput.click();
      }
    }, 10);
  }
};

const getInputRef = (index) => {
  const refs = [input0, input1, input2, input3];
  return refs[index]?.value;
};

// Detect if device is mobile
const detectMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  isMobile.value = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase()) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
};

onMounted(() => {
  detectMobile();
  
  if (route?.query?.type == "register") {
    handleResendCode();
  }
  
  setTimeout(() => {
    const firstInput = getInputRef(0);
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
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

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

/* Ensure inputs are properly styled on mobile */
input[type='tel'] {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

input[type='tel']::-webkit-outer-spin-button,
input[type='tel']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>