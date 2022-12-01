/**
 * This component is responsible for the design of the header and its logics
 * 
 */
import { Row } from "antd";
import Container from "../common/Container";
import { SvgIcon } from "../common/SvgIcon";
import {
  HeaderSection,
  CustomNavLinkSmall,
  Span,
  LogoContainer,
} from "./styles";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";

const Header = () => {

  //redirects to login
  const history = useHistory();
  const clickHandler = () => {
    history.push('/login');
  }
  //it scrolls to the desired content according to the id (This is a component inside a component)
  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
    };
    return (
      <Fragment>
        <CustomNavLinkSmall onClick={() => scrollTo("about")}>
          <Span>{("About")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("instructions")}>
          <Span>{("Instructrions")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("resume1")}>
          <Span>{("Ahmad_Resume")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("resume2")}>
          <Span>{("Oday_Resume")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={clickHandler}>
          <Span>{("Log In")}</Span>
        </CustomNavLinkSmall>
      </Fragment>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <MenuItem />
        </Row>
      </Container>
    </HeaderSection>
  );
};

export default (Header);
