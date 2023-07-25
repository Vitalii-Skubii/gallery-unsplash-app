import React from 'react';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import PicturePage from '../pages/PicturePage/PicturePage';
import { TagCollection } from '../pages/TagCollection/TagCollection';

const AppRoutes = {
  MAIN: 'main',
  PICTURE: 'picture',
  TAGS: 'tags',
  TAG_PICTURE: 'tag_picture',
  NOT_FOUND: 'not_found',
};

export const RoutePath = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PICTURE]: '/picture/:pictureId',
  [AppRoutes.TAGS]: '/tags',
  [AppRoutes.TAG_PICTURE]: '/tags/tag/:pictureId',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.PICTURE]: {
    path: RoutePath.picture,
    element: <PicturePage />,
  },

  [AppRoutes.TAGS]: {
    path: RoutePath.tags,
    element: <TagCollection />,
  },

  [AppRoutes.TAG_PICTURE]: {
    path: RoutePath.tag_picture,
    element: <PicturePage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
