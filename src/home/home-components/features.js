import React from 'react'
import {injectIntl} from 'react-intl'
import '../../App.css'
import './start.css'

import Card from './card';

const f1 = 'https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/1PDIGrXGSLmy4AfKJveh';
const f2 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/BEV4ByvSRDnpKQU6T1iT";
const f3 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/x3WKAZgrSV6z8ICaQXuF";
const f4 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/im5glxczR5qofqV8a1MZ";
const f5 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/C0lsq7fTSomWO514NU6J";
const f6 = "";
const f7 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/1LFTP645QrRxyyTmhkjO";


const Features = ({intl}) => (
    <div className="features" id="features">
    <div className="t"><h1>{intl.formatMessage({id: 'features.h1'})}</h1></div>
  <div className="f-cards">
      <Card src={f1} alt="card-img-1" title={intl.formatMessage({id: 'features.c1.title'})} breif={intl.formatMessage({id: 'features.c1.breif'})} />
      <Card src={f2} alt="card-img-2" title={intl.formatMessage({id: 'features.c2.title'})} breif={intl.formatMessage({id: 'features.c2.breif'})} />
      <Card src={f5} alt="card-img-3" title={intl.formatMessage({id: 'features.c3.title'})} breif={intl.formatMessage({id: 'features.c3.breif'})}/>
      <Card src={f7} alt="card-img-4" title={intl.formatMessage({id: 'features.c4.title'})} breif={intl.formatMessage({id: 'features.c4.breif'})}/>
      <Card src={f4} alt="card-img-5" title={intl.formatMessage({id: 'features.c5.title'})} breif={intl.formatMessage({id: 'features.c5.breif'})}/>
      <Card src={f3} alt="card-img-6" title={intl.formatMessage({id: 'features.c6.title'})} breif={intl.formatMessage({id: 'features.c6.breif'})}/>
      <Card src={f7} alt="card-img-7" title={intl.formatMessage({id: 'features.c7.title'})} breif={intl.formatMessage({id: 'features.c7.breif'})}/>
      <Card src={f6} alt="card-img-8" title={intl.formatMessage({id: 'features.c8.title'})} breif={intl.formatMessage({id: 'features.c8.breif'})}/>
    </div>
   </div>
  )

  export default injectIntl(Features)