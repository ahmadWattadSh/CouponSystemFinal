import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
import {
  UpBlockContainer,
} from "./styles";
import { Button } from "@mui/material";


const UpBlock = ({
  title,
  content,
  button,
  icon,
  id,
}: ContentBlockProps) => {



  return (
    <UpBlockContainer>
      <Fade direction="down" duration={1000}>
        <Row justify="space-between" align="middle" id={id} >
          <Col lg={10} md={11} sm={12} xs={24} >
            <div style={{
              marginLeft: "12em"
            }}>
              <SvgIcon src={icon} width="70%" height="500vh" />
            </div>
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <div style={{
              marginRight: "18em"
            }}>
              <div style={{
                fontFamily: 'Motiva Sans Bold',
                color: "#262626",
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "1em"
              }}
              >{(title)}</div>
              <p style={{
                fontFamily: 'Motiva Sans Bold',
                color: "#262626",
                fontSize: "25px",
                lineHeight: "1.18",
                marginBottom: "1em"
              }}>{(content)}</p>
              <Button variant="contained" sx={{ width: "auto", marginRight: "8em", backgroundColor: "#262626", marginTop: "2em" }}
              >
                {button}
              </Button>
            </div>
          </Col>
        </Row>
      </Fade>
    </UpBlockContainer>
  );
};

export default (UpBlock);
