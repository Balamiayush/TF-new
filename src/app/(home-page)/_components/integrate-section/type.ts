export interface StepsDataType {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

export interface IntegrateProps {
  stepsData: StepsDataType[];
}