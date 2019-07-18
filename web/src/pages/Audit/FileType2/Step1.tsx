import React from "react";
import { Button } from "../../../components";
import { IStep } from "../../../types";
import { ActionContainer, Container, Instructions, InstructionsContainer, InstructionsTemplate, LoadMoreButtonView } from "../components";

export const Step1 = ({
  actionBlock,
  onContinue,
  onBack,
  scoreComponent,
  loadMoreButton,
}: IStep) => {
  return (
    <Container>
      <InstructionsContainer scoreComponent={scoreComponent}>
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
