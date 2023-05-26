import { object, string, number, date, InferType } from "yup";

export default function (
  labelName = {
    persian: "",
    english: "",
    turkish: "",
  },

  language = "fa"
) {
  console.log(labelName);
  let messages = {
    labelName: {
      persian: "",
      english: "",
      turkish: "",
    },
  };
  if (language == "fa") {
    messages.labelName = {
      persian: "نام فارسی لیبل نباید خالی بماند.",
      english: "نام انگلیسی لیبل نباید خالی بماند.",
      turkish: "نام ترکی لیبل نباید خالی بماند.",
    };
  }
  if (language == "en") {
    messages.labelName = {
      persian: "The name of the label in Persian should not be empty",
      english: "The label name in English must not be empty",
      turkish: "The name of the label in Turkish must not be empty",
    };
  }
  if (language == "tr") {
    messages.labelName = {
      persian: "Etiketin Farsça adı boş bırakılmamalıdır..",
      english: "Etiketin İngilizce adı boş bırakılmamalıdır.",
      turkish: "Etiketin Türkçe adı boş bırakılmamalıdır.",
    };
  }

  let labelInputSchema = object().shape({
    persian: string().required(messages.labelName.persian),
    english: string().required(messages.labelName.english),
    turkish: string().required(messages.labelName.turkish),
  });
  return labelInputSchema.validate(labelName, {
    abortEarly: false,
  });
}
