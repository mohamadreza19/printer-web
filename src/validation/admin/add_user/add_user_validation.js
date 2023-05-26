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
      daysToExpire: 1,
      productAccess: true,
    },
    english: {},
    turkish: {},
  };
  if (language === "fa") {
    message = message.persian;
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
  });

  return add_user_schema.validate(body, {
    abortEarly: false,
  });
}
