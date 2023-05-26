import { string, object, number, mixed } from "yup";
export default function (
  body = {
    picture: "",
    width: 0,
    widthOfPrintingArea: 0,
  },
  language
) {
  console.log(body);
  let message = {
    persian: {
      width: "پر کردن فیلد عرض محصول الزامیست",
      widthOfPrintingArea: "پر کردن فیلد عرض محل چاپ الزامیست",
      picture: {
        fileSize: "حجم فایل نباید بیشتر از 1 مگابایت باشد",
      },
    },
  };
  if (language === "fa") message = message.persian;
  const productInputSchemaPageTow = object().shape({
    width: number()
      .required(message.width)
      .test("required", message.width, (width) => (width == 0 ? false : true)),
    widthOfPrintingArea: number()
      .required(message.widthOfPrintingArea)
      .test("required", message.widthOfPrintingArea, (widthOfPrintingArea) =>
        widthOfPrintingArea == 0 ? false : true
      ),
    picture: mixed()
      .test("required", "عکس الزامی می باشد", (pic) => (pic ? true : false))
      .test("fileSize", message.picture.fileSize, (picture) => {
        return picture.size > 1000000 ? false : true;
      }),
  });

  return productInputSchemaPageTow.validate(body, {
    abortEarly: false,
  });
}
