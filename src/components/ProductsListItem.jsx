/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import { Link } from 'react-router-dom';
 
 /**
  * Component representing an Product List Item displayed in the list of products.
  *
  * @param {string} topicId The Topic to which the Product belongs, used when creating
  *                         the link to the product details
  * @param {string} topicName The Topic name, used to render breadcrumbs
  * @param {object} product The Product to display
  */
 const ProductsListItem = (props) => {
   const { product, topicName, topicId } = props;
 
   // whole view is wrapped in a "Link" component with the URL of the format
   // products/productId?topicName=name&topicId=id
   return (
     <Link
       to={{
         pathname: `/product/${product.id}`,
         search: `?topicName=${topicName}&topicId=${topicId}`,
       }}
       style={{ textDecoration: 'none' }}
     >
       <div className="article">
 
         <div className="title-date">
           <h4 className="title">{product.name}</h4>
         </div>
 
         {product.renditionUrls && (
           <picture>
             <source
               type="image/webp"
               srcSet={product.renditionUrls.srcset}
               sizes="80px"
             />
             <source srcSet={product.renditionUrls.jpgSrcset} sizes="80px" />
             <img
               src={product.renditionUrls.small}
               alt="Product thumbnail"
               width={product.renditionUrls.width}
               height={product.renditionUrls.height}
             />
           </picture>
         )}
 
         <div className="description">
           {product.description}
         </div>
       </div>
     </Link>
   );
 };
 
 export default ProductsListItem;
 
 ProductsListItem.propTypes = {
  topicId: PropTypes.string.isRequired,
  topicName: PropTypes.string.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    renditionUrls: PropTypes.shape().isRequired,
    fields: PropTypes.shape({
      releaseDate: PropTypes.shape({
        value: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};