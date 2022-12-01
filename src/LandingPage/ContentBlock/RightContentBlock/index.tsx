/**
 * This component is responsible for the  AhmadResume or resume1 section in the landing page its design and logics
 * 
 */
import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
import {
  RightBlockContainer
} from "./styles";
import { Button } from "@mui/material";


const RightBlock = ({
  title,
  content,
  button,
  icon,
  id,
}: ContentBlockProps) => {

 

  return (
    <RightBlockContainer>
      <Fade direction="right" duration={1000}>
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <div style={{
              marginLeft: "20em"
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
              <Button variant="contained" sx={{ width: "auto", marginLeft: "8em", backgroundColor: "#262626", marginTop: "2em" }}             
              >
                {button}
              </Button>
            </div>
          </Col>
          <Col lg={10} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="60%" height="60%%" />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default (RightBlock);
