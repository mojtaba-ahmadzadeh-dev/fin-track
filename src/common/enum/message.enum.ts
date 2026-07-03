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
