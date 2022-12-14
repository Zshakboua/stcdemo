/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * Contains the Routes used in the Client and Server routers.
 */
import TopicsListPage from './TopicsListPage';
import ArticlesListPage from './ArticlesListPage';
import ArticleDetailsPage from './ArticleDetailsPage';
import ProductsListPage from './ProductsListPage';
import ProductDetailsPage from './ProductDetailsPage';
import VideosListPage from './VideosListPage';
import NotFoundPage from './NotFoundPage';

export default [
  {
    ...TopicsListPage,
    path: '/',
    exact: true,
    title: 'Topics',
  },
  {
    ...ArticlesListPage,
    path: '/articles/:topicId',
    exact: true,
    title: 'Articles',
  },
  {
    ...ArticleDetailsPage,
    path: '/article/:articleId',
    exact: true,
    title: 'Article',
  },
  {
    ...ProductsListPage,
    path: '/products/:topicId',
    exact: true,
    title: 'Prodcuts',
  },
  {
    ...ProductDetailsPage,
    path: '/product/:productId',
    exact: true,
    title: 'Product',
  },
  {
    ...VideosListPage,
    path: '/videos/:topicId',
    exact: true,
    title: 'Videos',
  },
  {
    ...NotFoundPage,
    path: '*',
    exact: false,
    title: 'Page Not Found',
  },
];
