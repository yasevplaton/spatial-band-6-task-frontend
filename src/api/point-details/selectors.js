import { IMAGE_SIZE } from "./constants";
import { imageUrlFieldName } from "../../config/point-popup";

export const parsePointDetails = (data) => {
  const { images, ...other } = data;
  const imagesObj = JSON.parse(images);
  const imageUrl = imagesObj.main[IMAGE_SIZE];
  return {
    ...other,
    [imageUrlFieldName]: imageUrl,
  };
};
