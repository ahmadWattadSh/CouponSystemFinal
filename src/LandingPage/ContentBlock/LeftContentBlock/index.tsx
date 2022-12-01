/**
 * This component is responsible for the about section in the landing page its design and logics
 * 
 */
import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
import {
  LeftContentSection,
  ContentWrapper,
  ServiceWrapper,
} from "./styles";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const LeftContentBlock = ({
  icon,
  title,
  content,
  section,
  id,
}: ContentBlockProps) => {

  // it redirects to login if clicked
  const history = useHistory();
  const loginHandler = () => {
    history.push('/login');
  }

  return (
    <LeftContentSection>
      <Fade direction="left">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="80%" height="80%" />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h6 style={{
                fontFamily: 'Motiva Sans Bold',
                color: "#06283D",
                fontSize: "40px",
                lineHeight: "1.18"
              }}>{(title)}</h6>
              <p
                style={{
                  fontFamily: 'Motiva Sans Bold',
                  color: "#06283D",
                  fontSize: "30px",
                  lineHeight: "1.18",
                }}>{(content)}</p>
              <ServiceWrapper>
                <Row justify="space-between">
                  <Row key={id} >
                    <SvgIcon src="—Pngtree—user login or authenticate icon_5089976.png" width="60px" height="60px" />
                    <Button sx={{ color: "#06283D" }} onClick={loginHandler}>{(section)}</Button>
                  </Row>
                </Row>
              </ServiceWrapper>
            </ContentWrapper>
          </Col>
        </Row>
      </Fade>
    </LeftContentSection>
  );
};

export default (LeftContentBlock);
