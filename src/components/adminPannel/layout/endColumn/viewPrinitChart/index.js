import { useEffect, useState } from 'react';
import {
  AdminPrintsStatistics,
  Admin_Print_Info_Chart,
} from '../../../../../reactQuery/admin/callGetService';
import Icons from '../../../../../styles/__ready/Icons';
import Typography from '../../../../../styles/__ready/Typography';
import Chart from './Chart';
import CompanyStatistics from './Company_And_PL_Statistics';
import DynamicCopmanyAndLabel from './dynamicCopmanyAndLabel';
import Header from './Header';
import { useRecoilState } from 'recoil';
import dateRangeSelectorStore from '../../../../../recoil/store/datepicker/dateRangeSelectorStore';
import Company_And_PL_Statistics from './Company_And_PL_Statistics';
import { useLanguage } from '../../../../../recoil/readStore';

const options = [
  { label: 'سالیانه', value: 'Year' },
  { label: 'ماهیانه', value: 'Month' },
  { label: 'هفتگی', value: 'Week' },
];
const Divider = () => {
  return (
    <div
      style={{
        backgroundColor: '#F5F5F5',

        height: '20px',
      }}
    ></div>
  );
};
export default function () {
  const language = useLanguage();
  function options_based_language() {
    if (language === 'fa') {
      return [
        { label: 'سالیانه', value: 'Year' },
        { label: 'ماهیانه', value: 'Month' },
        { label: 'هفتگی', value: 'Week' },
      ];
    }
    if (language === 'en') {
      return [
        { label: 'yearly', value: 'Year' },
        { label: 'monthly', value: 'Month' },
        { label: 'weekly', value: 'Week' },
      ];
    }
    if (language === 'tr') {
      return [
        { label: 'yıllık', value: 'Year' },
        { label: 'aylık', value: 'Month' },
        { label: 'haftalık', value: 'Week' },
      ];
    }
  }
  const [interval, setInterval] = useState(
    options_based_language()[options_based_language().length - 1].value
  );
  const [scale, setScale] = useState(1);
  const [ignoreInterval, setIgnoreInterval] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(
    dateRangeSelectorStore
  );
  const [key_for_apiCall_acordingToDate, setKey_for_apiCall_acordingToDate] =
    useState(false);

  useEffect(() => {
    setScale(1);
  }, [interval]);
  const admin_print_info_chart_response = Admin_Print_Info_Chart(
    interval,
    scale,
    key_for_apiCall_acordingToDate,
    selectedDate[0],
    selectedDate[1]
  );
  const printsStatistics_response = AdminPrintsStatistics(
    selectedDate[0],
    selectedDate[1],
    key_for_apiCall_acordingToDate
  );
  function handle_IngoneInterval_based_selectedDate_length() {
    if (selectedDate.length === 2) {
      setIgnoreInterval(true);
    }
    if (selectedDate.length === 0) {
      setIgnoreInterval(false);
    }
  }
  useEffect(() => {
    if (selectedDate[0] && selectedDate[1]) {
      setKey_for_apiCall_acordingToDate((draft) => !draft);
    }
    if (!selectedDate[0] && !selectedDate[1]) {
      setKey_for_apiCall_acordingToDate((draft) => !draft);
    }
    handle_IngoneInterval_based_selectedDate_length();
  }, [selectedDate.length]);
  if (admin_print_info_chart_response.isSuccess)
    return (
      <>
        <div className="w-100 px-3">
          <Header
            setInterval={setInterval}
            setSelectedDate={setSelectedDate}
            options={options_based_language()}
            currentValue={interval}
            disabled={selectedDate.length > 0}
          />
          <Chart
            data={admin_print_info_chart_response.data}
            interval={interval}
            selectedDate={selectedDate}
            printsStatistics_response={printsStatistics_response}
            ignoreInterval={ignoreInterval}
            scale={scale}
            setScale={setScale}
          />
        </div>
        <Divider />
        <Company_And_PL_Statistics />
        {/* <DynamicCopmanyAndLabel /> */}
      </>
    );
}
