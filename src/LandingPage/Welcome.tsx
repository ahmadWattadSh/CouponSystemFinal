/**
 * This component loads the header of the landing page and lazy loads the contentblocks.
 * It means that the comonent will load if it is reached with scrolling.
 * The sections are:
 * 1.Header
 * 2.About
 * 3.Instructions
 * 4.AhmadResume
 * 5.OdayResume
 * 
 */
import { lazy } from "react";
import { Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Suspense } from "react";
import InstructioinsBlock from "./InstructionsBlock";

const ContentBlock = lazy(() => import("./ContentBlock"));

const Welcome = () => {

  return (
    <Suspense fallback={null}>
      <Paper sx={{ backgroundColor: '#bbd4d5', margin: 'auto', height: '100%' }}>
        <Header />
        <ContentBlock
          type="left"
          title={"Copoun System"}
          content={"This is a Platform for enabling companies to produce coupons as part of their advertising and marketing campaigns."}
          section={"Log In"}
          icon="—Pngtree—flat cartoon character customer 50_7257869.png"
          id="about"
        />
        <InstructioinsBlock
          id="instructions"
        />
        <ContentBlock
          type="right"
          title={"Ahmad Wattad"}
          content={"An English teacher with 3+ years of experience in schools. Highly organized, self-motivated, and proficient with computers. Finished A full-stack java course in John Bryce and finished my B.A. in English literature and Education. I also created a coupon system project with a colleague"}
          button={"Download cv"}
          icon="My project.png"
          id="resume1"
        />
        <ContentBlock
          type="up"
          title={"Oday Wattad"}
          content={"Assistant manager of Nadir with 2+experience in the field of logistics. Highly organized, self-motivated, and proficient with computers. Finished A full-stack java course in John Bryce and created a coupon  system project with a colleague. I also volunteered in developing an assisting app for sorting the stocks in the factory."}
          button={"Download cv"}
          icon="oday.png"
          id="resume2"
        />
        <Footer />
      </Paper>
    </Suspense>
  );
}

export default Welcome;