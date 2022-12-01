import { Row, Col } from "antd";
import { SvgIcon } from "../common/SvgIcon";
import { Fade, Slide } from "react-awesome-reveal";
import {
  UpBlockContainer,
} from "./styles";
import { Button, Typography } from "@mui/material";

const item1 = {
  fontFamily: 'Motiva Sans Bold',
  color: "#06283D",
  fontSize: "30px",
  fontWeight: "bold",
  marginBottom: "0.5em"
}
const item2 = {
  fontFamily: 'Motiva Sans Bold',
  color: "#06283D",
  fontSize: "20px",
  lineHeight: "1.18",
  marginBottom: "0.5em"
}
const item3 = {
  fontFamily: 'Motiva Sans Bold',
  color: "#06283D",
  fontSize: "20px",
}

type Props = {

  id: string;
}

const InstructioinsBlock: React.FC<Props> = (props) => {

 
  return (
    <UpBlockContainer>
      <Row justify="space-between" align="middle" id={props.id} >
        <Col lg={11} md={11} sm={12} xs={24} >
          <Fade direction="left" duration={1000}>
            <div style={{
              marginLeft: "15em"
            }}>
              <Typography sx={{
                ...item1, fontSize: "40px",
                ml: "4.5em"
              }}>Instructions</Typography>
              <SvgIcon src={"—Pngtree—boss instructing employee at workplace_7260210.png"} width="110%" height="500vh" />

            </div>
          </Fade>
        </Col>

        <Col lg={11} md={11} sm={11} xs={30}>
          <Fade direction="right" duration={1000}>
            <div style={{
              marginRight: "10em"
            }}>
              <div style={item1}
              >{("Landing page -'/' or '/welcome' ")}</div>
              <p style={{
                ...item2, marginBottom: "1em"
              }}>{("See what is the project about or go log-in")}</p>
              <div style={
                item1
              }
              >{("Login - '/login")}</div>
              <Typography sx={{
                ...item3,
                mb: "5px"
              }}> You can log in as an admin -</Typography>
              <Typography sx={{
                ...item3
              }}> Email:admin@admin.com</Typography>
              <Typography sx={{
                ...item3
              }}> Passwrod:admin123</Typography>

              <p style={{
                ...item2, lineHeight: "1em"
              }}>{("You can login as a customer or company - you need the sql table to move on next pages")}</p>
              <div style={
                item1
              }
              >{("NotFound - '/PageNotFound ")}</div>
              <p style={{
                ...item2
              }}>{("error page - it also has hompage button")}</p>
            </div>
          </Fade>
        </Col>
      </Row>
    </UpBlockContainer>
  );
};

export default InstructioinsBlock;
