import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { Heading1 } from "./Typography/Title";
import { SubH1 } from "./Typography/Subtitle";
import { FinePrint } from "./Typography/BodyText";
import { breakpoints } from "../utils/helpers";
import imageData from "../data/image-slider.json";

const scrolling = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const HeaderSection = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  ${breakpoints("grid-auto-flow", "", [{ 0: "row" }, { 1024: "column" }])};
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${({ theme, $colorTheme }) => `
    background-color: ${theme.colors[$colorTheme].background};
    color: ${theme.colors[$colorTheme].color};
    ${breakpoints("padding", "", [
      {
        0: `${theme.spacing.xxxxlarge} ${theme.spacing.small} ${theme.spacing.medium}`,
      },
      {
        1024: `${theme.spacing.xxxxlarge} ${theme.spacing.xxlarge} ${theme.spacing.xxlarge}`,
      },
    ])};
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xsmall};
`;

const StyledSubH1 = styled(SubH1)`
  margin-top: ${({ theme }) => theme.spacing.xsmall};
`;

const ImageSlider = styled.div`
  display: flex;
  max-width: 100%;
  overflow: hidden;
`;

const ImageSliderInner = styled.div`
  display: flex;
  flex: 0 0 100%;
  will-change: transform;
  animation: ${scrolling} linear infinite;
  ${breakpoints("animation-duration", "", [{ 0: "10s" }, { 1024: "20s" }])};

  img {
    ${breakpoints("min-width", "", [{ 0: "100vw" }, { 1024: "50vw" }])};
    height: auto;
  }
`;

const RenderImageSliderInner = ({ ariaHidden = false }) => (
  <ImageSliderInner aria-hidden={ariaHidden}>
    {imageData.images.map((image, index) => (
      <img
        key={index}
        width="390"
        height="390"
        src={image.url}
        alt=""
      />
    ))}
  </ImageSliderInner>
);

RenderImageSliderInner.propTypes = {
  ariaHidden: PropTypes.bool,
};

export const Header = ({ colorTheme }) => (
  <HeaderSection>
    <HeaderText $colorTheme={colorTheme}>
      <ContentWrapper>
        <Heading1>
          Start spreading smiles
          <StyledSubH1>with small, simple acts</StyledSubH1>
        </Heading1>
        <FinePrint>Natural Magic*</FinePrint>
      </ContentWrapper>
    </HeaderText>
    <ImageSlider>
      <RenderImageSliderInner />
      <RenderImageSliderInner ariaHidden />
    </ImageSlider>
  </HeaderSection>
);

Header.propTypes = {
  colorTheme: PropTypes.oneOf(["red", "yellow", "white"]).isRequired,
};
