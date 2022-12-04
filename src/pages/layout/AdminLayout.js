import { styled } from "@mui/material/styles";
import { Nav } from "../../components/admin";
import Login from "../admin/Login";
import Header from "../../components/admin/Header";

export default function AdminLayout({ children }) {
  const isLoggedin = localStorage.getItem("accessToken");
  if (!isLoggedin) {
    return <Login />;
  }
  const StyledRoot = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
  });

  const Main = styled("div")(() => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    padding: "120px 16px 80px 16px",
  }));
  return (
    <StyledRoot>
      <Header />
      <Nav />
      <Main>{children}</Main>
    </StyledRoot>
  );
}
