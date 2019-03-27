import React from 'react'
import {injectIntl} from 'react-intl'
import '../../App.css'
import './start.css'


const f10 = "https://cdn.filestackcontent.com/5X78eSoGTNuiHcc08zI5";
const f11 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/2QVtFsCPQtKaxFsgMm3D";
const f12 = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/sjZ0xFwpSa1xivOquRY8";

const Download = ({intl}) => (
    <div className="download">
    <div className="d-l">
       <img src={f10} alt="f10" />
      </div>
   <div className="d-p">
   <div className="d-i">
     <h1>{intl.formatMessage({id: 'download.h1'})}</h1>
     </div>
     <div className="d-ic">
   <div className="ios">
       <img src={f11}  alt="f11" />
   </div>
   <div className="android">
       <img src={f12} alt="f12" />
     </div>
     </div>
     </div>
    </div>
  )

  export default injectIntl(Download)