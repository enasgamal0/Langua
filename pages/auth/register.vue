<template>
  <div>
    <BreadCrumb
      :title="$t('bread_crumb.register')"
      :desc="$t('bread_crumb.register_desc')"
    />
    <div
      class="bg-no-repeat py-10 lg:px-20 lg:!m-20 m-5"
      style="
        background-image: url('/slider_top.png'), url('/slider_bottom.png');
        background-position: top 0 right 0, bottom 0 left 0;
      "
    >
      <div class="flex flex-wrap justify-center items-center gap-15 mx-10 lg:!mx-0">
        <div class="w-[80%] xl:!w-[30%]">
          <img
            src="/register.png"
            alt="Auth Img"
            class="m-auto w-[50%] xl:!w-auto hidden lg:!block"
            data-aos="zoom-in"
          />
        </div>
        <div class="w-[90%] xl:!w-[60%]">
          <VeeForm
            @submit="handleSubmit"
            :validation-schema="validationSchema"
            class="space-y-6"
            v-slot="{ errors }"
          >
            <div class="lg:flex gap-3">
              <!-- First Name Field -->
              <div class="relative w-[100%] lg:!mb-0 mb-6">
                <label
                  for="firstName"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.first_name") }}
                </label>
                <div class="relative">
                  <VeeField
                    @input="backendError = ''"
                    id="firstName"
                    v-model="form.firstName"
                    name="firstName"
                    :placeholder="$t('placeholders.first_name')"
                    type="text"
                    :class="{
                      'border-red-500': errors.firstName,
                      'border-[#EEEDEE]': !errors.firstName,
                    }"
                    class="w-full px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                  <div
                    class="absolute start-3 top-1/2 transform -translate-y-1/2"
                  >
                    <img src="/name.png" alt="name" class="w-[24px] h-[24px]" />
                  </div>
                </div>
                <VeeErrorMessage
                  name="firstName"
                  class="text-red-500 text-sm mt-1 block"
                />
              </div>
              <!-- Last Name Field -->
              <div class="relative w-[100%]">
                <label
                  for="lastName"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.last_name") }}
                </label>
                <div class="relative">
                  <VeeField
                    @input="backendError = ''"
                    id="lastName"
                    v-model="form.lastName"
                    :placeholder="$t('placeholders.last_name')"
                    name="lastName"
                    type="text"
                    :class="{
                      'border-red-500': errors.lastName,
                      'border-[#EEEDEE]': !errors.lastName,
                    }"
                    class="w-full px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                  />
                </div>
                <VeeErrorMessage
                  name="lastName"
                  class="text-red-500 text-sm mt-1 block"
                />
              </div>
            </div>
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
                  @input="backendError = ''"
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

            <!-- Phone Field -->
            <div class="relative">
              <label
                for="phone"
                class="block text-[16px] font-[400] text-[#202020] mb-2"
              >
                {{ $t("auth.phone") }}
              </label>
              <div class="relative">
                <VeeField name="phone" v-slot="{ field, errors }" @input="backendError = ''"> 
                  <TelephoneInput
                    v-bind="field"
                    v-model="form.phone"
                    :countries="countries"
                    default-country="SA"
                    @country-changed="onCountryChanged"
                    :class="{
                      'border-red-500': errors.phone,
                      'border-[#EEEDEE]': !errors.phone,
                    }"
                  />
                </VeeField>
              </div>
              <VeeErrorMessage
                name="phone"
                class="text-red-500 text-sm mt-1 block"
              />
            </div>

            <!-- Stage and Grade Fields -->
            <div class="flex flex-wrap lg:!flex-nowrap gap-3">
              <!-- Stage Field - Fixed Version -->
              <div class="w-[100%]">
                <label
                  for="select_stage"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.select_stage") }}
                </label>
                <VeeField
                  @input="backendError = ''"
                  name="stage"
                  v-slot="{ field, errors, handleChange, handleBlur }"
                >
                  <Listbox
                    :model-value="selectedStage"
                    @update:model-value="
                      (value) => {
                        backendError = '';
                        selectedStage = value;
                        handleChange(value);
                        handleBlur();
                      }
                    "
                  >
                    <div class="relative">
                      <ListboxButton
                        :class="{
                          'border-red-500': errors.length > 0,
                          'border-[#EEEDEE]': errors.length === 0,
                        }"
                        class="flex justify-between cursor-pointer w-full px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                      >
                        <div class="flex-1 text-start">
                          <span
                            v-if="!selectedStage?.name"
                            class="text-[#A3A2A3]"
                          >
                            {{ $t("auth.select_stage") }}
                          </span>
                          <span v-else class="block whitespace-normal break-words">{{
                            selectedStage.name
                          }}</span>
                          <span
                            class="absolute inset-y-0 start-0 flex items-center ps-2"
                          >
                            <img
                              alt="stage"
                              src="/stage.png"
                              class="w-[24px] h-[24px] inlinee my-auto ms-1"
                            />
                          </span>
                        </div>
                        <div class="flex items-center gap-2">
                          <button
                            v-if="selectedStage"
                            type="button"
                            @click.stop="
                              () => {
                                selectedStage = null;
                                handleChange(null);
                                handleBlur();
                                clearStage();
                                backendError = '';
                              }
                            "
                            class="text-[#a2a2a2] hover:text-red-500 cursor-pointer"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <img
                            alt="arrow"
                            src="/arrow_down.svg"
                            class="w-[16px] h-[16px] inline my-auto"
                          />
                        </div>
                      </ListboxButton>
                      <ListboxOptions
                        class="z-[900] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none"
                      >
                        <ListboxOption
                          v-slot="{ active, selected }"
                          v-for="stage in stages?.data?.data"
                          :key="stage.id"
                          :value="stage"
                          as="template"
                          class="cursor-pointer"
                          @click="
                            () => {
                              getGrades(stage?.id);
                              selectedGrade = null;
                              handleChange(stage);
                              handleBlur();
                            }
                          "
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-[#4d008033] text-[#4d0080]'
                                : 'text-gray-900',
                              'relative cursor-default select-none py-2 pe-10 ps-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]"
                              >{{ stage.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 end-0 flex items-center pe-3 text-[#4d0080]"
                            >
                              <img
                                alt="check"
                                src="/check.svg"
                                class="w-[16px] h-[16px]"
                              />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </VeeField>
                <VeeErrorMessage
                  name="stage"
                  class="text-red-500 text-sm mt-1 block"
                />
              </div>

              <!-- Grade Field -->
              <div class="w-[100%]">
                <label
                  for="select_grade"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.select_grade") }}
                </label>
                <VeeField
                  @input="backendError = ''"
                  name="grade"
                  v-slot="{ field, errors, handleChange, handleBlur }"
                >
                  <Listbox
                    :model-value="selectedGrade"
                    @update:model-value="
                      (value) => {
                        backendError = '';
                        selectedGrade = value;
                        handleChange(value);
                        handleBlur();
                      }
                    "
                    :disabled="!selectedStage"
                  >
                    <div class="relative">
                      <ListboxButton
                        :class="{
                          'border-red-500': errors.length > 0,
                          'border-[#EEEDEE]': errors.length === 0,
                          'opacity-50 cursor-not-allowed': !selectedStage,
                          'cursor-pointer': selectedStage,
                        }"
                        class="flex justify-between text w-full px-4 py-3 ps-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                      >
                        <div class="flex-1 text-start">
                          <span
                            v-if="!selectedGrade?.name"
                            class="text-[#A3A2A3]"
                          >
                            {{
                              !selectedStage
                                ? $t("validation.select_stage_first")
                                : $t("auth.select_grade_field")
                            }}
                          </span>
                          <span v-else class="block whitespace-normal break-words">{{
                            selectedGrade.name
                          }}</span>
                          <span
                            class="absolute inset-y-0 start-0 flex items-center ps-2"
                          >
                            <img
                              alt="grade"
                              src="/grade.png"
                              class="w-[24px] h-[24px] inline my-auto ms-1"
                            />
                          </span>
                        </div>
                        <div class="flex items-center gap-2">
                          <button
                            v-if="selectedGrade"
                            type="button"
                            @click.stop="
                              () => {
                                selectedGrade = null;
                                handleChange(null);
                                handleBlur();
                                backendError = '';
                              }
                            "
                            class="text-[#a2a2a2] hover:text-red-500 cursor-pointer"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <img
                            alt="arrow"
                            src="/arrow_down.svg"
                            class="w-[16px] h-[16px] inline my-auto"
                            :class="{ 'opacity-50': !selectedStage }"
                          />
                        </div>
                      </ListboxButton>
                      <ListboxOptions
                        v-if="selectedStage"
                        class="z-[900] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none"
                      >
                        <ListboxOption
                          v-if="!grades?.data?.data?.length"
                          class="relative cursor-default select-none py-2 pe-10 pe-4 text-gray-500"
                          disabled
                        >
                          {{ $t("auth.no_grades_available") }}
                        </ListboxOption>
                        <ListboxOption
                          v-else
                          v-slot="{ active, selected }"
                          v-for="grade in grades?.data?.data"
                          :key="grade.id"
                          :value="grade"
                          as="template"
                          class="cursor-pointer"
                          @click="
                            () => {
                              handleChange(grade);
                              handleBlur();
                            }
                          "
                        >
                          <li
                            :class="[
                              active
                                ? 'bg-[#4d008033] text-[#4d0080]'
                                : 'text-gray-900',
                              'relative cursor-default select-none py-2 pe-10 ps-4',
                            ]"
                          >
                            <span
                              :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                              ]"
                              >{{ grade.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 end-0 flex items-center pe-3 text-[#4d0080]"
                            >
                              <img
                                alt="check"
                                src="/check.svg"
                                class="w-[16px] h-[16px]"
                              />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </VeeField>
                <VeeErrorMessage
                  name="grade"
                  class="text-red-500 text-sm mt-1 block"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="relative">
              <div>
                <label
                  for="password"
                  class="block text-[16px] font-[400] text-[#202020] mb-2"
                >
                  {{ $t("auth.password") }}
                </label>
                <div class="relative">
                  <VeeField
                    @input="backendError = ''"
                    id="password"
                    v-model="form.password"
                    :placeholder="$t('placeholders.enter_password')"
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    :class="{
                      'border-red-500': errors.password,
                      'border-[#EEEDEE]': !errors.password,
                    }"
                    class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-start"
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
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
                  {{ $t("auth.password_confirmation") }}
                </label>
                <div class="relative">
                  <VeeField
                    @input="backendError = ''"
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    :placeholder="$t('placeholders.enter_password_confirmation')"
                    name="password_confirmation"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    :class="{
                      'border-red-500': errors.password_confirmation,
                      'border-[#EEEDEE]': !errors.password_confirmation,
                    }"
                    class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-start"
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
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

            <div class="text-[13px] flex gap-3">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  value="terms"
                  v-model="terms"
                  class="w-[18px] h-[18px] rounded-none accent-[#4B007D] cursor-pointer"
                  @input="backendError = ''"
                />
              </div>
              <div>
                <span class="text-[#202020]">{{ $t("auth.agree_terms") }}</span>
                <span
                  class="text-[#E77C5A] font-[700] cursor-pointer hover:underline"
                  @click="openTermsPopup = true"
                  >{{ $t("auth.terms_and_conditions") }}</span
                >
              </div>
            </div>

            <!-- Submit Button -->
            <BaseButton
              :content="$t('auth.register')"
              border-color="#E77C5A"
              bg-color="#4B007D"
              class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
              :lg_reversed_space="true"
              width="100%"
              font_size="18px"
              :disabled="Object.keys(errors).length > 0 || isSubmitting"
              :pending="isSubmitting"
            />
          </VeeForm>
          <div class="mt-12 flex justify-center text-[16px]">
            <span>{{ $t("auth.already_have_account") }}</span>
            <NuxtLink
              :to="localePath('/auth/login')"
              class="text-[#E77C5A] mx-2 font-[700] hover:underline"
            >
              {{ $t("auth.login") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup :show="openTermsPopup" @close="openTermsPopup = false" type="terms" />
</template>

<script setup>
import * as yup from "yup";
import { apiRequest } from "~/utils/api";
import countries from "~/assets/data/countries.json";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
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
const localePath = useLocalePath();

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: null,
  password: "",
  password_confirmation: "",
});
const terms = ref(false);
const email = useCookie("langua_email_otp");
const selectedCountryCode = ref("");
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const OtpTokenCookie = useCookie("langua_otp_token");
const backendError = ref("");
const selectedStage = ref(null);
const selectedGrade = ref(null);
const stages = ref([]);
const grades = ref([]);
const isSubmitting = ref(false);
const openTermsPopup = ref(false);

const onCountryChanged = (country) => {
  console.log("Country changed to:", country);
  selectedCountryCode.value = country?.phone[0];
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required(t("validation.first_name_required"))
    .trim()
    .min(2, t("validation.first_name_min"))
    .max(20, t("validation.first_name_max")),
  lastName: yup
    .string()
    .required(t("validation.last_name_required"))
    .trim()
    .min(2, t("validation.last_name_min"))
    .max(20, t("validation.last_name_max")),
  email: yup
    .string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid"))
    .trim()
    .lowercase(),
  phone: yup.string().required(t("validation.phone_required")),
  stage: yup.object().required(t("validation.stage_required")),
  grade: yup.object().required(t("validation.grade_required")),
  password: yup
    .string()
    .required(t("validation.password_required"))
    .min(8, t("validation.password_min"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      t("validation.password_strength")
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("validation.password_mismatch"))
    .required(t("validation.password_confirmation_required")),
});

const clearStage = () => {
  selectedStage.value = null;
  selectedGrade.value = null;
  grades.value = [];
};

const clearGrade = () => {
  selectedGrade.value = null;
};

const handleSubmit = async (values) => {
  if (isSubmitting.value) return;

  backendError.value = "";
  isSubmitting.value = true;

  try {
    // Validate required fields
    // if (!selectedStage.value?.id || !selectedGrade.value?.id) {
    //   backendError.value = t("validation.stage_grade_required");
    //   return;
    // }
    const userData = {
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone,
      password: values.password,
      password_confirmation: values.password_confirmation,
      academic_stage_id: selectedStage.value.id,
      academic_year_id: selectedGrade.value.id,
      country_code: selectedCountryCode.value
        ? selectedCountryCode.value
        : "+966",
      terms: terms.value ? 1 : 0,
    };

    const result = await apiRequest(
      "POST",
      "/auth/register",
      userData,
      {},
      OtpTokenCookie.value,
      locale.value
    );
    if (result?.data?.access_token) {
      OtpTokenCookie.value = result.data?.access_token;
      email.value = values?.email;
      router.push(localePath("/auth/otp?type=register"));
    } else {
      throw new Error("Registration failed - no token received");
    }
  } catch (error) {
    console.error("Error registering:", error);
    backendError.value =
      error?.response?.data?.message ||
      error?.message ||
      t("validation.registration_failed");
  } finally {
    isSubmitting.value = false;
  }
};

const getGrades = async (stageId) => {
  if (!stageId) return;

  try {
    grades.value = await apiRequest(
      "GET",
      `/academic-years?academic_stage=${stageId}&page=0&limit=0&is_active=1`,
      {},
      {},
      OtpTokenCookie.value,
      locale.value
    );
  } catch (error) {
    console.error("Failed to load grades:", error);
    grades.value = [];
  }
};

// Watch for stage changes to reset grade selection
watch(selectedStage, (newStage) => {
  if (newStage?.id) {
    selectedGrade.value = null;
    getGrades(newStage.id);
  }
});

onMounted(async () => {
  try {
    stages.value = await apiRequest(
      "GET",
      "/academic-stages?page=0&limit=0&is_active=1",
      {},
      {},
      OtpTokenCookie.value,
      locale.value
    );
  } catch (error) {
    console.error("Failed to load stages:", error);
    stages.value = [];
  }
});
</script>

<style>
input::-ms-reveal,
input::-ms-clear {
  display: none !important;
}
</style>
