/**
 * This component is responsible for the design of the footer in the landing page
 * 
 */
import { Row, Col } from "antd";
import { SvgIcon } from "../common/SvgIcon";
import Container from "../common/Container";
import {
  FooterSection,
  Title,
  Extra,
  Para,
  Large,
  Chat,
  FooterContainer,
  Language,
} from "./styles";
import { Grid } from "@mui/material";
import { Fragment } from "react";

interface SocialLinkProps {
  href: string;
  src: string;
  label?: string;
}

const Footer = () => {

    //responisble for the design of the social links and their apperance as icons 
  const SocialLink = ({ href, src, label }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <label style={{
          textTransform: "capitalize",
          marginRight: "1em",
          color: "#18216d",
          fontFamily: "Motiva Sans Bold",
          fontSize: "16px",
        }}>{label}</label>
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      {/*footer 1 */}
      <FooterSection>
        <Container>
          <Grid container>
            <Grid item alignItems={"space-between"} >
              <Col>
                <Language>{("Contact")}</Language>
                <Large>{("Tell us everything")}</Large>
                <Para>
                  {(`Do you have any question? Feel free to reach out.`)}
                </Para>
                <a href="https://www.google.com/gmail/about/">
                  <Chat>{(`Let's Chat`)}</Chat>
                </a>
              </Col>
            </Grid>
            <Grid item alignItems={"space-between"} sx={{ mx: 16 }}>
              <Col >
                <Language>{("Address")}</Language>
                <Large>
                  {("Israel")}
                </Large>
                <Large>
                  {("Jatt")}
                </Large>
              </Col>
            </Grid>
            <Grid item alignItems={"space-between"} sx={{ mx: 16 }}>
              <Col >
                <Title>{("Company")}</Title>
                <Large left="true" >
                  {("About")}
                </Large>
                <Large left="true" >
                  {("Blog")}
                </Large>
                <Large left="true" >
                  {("Press")}
                </Large>
                <Large left="true">
                  {("Careers & Culture")}
                </Large>
              </Col>
            </Grid>
          </Grid>
        </Container>
      </FooterSection>
            {/*footer 2 */}
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <FooterContainer>
              <SocialLink
                href="https://github.com/Adrinlol/create-react-app-adrinlol"
                src="github.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/in/ahmad-wattad-7a3a6a252/"
                src="linkedin.svg"
                label="Ahmad Wattad"
              />
              <SocialLink
                href="https://www.linkedin.com/in/ahmad-wattad-7a3a6a252/"
                src="linkedin.svg"
                label="Oday Wattad"
              />
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </Fragment>
  );
};

export default (Footer);
