import { Language } from "@mui/icons-material";
import { atom, selector, useRecoilValue } from "recoil";
import { ltrClass, rtlClass } from "../styles/cssClass";
import { userReadAction } from "./actions/userAction";

export const userData = atom({
  key: "userData",
  default: {
    name: "init",
    age: 0,
    licence: false,
  },
});
export const isUserLogin = atom({
  key: "user-authentication",
  default: {
    isLoggin: true,
  },
});
export const ageIn2 = selector({
  key: "age select",
  get: ({ get }) => get(userData).age / 2,
});
export const language = atom({
  key: "language",
  default: "fa",
});
export const class_Based_Language = selector({
  key: "class_Based_Language",
  get: ({ get }) => {
    const selectedLanguage = get(language);

    switch (selectedLanguage) {
      case "en":
        return ltrClass;
        break;
      case "fa":
        return rtlClass;
        break;
      case "tr":
        return ltrClass;
        break;

      default:
        return rtlClass;
        break;
    }
  },
});
export const content_Based_Language = selector({
  key: "Content_Based_Language",
  get: ({ get }) => {
    const selectedLanguage = get(language);
    switch (selectedLanguage) {
      case "en":
        return {
          selectedLanguage: {
            text: "It seems that your location is not the same as the language, would you like to change it?",
            startButtonText: "Change to English",
            endButtonText: "ادامه با زبان فارسی",
          },
          login: {
            header: {
              supportButton: "support",
            },
            textFeilds: {
              userName: "user name",
              password: "password",
            },
            enterButton: "enter",
            remember: "remember password",
          },
          userPannel: {
            start_col: {
              row1: {
                epirationOfCredit: "Expiration of credit",
              },
              row2: {
                listOfProjects: "List of projects",
                addNewProject: "Add new project",
                listOfLabels: "List of labels",
                historyOfPrinting: "History of printing",
                settings: "Settings",
              },
              row3: "Sign out",
            },
            end_col: {
              row1: {
                frequently_asked_questions: "Frequently asked questions",
                fileUpload: "file upload",
              },
              row2: {
                searchPlaceHolder: "Search by project name",
              },
              addNewProject: {
                header: "Please enter your project information",
                inputLabelOne: "project name",
                inputLabelTwo: "Name of the creator",
                directionButton: {
                  rightToLeft: "Sort from right to left",
                  leftToRight: "Sort from left to right",
                },
                continueButton: "continue",
              },
              labelList: {
                selectedLabelsButton: "selected Labels",
                searchPlaceHolder: "Search for a label or product name",
              },
              historyOfPrinting: {
                calender: {
                  from: "Sorting from date",
                  to: "To date",
                },
                sortButton: "Sort it",
                downloadExcel: "Download Excel",
              },
            },
          },
        };
        break;
      case "fa":
        return {
          selectedLanguage: {
            text: "به نظر می رسد مکان شما با زبان یکی نیست، آیا می خواهید آن را تغییر دهید؟",
            startButtonText: "ادامه با فارسی",
            endButtonText: "Change to English",
          },
          login: {
            header: {
              supportButton: "پشتیبانی",
            },
            textFeilds: {
              userName: "نام کاربری",
              password: "رمز عبور",
            },
            enterButton: "ورود",
            remember: "فراموشی رمز عبور",
          },
          userPannel: {
            start_col: {
              row1: {
                epirationOfCredit: "انقضا اعتبار",
              },
              row2: {
                listOfProjects: "لیست پروژه ها",
                addNewProject: "افزودن پروژه جدید",
                listOfLabels: "لیست لیبل ها",
                historyOfPrinting: "تاریخچه چاپ",
                settings: "تنظیمات",
              },
              row3: " خروج از حساب کاربری",
            },
            end_col: {
              row1: {
                frequently_asked_questions: "سوالات پر تکرار",
                fileUpload: "آپلود فایل",
              },
              row2: {
                searchPlaceHolder: "جست و جو بر اساس نام پروژه",
              },
              addNewProject: {
                header: "لطفا اطلاعات پروژه خود را وارد کنید",
                inputLabelOne: " نام پروژه",
                inputLabelTwo: "نام سازنده",
                directionButton: {
                  rightToLeft: "چینش از راست به چپ",
                  leftToRight: "چینش از چپبه راست",
                },
                continueButton: "ادامه",
              },
              labelList: {
                selectedLabelsButton: "لیبل های منتخب",
                searchPlaceHolder: "جست و جوی نام لیبل یا محصول",
              },
              historyOfPrinting: {
                calender: {
                  from: "مرتب سازی از تاریخ",
                  to: "تا تاریخ",
                },
                sortButton: "مرتب کن",
                downloadExcel: "دریافت فایل اکسل",
              },
            },
          },
        };

        break;
      case "tr":
        return {
          selectedLanguage: {
            text: "Konumunuz dil ile aynı değil gibi görünüyor, değiştirmek ister misiniz?",
            startButtonText: "İngilizceye değiştir",
            endButtonText: "ادامه با زبان فارسی",
          },
          login: {
            header: {
              supportButton: "Destek",
            },
            textFeilds: {
              userName: "Kullanıcı adı",
              password: "şifre",
            },
            enterButton: "girmek",
            remember: "şifre hatırlamak",
          },
          userPannel: {
            start_col: {
              row1: {
                epirationOfCredit: "Kredinin sona ermesi",
              },
              row2: {
                listOfProjects: "proje listesi",
                addNewProject: "Add new project",
                listOfLabels: "Yeni proje ekle",
                historyOfPrinting: "baskı tarihi",
                settings: "Ayarlar",
              },
              row3: "oturumu Kapat",
            },
            end_col: {
              row1: {
                frequently_asked_questions: "ıkça Sorulan Sorular",
                fileUpload: "dosya yükleme",
              },
              row2: {
                searchPlaceHolder: "Proje adına göre ara",
              },
              addNewProject: {
                header: "Lütfen proje bilgilerinizi giriniz",
                inputLabelOne: "proje Adı",
                inputLabelTwo: "yaratıcı adı",
                directionButton: {
                  rightToLeft: "Sağdan sola sırala",
                  leftToRight: "Soldan sağa sırala",
                },
                continueButton: "devam etmek",
              },
              labelList: {
                selectedLabelsButton: "seçili Etiket",
                searchPlaceHolder: "Bir etiket veya ürün adı arayın",
              },
              historyOfPrinting: {
                calender: {
                  from: "tarihe göre sıralama",
                  to: "Bugüne kadar",
                },
                sortButton: "Sırala",
                downloadExcel: "exceli indir",
              },
            },
          },
        };
        break;
      default:
        return {
          selectedLanguage: {
            text: "It seems that your location is not the same as the language, would you like to change it?",
            startButtonText: "Change to English",
            endButtonText: "ادامه با زبان فارسی",
          },
          login: {
            header: {
              supportButton: "support",
            },
            textFeilds: {
              userName: "user name",
              password: "password",
            },
            enterButton: "enter",
            remember: "remember password",
          },
          userPannel: {
            start_col: {
              row1: {
                epirationOfCredit: "Expiration of credit",
              },
              row2: {
                listOfProjects: "List of projects",
                addNewProject: "Add new project",
                listOfLabels: "List of labels",
                historyOfPrinting: "History of printing",
                settings: "Settings",
              },
              addNewProject: {
                header: "Lütfen proje bilgilerinizi giriniz",
                inputLabelOne: "proje Adı",
                inputLabelTwo: "yaratıcının adı",
                directionButton: {
                  rightToLeft: "Sağdan sola sırala",
                  leftToRight: "Soldan sağa sırala",
                },
                continueButton: "devam etmek",
              },
              labelList: {
                selectedLabelsButton: "seçili Etiketler",
                searchPlaceHolder: "Bir etiket veya ürün adı arayın",
              },
            },
          },
        };
        break;
    }
  },
});
export const refresh = atom({
  key: "refresh",
  default: false,
});
