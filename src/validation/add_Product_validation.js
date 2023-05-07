import { object, string, number, date, InferType } from "yup";

export default function (
  value = {
    produnctName: {
      persian: "",
      english: "",
      turkish: "",
    },
    productLink: " ",
  },
  language = "fa"
) {
  let messages = {
    produnctName: {
      persian: "",
      english: "",
      turkish: "",
    },
    productLink: "",
    productLinkMustBeLink: "",
  };
  if (language == "fa") {
    messages.produnctName = {
      persian: "نام محصول به فارسی نباید خالی باشد",
      english: "نام محصول به زبان انگلیسی نباید خالی باشد",
      turkish: "نام محصول به زبان ترکی نباید خالی باشد",
    };
    messages.productLink = "لینک محصول نباید خالی باشد";
    messages.productLinkMustBeLink = "باید رشته وارد شده لینک باشد";
  }
  if (language == "en") {
    messages.produnctName = {
      persian: "The name of the product in Persian should not be empty",
      english: "The product name in English must not be empty",
      turkish: "The name of the product in Turkish must not be empty",
    };
  }
  if (language == "tr") {
    messages.produnctName = {
      persian: "Ürünün Farsça adı boş bırakılmamalıdır.",
      english: "İngilizce ürün adı boş bırakılamaz",
      turkish: "Ürünün Türkçe adı boş bırakılamaz.",
    };
  }

  let productInputSchema = object().shape({
    productLink: string()
      .url(messages.productLinkMustBeLink)
      .required(messages.productLink),
    productName: object().shape({
      persian: string().required(messages.produnctName.persian),
      english: string().required(messages.produnctName.english),
      turkish: string().required(messages.produnctName.turkish),
    }),
  });
  return productInputSchema.validate(value, {
    abortEarly: false,
  });
}
