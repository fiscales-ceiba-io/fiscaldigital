import React from "react";
import { Button, Grid } from "../../../components";
import { IStep } from "../../../types";
import { ActionContainer, Container, Instructions, InstructionsContainer, InstructionsTemplate, LoadMoreButtonView } from "../components";

export const Step3 = ({
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
        <InstructionsTemplate backgroundImage={`url(/audit/compare/acta-2-grupo-3.png)`} />
      </InstructionsContainer>
      <ActionContainer>
        <Grid item container direction="row" wrap="nowrap" justify="space-between">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={onBack}
            style={{ marginRight: "14px" }}
          >
            Atrás
          </Button>
          <Button variant="contained" size="large" color="secondary" fullWidth onClick={onContinue}>
            Continuar
          </Button>
        </Grid>
        {actionBlock}
        <Grid item container direction="row" wrap="nowrap" justify="space-between">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={onBack}
            style={{ marginRight: "14px" }}
          >
            Atrás
          </Button>
          <Button variant="contained" size="large" color="secondary" fullWidth onClick={onContinue}>
            Continuar
          </Button>
        </Grid>
        <LoadMoreButtonView>{loadMoreButton}</LoadMoreButtonView>
      </ActionContainer>
    </Container>
  );
};
