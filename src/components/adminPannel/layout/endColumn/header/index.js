import { Login } from "@mui/icons-material";
import ActionsButton from "./ActionsButton";
import Logo from "./Logo";

export default function () {
  return (
    <header className="w-100 d-flex justify-content-between align-item-center">
      <ActionsButton />
      <Logo />
    </header>
  );
}
