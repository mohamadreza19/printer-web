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
  default: false,
});
export const adminRole = atom({
  key: "adminRole",
  default: "",
});
export const isUserLogin = atom({
  key: "user-authentication",
  default: false,
});
export const toastifyStore = atom({
  key: "toast-message",
  default: {
    isShow: false,
    message: "",
    project: {
      isShow: false,
      Delete_Product_Fn: () => {},
    },
  },
});
export const delete_alert = atom({
  key: "delete_alert",
  default: {
    isShow: false,
    message: "",
    deleteFn: () => {},
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
                inputLabelThree: "Width of Rail",
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
            editor: {
              startColumn: {},
              endColumn: {
                rootHeader: {
                  addNewProject: "Add new project",
                  editor: "editor",
                  Output: "Output",
                  print: "print",
                  saveAndContinue: "Save and continue",
                },
                editorHeader: {
                  rowSeparator: "row separator",
                  mergeRow: "Merge row",
                  columnSeparator: "col separator",
                  mergeColumn: "Merge col",
                  //
                  delete: "Delete",
                  barcode: "barcode",
                  copy: "copy",
                  QRCode: "QR code",
                },
              },
            },
          },
          AdminPannel: {
            start_col: {
              row1: {
                // epirationOfCredit: "Expiration of credit",
              },
              row2: {
                listOfLabelsAndProduct: "list of lbl/Product",
                controlPannel: "Control pannel",
                addNewProductAndLabel: "Add new prduct/lbl",
                ViewPrintStatistics: "View print statistics",
                ListOfUserAndAdmin: "users and admin",
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
                    EditUser: "edit user",
                  },
                  success: {
                    NewUserSuccessfullyCreated: "New user successfully created",
                  },
                },
              },
              addNew_Project_Or_Label: {
                header: {
                  addNewProductAndLabel: "Add new pruduct / label",
                  uploadSsExcelFile: "Upload as an Excel file",
                },
                rowOne: {
                  addNewProduct: "Add new product",
                  addNewLabel: "Add a new label",
                },
                rowTwo: {
                  productName: "Product Name",
                  persian: "Persion",
                  english: "English",
                  turkish: "Turkish",
                },
                rowThree: {
                  ProductLinkOnTheSite: "Product link on the site",
                },
                rowFour: {
                  AdditionalInformationAboutTheProduct:
                    "Additional information about the product",
                  persian: "Persion",
                  english: "English",
                  turkish: "Turkish",
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

              label_Product_List: {
                selectedLabelsButton: "selected Labels",
                searchPlaceHolder: "Search for a label or product name",
                item: {
                  colOne: {
                    product: {
                      width: "Product width",
                      labelwidth: "Label width",
                    },
                    label: {
                      labelWidth: "Label width",
                      labelLength: "Label length",
                    },
                  },
                  colTwo: {
                    Product_link_on_the_site: "Product link on the site",
                    latestUpdate: "latest update",
                  },
                },
              },
              view_Print_Statistics: {
                header: {
                  general_print_statistics: "General print statistics",
                  Desired_time_scale: "scale time",
                },
                mainHeader: {
                  print: "print",
                  different_Companies: "Different companies",
                  product_and_label: "Product and label",
                },
                Company_statistics: "Company statistics",
                Statistics_of_products_and_labels:
                  "Statistics of products and labels",
                item: {
                  Created_by: "Created by",
                  Last_print: "Last print",
                  Last_activity: "Last activity",
                  print: "print",
                },
              },
              listOfUserAndAdmin: {
                header: {
                  header: "List of users and admin",
                  goToAdminList: "Go to the list of admins",
                  goToUserList: "Go to the list of users",
                  searchBoxPlaceHolder: "Company search",
                },
                component: {
                  createdBy: "createdBy",
                  creditExpiration: "Credit Expiration",
                  print: "print",
                },
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
                inputLabelThree: "عرض ریل",
                directionButton: {
                  rightToLeft: "چینش از راست به چپ",
                  leftToRight: "چینش از چپ به راست",
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
            editor: {
              startColumn: {},
              endColumn: {
                rootHeader: {
                  addNewProject: "افزودن پروژه جدید",
                  editor: "editor",
                  Output: "خروجی گرفتن",
                  print: "چاپ",
                  saveAndContinue: "ذخیره سازی و ادامه",
                },
                editorHeader: {
                  rowSeparator: "جدا سازی سطر",
                  mergeRow: "ادغام سطر",
                  columnSeparator: "جدا سازی ستون",
                  mergeColumn: "ادغام ستون",
                  //
                  delete: "حذف",
                  barcode: "بارکد",
                  copy: "کپی",
                  QRCode: "qr کد",
                },
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
                addNewProductAndLabel: "افزودن محصول / لیبل جدید",
                listOfLabelsAndProduct: "لیست لیبل و محصولات",
                ViewPrintStatistics: "مشاهده امار چاپ",
                ListOfUserAndAdmin: "لیست کاربران و مدیران",
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
                    EditUser: "ویرایش کاربر",
                  },
                  success: {
                    NewUserSuccessfullyCreated: "کاربر جدید با موفقیت ساخته شد",
                  },
                },
              },
              addNew_Project_Or_Label: {
                header: {
                  addNewProductAndLabel: "افزودن محصول / لیبل جدید",
                  uploadSsExcelFile: "آپلود به شکل فایل اکسل",
                },
                rowOne: {
                  addNewProduct: "افزودن محصول جدید",
                  addNewLabel: "افزودن لیبل جدید",
                },
                rowTwo: {
                  productName: "نام محصول ",
                  persian: "فارسی",
                  english: "انگلیسی",
                  turkish: "ترکی",
                },
                rowThree: {
                  ProductLinkOnTheSite: "لینک محصول در سایت",
                },
                rowFour: {
                  AdditionalInformationAboutTheProduct:
                    "توضیحات تکمیلی درباره محصول",
                  persian: "فارسی",
                  english: "انگلیسی",
                  turkish: "ترکی",
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
              label_Product_List: {
                selectedLabelsButton: "selected Labels",
                searchPlaceHolder: "جست و جوی محصول یا لیبل ",
                item: {
                  colOne: {
                    product: {
                      width: "عرض محصول",
                      labelwidth: "عرض برچسب",
                    },
                    label: {
                      labelWidth: "طول لیبل",
                      labelLength: "عرض لیبل",
                    },
                  },
                  colTwo: {
                    Product_link_on_the_site: "لینک محصول در سایت",
                    latestUpdate: "آخرین به روز رسانی",
                  },
                },
              },
              view_Print_Statistics: {
                header: {
                  general_print_statistics: "آمار چاپ کلی",
                  Desired_time_scale: "بازه زمانی دلخواه",
                },
                mainHeader: {
                  print: "چاپ",
                  different_Companies: "شرکت مختلف",
                  product_and_label: "محصول و لیبل",
                },
                Company_statistics: "آمار شرکت ها",
                Statistics_of_products_and_labels: "آمار محصولات و لیبل ها",
                item: {
                  Created_by: "ایجاد توسط",
                  Last_print: "آخرین چاپ",
                  Last_activity: "آخرین فعالیت",
                  print: "چاپ",
                },
              },
              listOfUserAndAdmin: {
                header: {
                  header: "لیست کاربران و مدیران",
                  goToAdminList: "برو به لیست ادمین ها",
                  goToUserList: "برو به لیست کاربر ها",
                  searchBoxPlaceHolder: "جست و جوی شرکت",
                },
                component: {
                  createdBy: "ایجاد توسط",
                  creditExpiration: "انقضا اعتبار",
                  print: " چاپ",
                },
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
                listOfLabels: "etiket listesi",
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
                inputLabelThree: "Ray Genişliği",
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
            editor: {
              startColumn: {},
              endColumn: {
                rootHeader: {
                  addNewProject: "Yeni proje ekle",
                  editor: "editör",
                  Output: "Çıktı",
                  print: "Yazdır",
                  saveAndContinue: "Kaydet ve devam Et",
                },
                editorHeader: {
                  rowSeparator: "satır ayırıcı",
                  mergeRow: "Satırı birleştir",
                  columnSeparator: "sütun ayırıcı",
                  mergeColumn: "Birleştirme stu",
                  //
                  delete: "Silmek",
                  barcode: "barkod",
                  copy: "kopyalamak",
                  QRCode: "QR kod",
                },
              },
            },
          },
          AdminPannel: {
            start_col: {
              row1: {
                // epirationOfCredit: "Expiration of credit",
              },
              row2: {
                addNewProductAndLabel: "Yeni ürün / etiket ekle",
                controlPannel: "kontrol Paneli",
                listOfLabelsAndProduct: "Etiketler ve ürünler",
                ViewPrintStatistics: "İstatistikleri yazdır",
                ListOfUserAndAdmin: "kullanıcılar ve idareci",
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
                    EditUser: "Kullanıcıyı düzenle",
                  },
                  success: {
                    NewUserSuccessfullyCreated:
                      "Yeni kullanıcı başarıyla oluşturuldu",
                  },
                },
              },
              addNew_Project_Or_Label: {
                header: {
                  addNewProductAndLabel: "Yeni ürün / etiket ekle",
                  uploadSsExcelFile: "Excel dosyası olarak yükleyin",
                },
                rowOne: {
                  addNewProduct: "yeni ürün ekle",
                  addNewLabel: "yeni bir etiket ekle",
                },
                rowTwo: {
                  productName: "Ürün adı",
                  persian: "Farsça",
                  english: "İngilizce",
                  turkish: "Türkçe",
                },
                rowThree: {
                  ProductLinkOnTheSite: "Sitedeki ürün bağlantısı",
                },
                rowFour: {
                  AdditionalInformationAboutTheProduct:
                    "Ürün hakkında ek bilgi",
                  persian: "Farsça",
                  english: "İngilizce",
                  turkish: "Türkçe",
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
              label_Product_List: {
                selectedLabelsButton: "selected Labels",
                searchPlaceHolder: "Ürün veya etiket arayın",
                item: {
                  colOne: {
                    product: {
                      width: "ürün genişliği",
                      labelwidth: "etiket genişliği",
                    },
                    label: {
                      labelWidth: "etiket uzunluğu",
                      labelLength: "etiket genişliği",
                    },
                  },
                  colTwo: {
                    Product_link_on_the_site: "Sitedeki ürün bağlantısı",
                    latestUpdate: "son Güncelleme",
                  },
                },
              },
              listOfUserAndAdmin: {
                header: {
                  header: "Kullanıcıların ve yöneticinin listesi",
                  goToAdminList: "Yönetici listesine gits",
                  goToUserList: "Kullanıcı listesine git",
                  searchBoxPlaceHolder: "şirket arama",
                },
                component: {
                  createdBy: "tarafından yaratıldı",
                  creditExpiration: "Kredi Bitişi",
                  print: "Yazdır",
                },
              },
              view_Print_Statistics: {
                header: {
                  general_print_statistics: "Genel baskı istatistikleri",
                  Desired_time_scale: "İstenilen zaman ölçeği",
                },
                mainHeader: {
                  print: "Yazdır",
                  different_Companies: "Farklı şirketler",
                  product_and_label: "Ürün ve etiket",
                },
                Company_statistics: "şirket istatistikleri",
                Statistics_of_products_and_labels:
                  "Ürün ve etiket istatistikleri",
                item: {
                  Created_by: "Tarafından yaratıldı",
                  Last_print: "Son baskı",
                  Last_activity: "Son Aktivite",
                  print: "Yazdır",
                },
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
