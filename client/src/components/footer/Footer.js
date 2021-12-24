import { BiCopyright } from "react-icons/bi";
let style = {
  backgroundColor: "black",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "absolute",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  color: "white",
};

let phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
  margin: "10px",
};

function Footer() {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <BiCopyright />
        created by Sanad Sayed Ahmad
      </div>
    </div>
  );
}

export default Footer;
