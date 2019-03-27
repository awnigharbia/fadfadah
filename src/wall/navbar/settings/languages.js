import React, {Component} from "react";
import "../../css/Wall.css";


import palestine from "../../../imgs/palestine.png";
import unitedstate from "../../../imgs/united-states.png";
import success from "../../../imgs/success.png";

class  Languages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang:this.props.lang,
    }
  }
  setArabic = () => {
    this.props.changeToArabic();
    if (this.state.lang === 'ar') {
      return;
    } else {
      this.setState({
        lang:'ar' 
      })
    }
  };

  setEnglish = () => {
    this.props.changeToEnglish();
    if(this.state.lang === 'en') {
      return;
    } else {
      this.setState({
        lang: 'en'
      })
    }
  };
  render() {
  const {show, lang} = this.props
 
  return (
    <div
      className="languages"
      style={{ display: show ? "flex" : "none" }}
    >
      <div
        onClick={this.setArabic}
        className={"arabic " + (lang === 'ar' ? "activelanguage" : "")}
      >
        <img src={palestine} alt="arabic language" />
        <p>Arabic</p>
        <img
          id="success"
          src={success}
          alt="success"
          style={{ display: lang === 'ar' ? "block" : "none" }}
        />
      </div>
      <div
        onClick={this.setEnglish}
        className={"english " + (lang === 'en' ? "activelanguage" : "")}
      >
        <img src={unitedstate} alt="united state" />
        <p>English</p>
        <img
          id="success"
          src={success}
          alt="success"
          style={{ display: lang === 'en' ? "block" : "none" }}
        />
      </div>
    </div>
  )
}
};

export default Languages;
