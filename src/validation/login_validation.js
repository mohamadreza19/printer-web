import { object, string, number, date, InferType } from "yup";

export default function (
  body = {
    username: "",
    password: "",
  },
  language = "fa"
) {
  let messages = {
    username: {
      required: "",

      minLength: "",
      maxLength: "",
    },
    password: {
      required: "",
      match: "",
      minLength: "",
      maxLength: "",
    },
  };
  if (language == "fa") {
    messages = {
      username: {
        required: "نام کاربری الزامی می باشد",
        minLength: "نام کاربری نباید کمتر از چهار رقم باشد",
      },
      password: {
        required: "پسورد الزامی می باشد",
        match:
          "رمز عبور باید دارای حروف بزرگ و کوچک انگلیسی و  همچنین عدد باشد",
        minLength: "پسورد نباید کمتر از ۸ رقم باشد",
        maxLength: "پسورد نباید بیشتر از ۱۶ رقم باشد",
      },
    };
  }
  if (language == "en") {
  }
  if (language == "tr") {
  }

  let loginSchema = object().shape({
    username: string().min(4, messages.username.minLength),
    password: string()
      // .min(8, messages.password.minLength)
      .max(16, messages.password.maxLength),
    // .matches(/^(?=.*\d).{0,}$/, messages.password.match),
    // .matches(/^(?=.*\d).{0,}$/, messages.password.match),
    // .matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/,
    //   messages.password.match
    // ),
  });
  return loginSchema.validate(body, {
    abortEarly: false,
  });
}
