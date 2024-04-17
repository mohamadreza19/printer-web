import { Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';
import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from '../../../../../recoil/readStore';
import Icons from '../../../../../styles/__ready/Icons';
import Typography from '../../../../../styles/__ready/Typography';
import { AdminPrintsStatistics } from '../../../../../reactQuery/admin/callGetService';
import useFormatDate2 from '../../../../../utility/useFormatDate2';
import { useEffect } from 'react';
import { useState } from 'react';
import PrintStatistics from './PrintStatistics';
import useSortDataAcording_To_Scale_Chart from '../../../../../utility/useSortDataAcording_To_Scale_Chart';

export default function ({
  data = [],
  interval,
  printsStatistics_response,
  selectedDate,
  scale,
  setScale,
  ignoreInterval,
}) {
  // example = { count_Y: 0, date_X: "2023-05-26T00:00:00.000Z" };
  const cssClass = useDynamicCssClass();
  // const [chart_data, setChart_data] = useState([]);
  const language = useLanguage();
  const data_acording_to_scale = useSortDataAcording_To_Scale_Chart(
    interval,
    scale,
    setScale,
    data,
    ignoreInterval,
    language
  );

  const key = 'تعداد چاپ';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip font-vazir">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
          <div>
            {payload.map((pld, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBCBCB',
                  borderRadius: '8px',
                }}
              >
                <div style={{ color: pld.fill }}>{pld.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };
  function inCrementScale() {
    if (!ignoreInterval)
      setScale((draft) => {
        const newState = draft + 1;
        return newState;
      });
  }
  function deCrementScale() {
    if (scale > 1)
      setScale((draft) => {
        const newState = draft - 1;
        return newState;
      });
  }
  console.log({ data_acording_to_scale });
  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          dy={16}
          textAnchor="middle"
          fill="#666"
          style={{
            rotate: '45 deg',
          }}
        >
          {payload.value}
        </text>
      </g>
    );
  };
  if (printsStatistics_response.isSuccess)
    return (
      <Grid container className="dir-ltr position-relative w-100 ">
        <Grid item lg={8}>
          <ResponsiveContainer className="w-100 mt-2 " height={250}>
            <LineChart
              layout="horizontal"
              width={730}
              height={250}
              data={data_acording_to_scale}
              margin={{
                top: 0,
                right: 16.3,
                left: 0,
                bottom: 15,
              }}
            >
              <XAxis
                tickMargin={15}
                // tick={<CustomizedAxisTick />}
                angle={-45}
                dataKey="name"
                axisLine={{
                  style: {
                    stroke: '#ECECEC',
                  },
                }}
                tickLine={false}
                // tick={{ fontSize: 10.8 }}
                // tick={{ fontSize: 10 }}
                // tick={{ fontSize: 15 }}
                // interval={0}
                allowDecimals={false}
              />

              <YAxis
                type="number"
                axisLine={false}
                tick={{ fill: '#CBCBCB' }}
                tickLine={false}
                // markerHeight={10}
                tickMargin={10}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                position={{ x: '10px', y: '10px' }}
              />

              <Line
                type="monotone"
                dot={{ stroke: '#F36523', strokeWidth: 4, r: 4 }}
                activeDot={{ stroke: '#F36523', strokeWidth: 4, r: 4 }}
                dataKey={key}
                stroke="#F36523"
                fill="#F36523"
                scale={'1rem'}
                strokeWidth={2.8}
                legendType=""
              />
            </LineChart>
          </ResponsiveContainer>
          <section
            style={{
              width: '70.5%',
              bottom: '0.4rem',
            }}
            className={
              'position-absolute d-flex justify-content-between ' +
              cssClass.pe_1
            }
          >
            <span onClick={inCrementScale} className="cur-pointer">
              <Icons.LeftArrow_v1 size="large" Isactive={!ignoreInterval} />
            </span>
            <span onClick={deCrementScale} className="cur-pointer">
              <Icons.RightArrow_v1
                size="large"
                Isactive={scale > 1 && !ignoreInterval ? true : false}
              />
            </span>
          </section>
        </Grid>
        <Grid item lg={4}>
          <PrintStatistics
            interval={interval}
            selectedDate={selectedDate}
            printsStatistics_response={printsStatistics_response}
          />
        </Grid>
      </Grid>
    );
}
