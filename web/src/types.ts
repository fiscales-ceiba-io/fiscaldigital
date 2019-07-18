export interface IStep {
  actionBlock: any;
  onContinue: any;
  onBack: any;
  scoreComponent: JSX.Element | JSX.Element[];
  loadMoreButton: any;
}
