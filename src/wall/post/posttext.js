import React, {Component} from 'react';
import { Twemoji } from 'react-emoji-render'
import '../css/Wall.css';

export default class PostText extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showmore: false,
      slicedText: "",
      text:this.props.text,
    };
  }

  showFullPost = e => {
    e.preventDefault();
    this.setState({
      showmore: false
    });
  }

  componentDidMount() {
    const {text} = this.state;

    if(text.length > 774) {
      this.setState({slicedText:text.slice(0,530),showmore:true,});
    } else {
      this.setState({
          showmore:false,
        });
    }
  }
  render() {
    const {showmore,text, slicedText} = this.state;
    return (
      <div className="post-text">
        <p>
          {showmore ? <Twemoji svg text={slicedText} /> : <Twemoji svg text={text} />}
          <a
            href=""
            onClick={this.showFullPost}
            style={{
              display: showmore ? "inline-block" : "none",
            }}
          >
            Show more
          </a>
        </p>
      </div>
    )
  }
}
