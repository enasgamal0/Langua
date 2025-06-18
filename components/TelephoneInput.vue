<template>
  <div class="relative" dir="ltr">
    <div class="flex">
      <!-- Country Selector -->
      <div class="relative">
        <button
          type="button"
          @click="toggleDropdown"
          class="cursor-pointer flex items-center px-3 py-[14px] border border-[#EEEDEE] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4B007D]"
        >
          <img
            v-if="selectedCountry?.image"
            :src="selectedCountry.image"
            :alt="locale === 'ar' ? selectedCountry.name_ar || selectedCountry.name : selectedCountry.name"
            class="w-5 h-3 mr-2 object-cover"
          />
          <span class="text-gray-700 text-sm font-medium">
            {{ (selectedCountry?.phone && selectedCountry.phone[0]) || "+" }}
          </span>
          <svg
            class="ml-2 h-4 w-4 text-gray-400"
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown -->
        <div
          v-if="isDropdownOpen"
          class="absolute z-50 mt-1 w-80 bg-white border border-[#EEEDEE] shadow-lg max-h-60 overflow-y-auto"
        >
          <!-- Search Input -->
          <div class="p-2 border-b border-gray-200">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('auth.search_countries')"
              class="w-full px-3 py-2 border border-[#EEEDEE] text-sm focus:outline-none focus:ring-2 focus:ring-[#4B007D]"
            />
          </div>

          <!-- Country List -->
          <div class="max-h-48 overflow-y-auto">
            <button
              v-for="country in filteredCountries"
              :key="country.iso?.alpha2 || country.name"
              type="button"
              @click="selectCountry(country)"
              class="cursor-pointer w-full flex items-center px-3 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-left"
            >
              <img
                :src="country.image"
                :alt="locale === 'ar' ? country.name_ar || country.name : country.name"
                class="w-5 h-3 mr-3 object-cover"
              />
              <span class="flex-1 text-sm text-gray-900">{{
                locale === 'ar' ? country.name_ar || country.name : country.name
              }}</span>
              <span class="text-sm text-gray-500 font-medium">{{
                (country.phone && country.phone[0]) || "N/A"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Phone Number Input -->
      <input
        v-model="phoneNumber"
        type="tel"
        class="flex-1 px-4 py-3  border border-l-0 border-[#EEEDEE] focus:outline-none focus:ring-2 focus:ring-[#4B007D]"
        @input="onPhoneNumberInput"
      />
    </div>

    <!-- Validation Message -->
    <p v-if="validationMessage" class="mt-1 text-sm text-red-600">
      {{ validationMessage }}
    </p>
  </div>
</template>

<script setup>
const { locale, t } = useI18n();
// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  countries: {
    type: Array,
    required: true,
  },
  defaultCountry: {
    type: String,
    default: "SA",
  },
  validate: {
    type: Boolean,
    default: true,
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "country-changed"]);

// Reactive data
const isDropdownOpen = ref(false);
const searchQuery = ref("");
const phoneNumber = ref("");
const selectedCountry = ref(null);
const validationMessage = ref("");

// Computed
const filteredCountries = computed(() => {
  if (!searchQuery.value || !props.countries) return props.countries || [];

  const query = searchQuery.value.toLowerCase();
  return props.countries.filter((country) => {
  const name = country.name || "";
  const nameAr = country.name_ar || "";
  const phone = country?.phone?.[0] || "";

  return (
    name.toLowerCase().includes(query) ||
    nameAr.includes(query) ||
    phone.includes(query)
  );
});

});

// Methods
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    searchQuery.value = "";
  }
};

const selectCountry = (country) => {
  if (!country || !country.phone || !country.phone[0]) {
    console.warn("Invalid country selected:", country);
    return;
  }
  selectedCountry.value = country;
  isDropdownOpen.value = false;

  updateModelValue();

  if (props.validate) {
    validatePhoneNumber();
  }
  emit("country-changed", country);
};

const onPhoneNumberInput = () => {
  updateModelValue();

  if (props.validate) {
    validatePhoneNumber();
  }
};

const updateModelValue = () => {
  if (selectedCountry.value?.phone?.[0]) {
    const cleanNumber = phoneNumber.value.replace(/[^\d\s-]/g, "");
    const digitsOnly = cleanNumber.replace(/[\s-]/g, "");
    const fullNumber = selectedCountry.value.phone[0] + digitsOnly;
    emit("update:modelValue", fullNumber);
  } else {
    emit("update:modelValue", phoneNumber.value);
  }
};

const validatePhoneNumber = () => {
  if (
    !phoneNumber.value ||
    !selectedCountry.value ||
    !selectedCountry.value.phone?.[0]
  ) {
    validationMessage.value = "";
    return;
  }

  const digitsOnly = phoneNumber.value.replace(/[\s-]/g, "");
  const expectedLength = selectedCountry.value.phoneLength || 10;

  if (digitsOnly.length < expectedLength) {
    validationMessage.value = `Phone number should be ${expectedLength} digits`;
  } else if (digitsOnly.length > expectedLength) {
    validationMessage.value = `Phone number should not exceed ${expectedLength} digits`;
  } else {
    validationMessage.value = "";
  }
};

const closeDropdown = (event) => {
  if (!event.target.closest(".relative")) {
    isDropdownOpen.value = false;
  }
};

const parseInitialValue = () => {
  if (props.modelValue && props.countries && props.countries.length > 0) {
    const matchingCountry = props.countries.find(
      (c) => c?.phone?.[0] && props.modelValue.startsWith(c.phone[0])
    );

    if (matchingCountry) {
      selectedCountry.value = matchingCountry;
      phoneNumber.value = props.modelValue.replace(
        matchingCountry.phone[0],
        ""
      );
    }
  }
};

onMounted(() => {
  if (props.countries && props.countries.length > 0) {
    const defaultCountry = props.countries.find(
      (c) => c?.iso?.alpha2 === props.defaultCountry && c?.phone?.[0]
    );
    selectedCountry.value =
      defaultCountry ||
      props.countries.find((c) => c?.phone?.[0]) ||
      props.countries[0];
  }

  parseInitialValue();
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && props.countries && props.countries.length > 0) {
      const country = props.countries.find(
        (c) => c?.phone?.[0] && newValue.startsWith(c.phone[0])
      );
      if (country && country !== selectedCountry.value) {
        selectedCountry.value = country;
        phoneNumber.value = newValue.replace(country.phone[0], "");
      } else if (selectedCountry.value?.phone?.[0]) {
        const expectedPhoneNumber = newValue.replace(
          selectedCountry.value.phone[0],
          ""
        );
        if (expectedPhoneNumber !== phoneNumber.value) {
          phoneNumber.value = expectedPhoneNumber;
        }
      }
    } else if (!newValue) {
      phoneNumber.value = "";
    }
  }
);

watch(
  () => props.countries,
  () => {
    if (
      props.countries &&
      props.countries.length > 0 &&
      !selectedCountry.value
    ) {
      const defaultCountry = props.countries.find(
        (c) => c?.iso?.alpha2 === props.defaultCountry && c?.phone?.[0]
      );
      selectedCountry.value =
        defaultCountry ||
        props.countries.find((c) => c?.phone?.[0]) ||
        props.countries[0];
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
