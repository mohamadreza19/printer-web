import { object, string } from "yup";

export default function (
  body = {
    createdBy: "string",
    projectName: "string",
  },
  language = "fa"
) {
  let messages = {
    createdBy: {
      required: "",

      minLength: "",
      maxLength: "",
    },
    projectName: {
      required: "",

      minLength: "",
      maxLength: "",
    },
  };
  if (language == "fa") {
    messages = {
      createdBy: {
        required: "نام سازنده الزامی می باشد",
        minLength: "نام سازنده نباید کمتر از چهار رقم باشد",
      },
      projectName: {
        required: "نام پروژه الزامی می باشد",
        minLength: "نام پروژه نباید کمتر از چهار رقم باشد",
      },
    };
  }
  if (language == "en") {
  }
  if (language == "tr") {
  }

  let loginSchema = object().shape({
    createdBy: string().min(4, messages.createdBy.minLength),
    projectName: string().min(4, messages.projectName.minLength),
  });
  return loginSchema.validate(body, {
    abortEarly: false,
  });
}
