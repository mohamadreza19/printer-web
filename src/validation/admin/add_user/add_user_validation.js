import { object, string, number, date, InferType } from "yup";
import parsePhoneNumber from "libphonenumber-js/min";
export default function (
  body = {
    username: "",
    companyName: "",
    managerName: "",
    phoneNumber: "",
    companyZipCode: "",
    province: "",
    city: "",
    address: "",
    email: "",
    daysToExpire: 0,
    productAccess: true,
  },
  language = "fa"
) {
  console.log(body);
  let message = {
    persian: {
      username: "نام کاربری نباید کمتر از پنج کارکتر باشد",
      companyName: "نام شرکت یا موسسه نباید کمتر از پنج کاراکتر باشد",
      managerName: "نام مدیریت نباید کمتر از پنج کاراکتر باشد",
      phoneNumber:
        " شماره تماس وارد شده صحیح نمیباشد . فرمت شماره تماس باید 9030000000 باشد",
      companyZipCode: {
        number: "کد پستی باید عدد باشد",
        exact: "کد پستی باید دقیقا ذه رقم باشد",
      },
      province: "",
      city: "",
      address: "آدرس وارد شده نباید کمتر از پنج کاراکتر باشد",
      email: {
        email: "آدرس ایمیل وارد شده باید معتبر باشد",
        required: "آدرس ایمیل الزامی می باشد",
      },
      expiresIn: {
        positive: "عدد وارد شده باید مثبت باشد",
      },
      productAccess: true,
    },
    english: {
      username: "Username must not be less than five characters",
      companyName:
        "Company or institution name must not be less than five characters",
      managerName: "Manager name must not be less than five characters",
      phoneNumber:
        "The provided phone number is incorrect. The phone number format should be 9030000000",
      companyZipCode: {
        number: "Zip code must be a number",
        exact: "Zip code must be exactly five digits",
      },
      province: "",
      city: "",
      address: "The address provided must not be less than five characters",
      email: {
        email: "The provided email address must be valid",
        required: "Email address is required",
      },
      expiresIn: {
        positive: "The entered number must be positive",
      },
      productAccess: true,
    },
    turkish: {
      username: "Kullanıcı adı beş karakterden az olmamalıdır",
      companyName: "Şirket veya kurum adı beş karakterden az olmamalıdır",
      managerName: "Yönetici adı beş karakterden az olmamalıdır",
      phoneNumber:
        "Girilen telefon numarası geçerli değil. Telefon numarası formatı 9030000000 olmalıdır",
      companyZipCode: {
        number: "Posta kodu rakam olmalıdır",
        exact: "Posta kodu tam olarak beş haneli olmalıdır",
      },
      province: "",
      city: "",
      address: "Girilen adres beş karakterden az olmamalıdır",
      email: {
        email: "Girilen e-posta adresi geçerli olmalıdır",
        required: "E-posta adresi zorunludur",
      },
      expiresIn: {
        positive: "Girilen sayı pozitif olmalıdır",
      },
      productAccess: true,
    },
  };
  if (language === "fa") {
    message = message.persian;
  }
  if (language === "en") {
    message = message.english;
  }
  if (language === "tr") {
    message = message.turkish;
  }

  const phoneNumberFOrvalidate = parsePhoneNumber(body.phoneNumber, "IR");

  if (!phoneNumberFOrvalidate) {
    const wrongPhone = new Error(message.phoneNumber);
    wrongPhone.inner = [
      {
        path: "phoneNumber",
        message: message.phoneNumber,
      },
    ];
    throw wrongPhone;
  }
  if (phoneNumberFOrvalidate.isValid()) {
  } else {
    const wrongPhone = new Error(message.phoneNumber);
    wrongPhone.inner = [
      {
        path: "phoneNumber",
        message: message.phoneNumber,
      },
    ];
    throw wrongPhone;
  }
  console.log(body);
  const add_user_schema = object().shape({
    username: string().min(5, message.username),
    companyName: string().min(5, message.companyName),
    managerName: string().min(5, message.managerName),
    companyZipCode: string()
      // .min(10, message.companyZipCode.min)
      .test(
        "companyZipCode",
        message.companyZipCode.exact,
        (val) => val.toString().length === 10
      ),
    // .max(10, message.companyZipCode.max)
    email: string().email(message.email.email).required(message.email.required),
    address: string().min(5, message.address),
    daysToExpire: number().positive(message.expiresIn.positive),
  });

  return add_user_schema.validate(body, {
    abortEarly: false,
  });
}
