<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[#00000055]"
    @click="handleClickOutside"
  >
    <div
      ref="modalRef"
      class="relative w-full p-6 bg-white bg-no-repeat mx-5"
      :class="type == 'logout' ? 'max-w-xl' : 'max-w-3xl'"
      style="
        background-image: url('/slider_top.png'), url('/slider_bottom.png');
        background-position: top 0 right 0, bottom 0 left 0;
      "
      data-aos="zoom-in"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-0 left-0 text-white bg-[#4B007D] h-[40px] w-[40px] text-[16px] font-[700] cursor-pointer"
      >
        ✕
      </button>

      <!-- Title -->
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'terms'"
      >
        {{ $t("static_pages.terms") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'privacy'"
      >
        {{ $t("static_pages.privacy") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'logout'"
      >
        {{ $t("static_pages.logout") }}
      </h2>

      <p
        v-if="type === 'logout'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.logout_desc") }}
      </p>

      <!-- Image -->
      <div class="flex justify-center mb-4">
        <img
          v-if="type == 'terms'"
          src="/terms.png"
          alt="Terms Icon"
          class="w-[106px] h-[120px]"
        />
        <img
          v-if="type == 'privacy'"
          src="/privacy.png"
          alt="Privacy Icon"
          class="w-[111px] h-[120px]"
        />
        <img
          v-if="type == 'logout'"
          src="/logout_img.png"
          alt="Logout Icon"
          class="w-[120px] h-[120px]"
        />
      </div>

      <!-- Content -->
      <div
        class="text-start text-[16px] font-[400] overflow-y-auto max-h-[60vh] px-5 lg:px-16"
      >
        <div v-if="type === 'terms'" v-html="terms_ar"></div>
        <div v-if="type === 'privacy'" v-html="privacy_ar"></div>
      </div>

      <!-- Logout Button -->
      <div
        v-if="type === 'logout'"
        class="flex items-center justify-center mt-4 mb-2 text-[#DC3545] cursor-pointer transition-colors duration-200"
        @click="handleLogout"
      >
        <div
          class="flex items-center justify-center gap-3 border border-[#DC3545] px-5 py-2 hover:bg-red-50 w-[314px] h-[48px]"
        >
          <img src="/logout.png" class="w-[20px] h-[20px]" />
          <span>{{ $t("nav.logout") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  type: String,
});
const emit = defineEmits(["close"]);

const modalRef = ref(null);

const handleClickOutside = (e) => {
  if (modalRef.value && !modalRef.value.contains(e.target)) {
    emit("close");
  }
};

const handleLogout = () => {
  apiRequest("POST", "/auth/logout");
  const languaCookie = useCookie("langua_token");
  languaCookie.value = null;
  document.body.classList.remove("overflow-hidden");
  emit("close");
  navigateTo(localePath("/"));
};

watch(
  () => props.show,
  (visible) => {
    if (!process.client) return;

    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove("overflow-hidden");
  }
});

const privacy_ar = ref(`<p>
            باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية.
            إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام المنصة.
          </p>
  
          <p><strong>1. الاستخدام المسموح به</strong><br />
            يُسمح لك باستخدام المنصة لأغراض تعليمية وشخصية فقط، ولا يجوز إعادة توزيع أو بيع أو استغلال المحتوى بأي شكل تجاري دون إذن كتابي مسبق من إدارة المنصة.
          </p>
  
          <p><strong>2. إنشاء الحساب</strong><br />
            يجب أن تكون المعلومات التي تقدمها دقيقة وحديثة. أنت مسؤول عن الحفاظ على سرية بيانات الدخول إلى حسابك، وتتحمل المسؤولية الكاملة عن جميع الأنشطة التي تتم من خلاله.
          </p>
  
          <p><strong>3. الاشتراكات والدفع</strong><br />
            الاشتراك في المنصة يتطلب دفع الرسوم المحددة لكل باقة. لا تُسترد أي مبالغ مدفوعة بعد إتمام عملية الشراء، إلا إذا قررت الإدارة خلاف ذلك طبقًا لسياسة الاسترداد الخاصة بها.
          </p>`);
const privacy_en = ref(`<p>
  By using this platform, you agree to abide by the following terms and conditions. 
  If you do not agree to any part of these terms, please do not use the platform.
</p>

<p><strong>1. Permitted Use</strong><br />
  You are allowed to use the platform for educational and personal purposes only. 
  Redistribution, sale, or commercial exploitation of the content in any form is not allowed 
  without prior written permission from the platform administration.
</p>

<p><strong>2. Account Creation</strong><br />
  The information you provide must be accurate and up-to-date. 
  You are responsible for maintaining the confidentiality of your account login credentials, 
  and you bear full responsibility for all activities carried out through your account.
</p>

<p><strong>3. Subscriptions and Payments</strong><br />
  Subscription to the platform requires payment of the specified fees for each plan. 
  Any amount paid is non-refundable after the purchase is completed, 
  unless otherwise decided by the administration in accordance with its refund policy.
</p>`);

const terms_ar = ref(` <h1 class="text-2xl font-bold mb-6">الشروط والأحكام</h1>

  <p class="mb-4">
    باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية. إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام المنصة.
  </p>

  <h2 class="text-xl font-semibold mt-6 mb-2">1. الاستخدام المسموح به</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>يُسمح باستخدام المنصة لأغراض تعليمية وشخصية فقط.</li>
    <li>لا يجوز إعادة توزيع أو بيع أو استغلال المحتوى لأي غرض تجاري دون إذن كتابي مسبق من إدارة المنصة.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">2. إنشاء الحساب</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>يجب أن تكون المعلومات التي تقدمها دقيقة وحديثة.</li>
    <li>أنت مسؤول عن الحفاظ على سرية بيانات الدخول إلى حسابك.</li>
    <li>تتحمل المسؤولية الكاملة عن جميع الأنشطة التي تتم من خلال حسابك.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">3. الاشتراكات والدفع</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>الاشتراك في المنصة يتطلب دفع الرسوم المحددة لكل باقة.</li>
    <li>لا تُسترد أي مبالغ مدفوعة بعد إتمام عملية الشراء، إلا إذا قررت الإدارة خلاف ذلك وفقًا لسياسة الاسترداد.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">4. حقوق الملكية الفكرية</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>جميع المواد التعليمية، والشعارات، والتصاميم، والمحتوى النصي أو المرئي مملوكة بالكامل للمنصة.</li>
    <li>يُحظر نسخها أو استخدامها دون إذن مسبق من الإدارة.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">5. سلوك المستخدم</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>يُمنع استخدام المنصة في أي نشاط غير قانوني أو ضار أو يتعارض مع الآداب العامة.</li>
    <li>يحق للإدارة تعليق أو حذف حساب أي مستخدم يخالف هذه القواعد دون إشعار مسبق.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">6. تعديلات الشروط</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>تحتفظ المنصة بالحق في تعديل الشروط والأحكام في أي وقت.</li>
    <li>سيتم إعلام المستخدمين بالتغييرات عبر تحديث هذه الصفحة.</li>
    <li>استمرار استخدام المنصة بعد التحديث يعني قبول الشروط المعدلة.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">7. الدعم الفني والتواصل</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>لأي استفسارات أو مشكلات، يمكنك التواصل معنا عبر صفحة "تواصل معنا".</li>
    <li>سنحرص على الرد في أقرب وقت ممكن.</li>
  </ul>`);
const terms_en =
  ref(`<h1 class="text-2xl font-bold mb-6">Terms and Conditions</h1>

  <p class="mb-4">
    By using this platform, you agree to abide by the following terms and conditions. If you do not agree with any part of these terms, please refrain from using the platform.
  </p>

  <h2 class="text-xl font-semibold mt-6 mb-2">1. Permitted Use</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>You may use the platform for educational and personal purposes only.</li>
    <li>Redistribution, resale, or commercial exploitation of the content is not allowed without prior written permission from the platform administration.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">2. Account Creation</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>The information you provide must be accurate and up-to-date.</li>
    <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
    <li>You are fully responsible for all activities carried out through your account.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">3. Subscriptions and Payment</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>Using the platform requires payment according to the selected subscription plan.</li>
    <li>Payments are non-refundable once the purchase is completed, unless otherwise decided by the administration according to the refund policy.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>All educational materials, logos, designs, text, and visual content are the sole property of the platform.</li>
    <li>Copying or using this content without prior permission is strictly prohibited.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">5. User Conduct</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>The platform may not be used for any illegal, harmful, or inappropriate activities.</li>
    <li>The administration reserves the right to suspend or delete any user account that violates these rules without prior notice.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">6. Modifications to Terms</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>The platform reserves the right to update these terms and conditions at any time.</li>
    <li>Users will be notified of changes by updating this page.</li>
    <li>Continued use of the platform after changes implies acceptance of the updated terms.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-6 mb-2">7. Support and Contact</h2>
  <ul class="list-disc ps-6 mb-4 space-y-1">
    <li>If you have any inquiries or issues, you can contact our support team via the "Contact Us" page.</li>
    <li>We will respond as soon as possible.</li>
  </ul>`);
</script>
