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
export const isAdminLogin = atom({
  key: "admin-authentication",
  default: {
    isLoggin: true,
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
                reprint: "reprint",
                print: "print",
              },
            },
          },
          AdminPannel: {
            start_col: {
              row1: {
                // epirationOfCredit: "Expiration of credit",
              },
              row2: {
                // listOfProjects: "List of projects",
                // addNewProject: "Add new project",
                // listOfLabels: "List of labels",
                // historyOfPrinting: "History of printing",
                // settings: "Settings",
                controlPannel: "Control pannel",
              },
              // row3: "Sign out",
            },
            end_col: {
              row1: {
                add_new_admin: "Add new admin",
              },
              row2: {
                searchPlaceHolder: "Search by project name",
              },
              controlPannel: {
                row1: {
                  activeUser: "Active user",
                  usersList: "Users list",
                  AddNewUser: "Add new user",
                  ProductAndLabel: "Product and label",
                  productsList: "Products list",
                  AddNewProduct: "Add product",
                },
                row2: {
                  latestUpdate: "Latest update",
                  update: "Update",
                  viewAll: "View all",
                },
                row3: {
                  product: "Product",
                  print: "Print",
                },
                history: {
                  searchBoxPlaceHolder:
                    "Search for the name of the company or the name of the person who created the project",
                  backToPannel: "Back to pannel",
                  allPrints: "All prints",
                  onlyProducts: "Only products",
                  onlyLabels: "Only labels",
                },
                AddNewUser: {
                  row1: {
                    Name_of_the_company_or_institution:
                      "Name of the company or institution",
                    ManagementName: "Management name",
                  },
                  row2: {
                    phoneNumber: "phone number",
                    userName: "user name",
                  },
                  row3: {
                    Email: "E-mail",
                    CompanyZipCode: "Company zip code",
                  },
                  row4: {
                    State: "State",
                    City: "City",
                    CompanyAddress: "Company address",
                  },
                  row5: {
                    AccessToProducts: "Access to products",
                  },
                  row6: {
                    AddUser: "Add user",
                  },
                  success: {
                    NewUserSuccessfullyCreated: "New user successfully created",
                  },
                },
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
                reprint: "reprint",
                print: "print",
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
                reprint: "چاپ مجدد",
                print: "چاپ",
              },
            },
          },
          AdminPannel: {
            start_col: {
              row1: {
                // epirationOfCredit: "Expiration of credit",
              },
              row2: {
                // listOfProjects: "List of projects",
                // addNewProject: "Add new project",
                // listOfLabels: "List of labels",
                // historyOfPrinting: "History of printing",
                // settings: "Settings",
                controlPannel: "پنل مدیریت",
              },
              // row3: "Sign out",
            },
            end_col: {
              row1: {
                add_new_admin: "افزودن ادمین جدید",
              },
              row2: {
                searchPlaceHolder: "Search by project name",
              },
              controlPannel: {
                row1: {
                  activeUser: "کاربر فعال",
                  usersList: "لیست کاربران",
                  AddNewUser: "افزودن کاربر جدید",
                  ProductAndLabel: "محصول و لیبل ",
                  productsList: "لیست محصولات",
                  AddNewProduct: "افزودن محصول جدید",
                },
                row2: {
                  latestUpdate: "آخرین به روز رسانی",
                  update: "به روز رسانی",
                  viewAll: "مشاهده همه",
                },
                row3: {
                  product: "محصول",
                  print: "چاپ",
                },
                history: {
                  searchBoxPlaceHolder:
                    "جست و جوی نام شرکت یا نام شخص سازنده پروژه",
                  backToPannel: "بازگشت به پنل",
                  allPrints: "همه چاپ ها",
                  onlyProducts: "فقط محصولات",
                  onlyLabels: "فقط لیبل ها",
                },
                AddNewUser: {
                  row1: {
                    Name_of_the_company_or_institution: "نام شرکت یا موسسه",
                    ManagementName: "نام مدیریت",
                  },
                  row2: {
                    phoneNumber: "شماره موبایل",
                    userName: "نام کاربری",
                  },
                  row3: {
                    Email: "آدرس ایمیل",
                    CompanyZipCode: "کدپستی شرکت",
                  },
                  row4: {
                    State: "استان",
                    City: "شهر",
                    CompanyAddress: "نشانی شرکت",
                  },
                  row5: {
                    AccessToProducts: "دسترسی به محصولات",
                  },
                  row6: {
                    AddUser: "افزودن کاربر",
                  },
                  success: {
                    NewUserSuccessfullyCreated: "کاربر جدید با موفقیت ساخته شد",
                  },
                },
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
                reprint: "reprint",
                print: "print",
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
                reprint: "yeniden basmak",
                print: "yeniden",
              },
            },
          },
          AdminPannel: {
            start_col: {
              row1: {
                // epirationOfCredit: "Expiration of credit",
              },
              row2: {
                // listOfProjects: "List of projects",
                // addNewProject: "Add new project",
                // listOfLabels: "List of labels",
                // historyOfPrinting: "History of printing",
                // settings: "Settings",
                controlPannel: "kontrol Paneli",
              },
              // row3: "Sign out",
            },
            end_col: {
              row1: {
                add_new_admin: "yeni yönetici ekle",
              },
              row2: {
                searchPlaceHolder: "Search by project name",
              },
              controlPannel: {
                row1: {
                  activeUser: "Aktif kullanıcı",
                  usersList: "kullanıcılar",
                  AddNewUser: "Kullanıcı Ekle",
                  ProductAndLabel: "Ürün ve etiket",
                  productsList: "Ürün listesi",
                  AddNewProduct: "yeni ürün ekle",
                },
                row2: {
                  latestUpdate: "Son güncelleme",
                  update: "Güncelleme",
                  viewAll: "Hepsini gör",
                },
                row3: {
                  product: "ürün",
                  print: "Yazdır",
                },
                history: {
                  searchBoxPlaceHolder:
                    "Şirketin adını veya projeyi oluşturan kişinin adını arayın",
                  backToPannel: "Panele geri dön",
                  allPrints: "tüm Baskılar",
                  onlyProducts: "sadece Ürünler",
                  onlyLabels: "sadece Etiketler",
                },
                AddNewUser: {
                  row1: {
                    Name_of_the_company_or_institution:
                      "Şirket veya kurumun adı",
                    ManagementName: "Yönetim adı",
                  },
                  row2: {
                    phoneNumber: "telefon numarası",
                    userName: "Kullanıcı adı",
                  },
                  row3: {
                    Email: "E-mail",
                    CompanyZipCode: "şirket posta kodu",
                  },
                  row4: {
                    State: "durum",
                    City: "Şehir",
                    CompanyAddress: "Şirket adresi",
                  },
                  row5: {
                    AccessToProducts: "Ürünlere erişim",
                  },
                  row6: {
                    AddUser: "Kullanıcı Ekle",
                  },
                  success: {
                    NewUserSuccessfullyCreated:
                      "Yeni kullanıcı başarıyla oluşturuldu",
                  },
                },
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
                reprint: "reprint",
                print: "print",
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
