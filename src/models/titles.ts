export interface ITitle {
  imgUrl: string;
  id: string;
  titleSwedish: string;
  titleEnglish: string;
  videoUrl: string;
  category: string;
  descriptionSV: string;
  descriptionEN: string;
  imDbId: string;
}

export const defaultTitle: ITitle = {
  imgUrl: "",
  id: "",
  titleSwedish: "",
  titleEnglish: "",
  videoUrl: "",
  category: "",
  descriptionSV: "",
  descriptionEN: "",
  imDbId: "",
};
