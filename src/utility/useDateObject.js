import persian from "react-date-object/calendars/persian";
import english from "react-date-object/calendars/gregorian";
import DateObJect from "react-date-object";
import useCachedLanguage from "./useCachedLanguage";
import persian_fa from "react-date-object/locales/persian_fa";
import english_en from "react-date-object/locales/gregorian_en";
import { useImmer } from "use-immer";
import { useEffect } from "react";

export default function () {
  const { value: currentLanguage } = useCachedLanguage();
  const [date, setDate] = useImmer({
    ui: {
      from: "",
      to: "",
    },
    server: {
      from: "",
      to: "",
    },
  });

  useEffect(() => {
    if (currentLanguage == "fa") {
      const firtInit = new DateObJect({
        calendar: persian,
        locale: persian_fa,
      });
      const formated_For_Ui = firtInit.format("YYYY/MM/DD");
      const formated_For_server = firtInit
        .convert(english, english_en)
        .format("YYYY-MM-DD");

      setDate((draft) => {
        draft.ui = {
          from: formated_For_Ui,
          to: formated_For_Ui,
        };
        draft.server = {
          from: formated_For_server,
          to: formated_For_server,
        };
      });
    } else {
      const firtInit = new DateObJect();

      const formated = firtInit.format("YYYY/MM/DD");
      const formated_For_server = firtInit.format("YYYY-MM-DD");
      setDate((draft) => {
        draft.ui = {
          from: formated,
          to: formated,
        };
        draft.server = {
          from: formated_For_server,
          to: formated_For_server,
        };
      });
    }
  }, []);

  function handlechangeFromDate(e) {
    if (currentLanguage == "fa") {
      const formated_For_Ui = e.format("YYYY/MM/DD");
      const formated_For_server = e
        .convert(english, english_en)
        .format("YYYY-MM-DD");
      //
      setDate((draft) => {
        draft.ui.from = formated_For_Ui;
        draft.server.from = formated_For_server;
      });
    } else {
      const formated_For_Ui = e.format("YYYY/MM/DD");
      const formated_For_server = e.format("YYYY-MM-DD");
      setDate((draft) => {
        draft.ui.from = formated_For_Ui;
        draft.server.from = formated_For_server;
      });
    }
  }
  function handlechangeToDate(e) {
    if (currentLanguage == "fa") {
      const formated_For_Ui = e.format("YYYY/MM/DD");
      const formated_For_server = e
        .convert(english, english_en)
        .format("YYYY-MM-DD");
      //
      console.log(formated_For_Ui);
      setDate((draft) => {
        draft.ui.to = formated_For_Ui;
        draft.server.to = formated_For_server;
      });
    } else {
      const formated_For_Ui = e.format("YYYY/MM/DD");
      const formated_For_server = e.format("YYYY-MM-DD");
      setDate((draft) => {
        draft.ui.to = formated_For_Ui;
        draft.server.to = formated_For_server;
      });
    }
  }

  const NewDate = new DateObJect();
  const NewPersionDate = new DateObJect({
    calendar: persian,
    locale: persian_fa,
  });
  // console.log(NewDate.format("YYYY-MM-DD"));
  const persion = NewDate.convert(persian, persian_fa).format("YYYY/MM/DD");
  // console.log({
  //   convertToEn: NewPersionDate.convert(english, english_en).format(),
  // });
  let currnetTime;
  if (currentLanguage == "fa") {
    currnetTime = NewDate.format("YYYY/MM/DD");
  } else {
    currnetTime = NewDate.format("YYYY/MM/DD");
  }
  return {
    ui: date.ui,
    server: date.server,
    handlechangeFromDate,
    handlechangeToDate,
  };
}
