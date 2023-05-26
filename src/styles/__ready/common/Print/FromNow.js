import Typography from "../../Typography";

export default function ({ fromNowDate = "", language = "" }) {
  return <Typography.H10 language={language}>{fromNowDate}</Typography.H10>;
}
