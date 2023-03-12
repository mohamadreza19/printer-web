import { Grid } from "@mui/material";
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
} from "recharts";
import { useDynamicCssClass } from "../../../../../recoil/readStore";
import Icons from "../../../../../styles/__ready/Icons";
import Typography from "../../../../../styles/__ready/Typography";

export default function () {
  const key = "تعداد چاپ";
  const data = [
    {
      name: "شنبه ",
      [key]: 10,
    },
    {
      name: "یکشنبه",
      [key]: 2342,
    },
    {
      name: "دوشنبه",
      [key]: 4565,
    },
    {
      name: "سه شنبه",
      [key]: 6654,
    },
    {
      name: "چهارشنبه",
      [key]: 8765,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip font-vazir">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
          <div>
            {payload.map((pld) => (
              <div
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBCBCB",
                  borderRadius: "8px",
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
  const cssClass = useDynamicCssClass();
  return (
    <Grid container className="dir-ltr position-relative w-100">
      <Grid item lg={8}>
        <ResponsiveContainer className="w-100 mt-2" height={250}>
          <LineChart
            layout="horizontal"
            onMouseEnter={(e) => console.log(e)}
            width={730}
            height={250}
            data={data}
            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="name"
              axisLine={{
                style: {
                  stroke: "#ECECEC",
                },
              }}
              tickLine={false}
            />
            <YAxis
              type="number"
              axisLine={false}
              tick={{ fill: "#CBCBCB" }}
              tickLine={false}

              // mirror={true}
            />
            <Tooltip
              // contentStyle={{
              //   backgroundColor: "red",
              //   color: "black",
              // }}
              content={<CustomTooltip />}
              position={{ x: "10px", y: "10px" }}
            />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dot={{ stroke: "#F36523", strokeWidth: 4, r: 4 }}
              activeDot={{ stroke: "#F36523", strokeWidth: 4, r: 4 }}
              dataKey={key}
              stroke="#F36523"
              fill="#F36523"
              scale={"1rem"}
              strokeWidth={2.8}
              legendType=""
            />
            {/* <Line type="monotone" dataKey="Procuct B" stroke="#FF0000" /> */}
          </LineChart>
        </ResponsiveContainer>
        <section
          style={{
            width: "72%",
            bottom: "0.4rem",
          }}
          className={
            "position-absolute d-flex justify-content-between " + cssClass.pe_1
          }
        >
          <Icons.RightArrow_v1 size="large" Isactive={true} />
          <Icons.LeftArrow_v1 size="large" Isactive={false} />
        </section>
      </Grid>
      <Grid item lg={4}>
        <div
          className={
            "w-100 d-flex flex-column align-items-center justify-content-center mt-4 " +
            cssClass.pe_6
          }
        >
          <header className="d-flex flex-column align-items-center mb-3">
            <Typography.H3 className="color-primary font-400">
              ۳٦۳۰
            </Typography.H3>
            <Typography.H8>چاپ طی هفته گذشته</Typography.H8>
          </header>
          <main className=" d-flex flex-column align-items-center justify-content-center footer-statistics ">
            <section className="w-100 h-50 d-flex border-bottom d-flex justify-content-center align-item-center">
              <span>
                <Typography.H6 className=" font-400 ">شرکت مختلف</Typography.H6>
              </span>
              <span className={cssClass.me_1}>
                <Typography.H5 className="color-primary font-400 ">
                  ٦۳۰
                </Typography.H5>
              </span>
            </section>
            <section className="w-100 h-50 d-flex d-flex justify-content-center align-item-center">
              <span>
                <Typography.H6 className=" font-400 ">
                  محصول و لیبل
                </Typography.H6>
              </span>
              <span className={cssClass.me_1}>
                <Typography.H5 className="color-primary font-400 ">
                  ۳۰۰
                </Typography.H5>
              </span>
            </section>
          </main>
        </div>
      </Grid>
    </Grid>
  );
}
