import React from "react";
import { Button } from "../../../components";
import {
  ActionContainer,
  Container,
  Instructions,
  InstructionsContainer,
  InstructionsTemplate,
  LoadMoreButtonView,
} from "../components";

export const Step1 = ({
  actionBlock,
  onContinue,
  onBack,
  loadMoreButton,
}: {
  actionBlock: any;
  onContinue: any;
  onBack: any;
  loadMoreButton: any;
}) => {
  return (
    <Container>
      <InstructionsContainer>
        <Instructions />
        <InstructionsTemplate backgroundImage={`url(/audit/compare/acta-2-grupo-1.png)`} />
      </InstructionsContainer>
      <ActionContainer>
        <Button variant="contained" size="large" color="secondary" fullWidth onClick={onContinue}>
          Continuar
        </Button>
        {actionBlock}
        <Button variant="contained" size="large" color="secondary" fullWidth onClick={onContinue}>
          Continuar
        </Button>
        <LoadMoreButtonView>{loadMoreButton}</LoadMoreButtonView>
      </ActionContainer>
    </Container>
  );
};
