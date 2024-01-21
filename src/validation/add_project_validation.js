import { object, string, number } from "yup";

export default function (
  body = {
    createdBy: "",
    projectName: "",
    railWidth: "",
  },
  language = "fa"
) {
  // console.log({ bodyInValidate: body });
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
    railWidth: {
      required: "",
      number: "",
      minLength: "",
      maxLength: "",
    },
    railLength: {
      required: "",
      number: "",
      minLength: "",
      maxLength: "",
    },
    numberOfRail: {},
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
      railWidth: {
        required: "عرص ریل الزامی می باشد",
        number: "عرص ریل باید عدد باشد",
        minLength: "عرص ریل نباید کمتر از چهار رقم باشد",
      },
      railLength: {
        required: "عرض ریل الزامی می باشد",
        number: "طول ریل باید عدد باشد",
        minLength: "عرض ریل نباید کمتر از چهار رقم باشد",
      },
    };
  }
  if (language == "en") {
  }
  if (language == "tr") {
  }

  let Schema = object().shape({
    createdBy: string().min(4, messages.createdBy.minLength),
    projectName: string().min(4, messages.projectName.minLength),
    railWidth: number()
      .typeError(messages.railWidth.number)
      .min(4, messages.railWidth.minLength),
    railLength: number()
      .typeError(messages.railLength.number)
      .min(4, messages.railLength.minLength),
  });
  return Schema.validate(
    { ...body, railWidth: +body.railWidth },
    {
      abortEarly: false,
    }
  );
}
