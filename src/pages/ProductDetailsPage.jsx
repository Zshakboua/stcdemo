/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
 import filterXSS from 'xss';
 import React from 'react';
 import PropTypes from 'prop-types';
 import { fetchProductDetails } from '../scripts/services';
 import Breadcrumbs from '../components/Breadcrumbs';
 
 /**
  * Component for the Products List Page.
  */
 class ProductDetailsPage extends React.Component {
   constructor(props) {
     super(props);
 
     let data;
     let topicName;
     let topicId;
     if (process.env.IS_BROWSER) {
       data = window.INITIAL_DATA;
       delete window.INITIAL_DATA;
 
       const { location } = this.props;
       const params = new URLSearchParams(location.search);
       topicName = params.get('topicName');
       topicId = params.get('topicId');
     } else {
       const { staticContext } = this.props;
       data = staticContext.data;
       topicName = staticContext.requestQueryParams.topicName;
       topicId = staticContext.requestQueryParams.topicId;
     }
 
     this.state = {
       data,
       loading: !data,
       topicId,
       topicName,
     };
   }
 
   // executed client side only
   componentDidMount() {
     document.title = 'Product';
 
     const { match } = this.props;
 
     const { data } = this.state;
     if (!data) {
       this.fetchData(match.params.productId);
     }
   }
 
   // called when any of the component's properties changes
   // if the properties have changed, reload the data
   componentDidUpdate(prevProps) {
     const { match } = this.props;
 
     if (prevProps.match.params.productId !== match.params.productId) {
       this.fetchData(match.params.productId);
     }
   }
 
   // Client Side Data Fetching: called from Client when doing client side routing/hydration
   fetchData(productId) {
     this.setState(() => ({
       loading: true,
     }));
 
     fetchProductDetails(productId)
       .then((data) => this.setState(() => ({
         data,
         loading: false,
       })));
   }
 
   // render the component
   render() {
     const {
       loading,
       data,
       topicId,
       topicName,
     } = this.state;
     if (loading === true) {
       return <div className="progress-spinner" />;
     }
     const {
       name,
       description,
       title,
       content,
       productColor,
       productStorage,
     } = data;
     // Breadcrumbs :  Home > topicName > productName (read only)
     // - "Home" url      =  "/"
     // - "topicName" url =  "/products/topicId?topicName=name"
     const breadcrumbsData = [
       {
         linkParams: { pathname: '/' },
         text: 'Home',
       },
       {
         linkParams: { pathname: `/products/${topicId}`, search: `?topicName=${topicName}` },
         text: topicName,
       },
       {
         linkParams: {},
         text: name,
       },
     ];

     const options = {
      stripIgnoreTag: true, // filter out all HTML not in the whitelist
      stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
      // to filter out its content
    };
    // eslint-disable-next-line no-undef
    const cleancontent = filterXSS(content, options);
    
     return (
       <div>
         <Breadcrumbs breadcrumbsData={breadcrumbsData} />
         <div id="article">
           <div className="author">
             {/* Avatar */}
             {data.producerRenditionUrls && (
               <picture>
                 <source
                   type="image/webp"
                   srcSet={data.producerRenditionUrls.srcset}
                   sizes="80px"
                 />
                 <source srcSet={data.producerRenditionUrls.jpgSrcset} sizes="80px" />
                 <img src={data.producerRenditionUrls.small} alt="Producer Avatar" />
               </picture>
             )}
 
             {/*  Producer Name, Product Storage, Product Color*/}
             <div className="name_date">
               <h4 className="specs">{title}</h4>
               <h4 className="specs">{productStorage}</h4>
               <h4 className="specs">{productColor}</h4>
             </div>
           </div>
 
           <div className='align-product'>
           {/* Product Image */}
           <figure>
             {data.renditionUrls && (
               <picture>
                 <source type="image/webp" srcSet={data.renditionUrls.srcset} />
                 <source srcSet={data.renditionUrls.jpgSrcset} />
                 <img
                   src={data.renditionUrls.large}
                   alt="Product"
                   width={data.renditionUrls.width}
                   height={data.renditionUrls.height}
                 />
               </picture>
             )}
           </figure>
 
           {/* Product Content */}
           <div className="content">
             {description}
             { content.indexOf('</') !== -1
                  ? (
                    // eslint-disable-next-line react/no-danger
                    <div dangerouslySetInnerHTML={{ __html: cleancontent }} />
                  )
                  : cleancontent}
           </div>
           </div>
         </div>
       </div>
     );
   }
 }
 
 // Server Side Data Fetching: called from Express server when sending HTML to client
 function fetchInitialData(req) {
   return fetchProductDetails(req.path.split('/').pop());
 }
 
 /*
  * Export an object with name value pairs of fetchInitialData function and component.
  */
 export default {
   fetchInitialData,
   component: ProductDetailsPage,
 };
 
 ProductDetailsPage.propTypes = {
   staticContext: PropTypes.shape({
     data: PropTypes.shape({}),
     requestQueryParams: PropTypes.shape({
       topicName: PropTypes.string,
       topicId: PropTypes.string,
     }),
   }),
 
   match: PropTypes.shape({
     params: PropTypes.shape({
       productId: PropTypes.string,
     }),
   }).isRequired,
 
   location: PropTypes.shape({
     search: PropTypes.string,
   }).isRequired,
 };
 
 ProductDetailsPage.defaultProps = {
   staticContext: {},
 };
 