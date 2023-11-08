import express from 'express';
import * as path from 'path';
import {
  checkIfFileExists,
  checkIfThumbnailExists,
  createImage,
  getImagePath
} from '../../utils/File';
import { get } from 'https';
const images = express.Router();

interface ImageQuery {
  filename: string;
  width: string;
  height: string;
}

const checkValidQuery = async ({
  filename,
  width,
  height
}: ImageQuery): Promise<null | string> => {
  if (!filename) return 'Filename is required';
  if (!width) return 'Width is required';
  if (!height) return 'Height is required';
  if (typeof filename !== 'string') return 'Filename must be a string';
  if ((await checkIfFileExists(filename)) === false)
    return 'Image not found. Please try again';
  const widthNumber = parseInt(width || '0');
  const heightNumber = parseInt(height || '0');
  if (Number.isNaN(widthNumber) || widthNumber < 1)
    return 'Please enter a valid width';
  if (Number.isNaN(heightNumber) || heightNumber < 1)
    return 'Please enter a valid height';
  return null;
};

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { filename, width, height } = req.query as unknown as ImageQuery;
      const validateMessage: null | string = await checkValidQuery(
        req.query as unknown as ImageQuery
      );
      if (validateMessage !== null) {
        res.status(400).json({ error: validateMessage });
        return;
      }
      const thumbnailExists = await checkIfThumbnailExists(
        filename,
        width,
        height
      );
      if (thumbnailExists) {
        // Retrieve the path
        const thumbnailFileName = await getImagePath(req.query as unknown as ImageQuery);
        res.sendFile(thumbnailFileName || '');
      } else {
        await createImage(req.query as unknown as ImageQuery);
        const thumbnailFileName = await getImagePath(req.query as unknown as ImageQuery);
        if (thumbnailFileName) {
          res.sendFile(thumbnailFileName);
        } else {
          res.status(500).send('Error in image creation.');
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
      console.log(error);
    }
  }
);

export default images;
