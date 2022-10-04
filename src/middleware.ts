import { Request, Response } from 'express';
import { NextFunction } from 'express';
import u from './utils';

// middlewar to validate query parmeters
const validateMiddlewar = (req: Request, res: Response, next: NextFunction) => {
  const fileName = req.query.filename;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // filename will be undefined if not given
  // and height, width will be NAN if not given or can't be conveted to numbers
  //  then send Bad request (400) to client if any value is false
  if (!(fileName && width && height)) {
    res.sendStatus(400);
  } else {
    next(); // then proceed to the next middlewar
  }
};

// middlewar to set some useful properties to the response
const preparingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.fileName = req.query.filename;
  res.locals.width = Number(req.query.width);
  res.locals.height = Number(req.query.height);
  res.locals.imageName = u.createIamageName(
    res.locals.fileName,
    res.locals.width,
    res.locals.height
  );
  next();
};

// send image from cache if processed before
const ifCachedMiddlewar = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const cached: boolean = await u.isImageCached(res.locals.imageName);
  if (cached) {
    res.sendFile(u.getImagePath(`./images_thumb/${res.locals.imageName}`));
  } else {
    next();
  }
};

// middlewar to check if image found in full folder to resize
// if not send Not Found (404) to client
const isImageFoundMiddleware = async (req: Request, res: Response) => {
  const found: boolean = await u.isImageFound(res.locals.fileName);
  if (found) {
    await u.resizeAndCache(
      res.locals.fileName,
      res.locals.width,
      res.locals.height
    );
    // send the resized image from cache
    res.sendFile(u.getImagePath(`./images_thumb/${res.locals.imageName}`));
  } else {
    res.status(404).send('Sorry image not found');
  }
};

export default {
  validateMiddlewar,
  preparingMiddleware,
  ifCachedMiddlewar,
  isImageFoundMiddleware
};
