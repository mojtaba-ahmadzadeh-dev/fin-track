export enum AuthMessage {
  // Success Messages
  OTP_SENT_SUCCESS = "کد تأیید با موفقیت ارسال شد",
  OTP_VERIFIED_SUCCESS = "کد تأیید با موفقیت تأیید شد",

  // Error Messages
  PHONE_AND_CODE_REQUIRED = "شماره تلفن و کد تأیید الزامی است",
  USER_NOT_FOUND = "کاربر یافت نشد",
  OTP_NOT_FOUND = "کد تأیید یافت نشد",
  INVALID_OTP = "کد تأیید اشتباه است",
  OTP_EXPIRED = "کد تأیید منقضی شده است",
  VERIFICATION_ERROR = "خطا در تأیید کد",
  TryAgain = "دوباره تلاش کنید",
  LoginAgain = "مجددا وارد حساب کاربری خود شوید",
  LOGIN_IS_REQUIRED = "وارد حساب کاربری خود شوید",
}

export enum UserMessage {
  // Success Messages
  USER_ROLE_UPDATED = "نقش کاربر با موفقیت به‌روزرسانی شد",
  PROFILE_UPDATED = "پروفایل با موفقیت به‌روزرسانی شد",
  USER_FOUND = "کاربر با موفقیت یافت شد",
  USERS_FOUND = "لیست کاربران با موفقیت دریافت شد",
  PROFILE_FETCHED = "پروفایل کاربر با موفقیت دریافت شد",

  // Error Messages
  USER_NOT_FOUND = "کاربر یافت نشد",
  EMAIL_ALREADY_EXISTS = "این ایمیل قبلاً ثبت شده است",
  USER_NOT_AUTHENTICATED = "کاربر احراز هویت نشده است",
}

export enum validationMessage {
  InvalidImageFormat = "فرمت تصویر انتخاب شده باید از نوع jpg و png باشد",
  InvalidEmailFormat = "ایمیل وارد شده صحیح نمی باشد",
  InvalidPhoneFormat = "شماره موبایل وارد شده صحیح نمی باشد",
}

export enum CategoryMessage {
  // Success
  CREATED = "تم إنشاء التصنيف بنجاح",
  DELETED = "دسته‌بندی با شناسه {id} با موفقیت حذف شد",

  // Error
  PARENT_NOT_FOUND = "الفئة الأب غير موجودة",
  SLUG_ALREADY_EXISTS = "الـ slug '{slug}' مستخدم بالفعل",
  NOT_FOUND = "دسته‌بندی یافت نشد",
  NOT_FOUND_BY_ID = "دسته‌بندی با شناسه {id} یافت نشد",
}

export enum AccountMessage {
  // ==================== Success Messages ====================
  CREATED = "حساب مالی با موفقیت ایجاد شد",
  UPDATED = "حساب با موفقیت ویرایش شد",
  DELETED = "حساب با موفقیت به طور کامل حذف شد",
  FOUND_ALL = "حساب‌های کاربر با موفقیت دریافت شد",
  FOUND_ONE = "جزئیات حساب با موفقیت دریافت شد",
  BALANCE_FETCHED = "موجودی لحظه‌ای حساب دریافت شد",

  // ==================== Error Messages ====================
  NOT_FOUND = "حساب مورد نظر یافت نشد یا دسترسی ندارید",
  NOT_FOUND_BY_ID = "حساب با شناسه {id} یافت نشد یا دسترسی ندارید",
  USER_NOT_AUTHENTICATED = "کاربر احراز هویت نشده است",
  INVALID_ACCOUNT_TYPE = "نوع حساب مالی معتبر نیست",
  CURRENCY_INVALID = "واحد پول وارد شده معتبر نیست",
  INITIAL_BALANCE_INVALID = "موجودی اولیه نباید منفی باشد",
  NAME_REQUIRED = "نام حساب مالی الزامی است",
  NAME_TOO_LONG = "نام حساب مالی نباید بیشتر از ۱۰۰ کاراکتر باشد",
  ACCOUNT_NOT_ACTIVE = "حساب مورد نظر غیرفعال است",
  DEFAULT_ACCOUNT_NOT_FOUND = "حساب پیش‌فرض یافت نشد",
  CANNOT_DELETE_DEFAULT = "نمی‌توان حساب پیش‌فرض را حذف کرد",
  CANNOT_UPDATE_DEFAULT = "نمی‌توان حساب پیش‌فرض را ویرایش کرد",
  DUPLICATE_ACCOUNT_NAME = "حسابی با این نام قبلاً برای کاربر ثبت شده است",
  BALANCE_UPDATE_FAILED = "به‌روزرسانی موجودی با خطا مواجه شد",
}
