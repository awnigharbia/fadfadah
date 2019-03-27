import React, { Component } from "react";
import Auth from '../../auth';
import qs from 'qs';
import "../css/Wall.css";
import { Twemoji } from 'react-emoji-render';

//imgs
import people from "../../imgs/people.png";

export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: false,
      siteTags: [],
      peopleTags: [],
      activeTags: [],
    };
  }
  getFollowedTags = async() => {
    const getFollwrdT = await fetch('http://localhost:3001/followed_tags', {
        headers: {
              "auth": Auth.getToken(),
          },
      });
      const tags = await getFollwrdT.json();
      if(tags.length !== -1) {
        await this.setState({
          activeTags:tags,
        })
        this.activeFollow();
      }
  }


  getTags = async() => {
   const gTags = await fetch('http://localhost:3001/tag', {
        headers: {
              "auth": Auth.getToken(),
          },
      });
   const tags = await gTags.json();
                await this.setState({
                  siteTags:tags,
                })
  }

  activeFollow =  () => {
    const {siteTags, activeTags, peopleTags} = this.state;

    activeTags.map((item) => {
      siteTags.map((t, key) => {
         if (t._id === item) {
          const {siteTags} = this.state;
          let newTag = Object.assign({}, siteTags);
          newTag[key].active = true
          this.setState(newTag)
        }
        return null
      }); // Site Tags
      peopleTags.map((t, key) => {
        if (t._id === item) {
          const {peopleTags} = this.state;
          let newTag = Object.assign({}, peopleTags);
          newTag[key].active = true
          this.setState(newTag)
        }
        return null
      }); // People Tags
      return null
    });
  }

  getPeopleTags = async() => {
   const peopleTags = await fetch('http://localhost:3001/tag/people', {
        headers: {
              "auth": Auth.getToken(),
          },
      });

  const tags = await peopleTags.json();
  await this.setState({
    peopleTags:tags,
  })
  this.getFollowedTags();    
  }

  showSiteTags = () => {
    const { siteTags } = this.state;

    if (siteTags === false) {
      return;
    } else {
      this.setState({
        tags: false
      });
    }
  };
  showPeopleTags = () => {
    const { peopleTags } = this.state;

    if (peopleTags === true) {
      return;
    } else {
      this.setState({
        tags: true
      });
    }
  };

   updateTags = () => {
    const tags = this.state.activeTags;
    const aTags = qs.stringify({tags}, {indices: false});

    // UPDATE the DATABASE
    fetch('http://localhost:3001/update_tag', {
      method:'PUT',
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "auth": Auth.getToken(),
      },
      body: `` + aTags,
    }).then((res) => {
      if (res.status === 200) {
        this.props.refresh();
      }
    })
  }

  activeSite = (id, key) => {
    const { siteTags, activeTags } = this.state;
    var newState = Object.assign({}, this.state);
    newState = newState.siteTags.slice();
    if (newState[key].active === true) {
      if(this.state.activeTags.length > 3) {
        this.setState({
          siteTags: [
            ...siteTags.map(x => {
              if (x._id === id) {
                return {
                  ...x,
                  active: false
                };
              }
              return x;
            })
          ],
          activeTags: activeTags.filter((item, i) => item !== id )
        }, () => {
          this.updateTags();
        });
      }
    } else {

      // UPDATE the UI
      this.setState({
        siteTags: [
          ...siteTags.map(x => {
            if (x._id === id) {
              return {
                ...x,
                active: true
              };
            }
            return x;
          })
        ],
       activeTags:[id, ...activeTags],
     }, () => {
        this.updateTags();
      });
    }
  };

  activePeople = (id, key) => {
    const { peopleTags, activeTags } = this.state;
    var newState = Object.assign({}, this.state);
    newState = newState.peopleTags.slice();
    if (newState[key].active === true) {
      this.setState({
        peopleTags: [
          ...peopleTags.map(x => {
            if (x._id === id) {
              return {
                ...x,
                active: false
              };
            }
            return x;
          })
        ],
        activeTags: activeTags.filter((item, i) => item !== id )
      }, () => {
        this.updateTags();
      });
    } else {
      this.setState({
        peopleTags: [
          ...peopleTags.map(x => {
            if (x._id === id) {
              return {
                ...x,
                active: true
              };
            }
            return x;
          })
        ],
        activeTags:[id, ...activeTags],
      }, () => {
        this.updateTags();
      });
    }
  };

  componentDidMount() {
    this.getTags();
    this.getPeopleTags();
  }
  render() {
    const { tags, siteTags, peopleTags } = this.state;
    
    return (
      <div className="tags">
        <TopIntro />
        <div className="top-tabs">
          <button
            onClick={this.showSiteTags}
            className={tags ? "" : "activeTab"}
          >
            Site_tags <Twemoji text="🌐" />
          </button>
          <button
            onClick={this.showPeopleTags}
            className={tags ? "activeTab" : ""}
          >
            People_tags <Twemoji text="👪" />
          </button>
        </div>
        <div id="br" />
        <div className="tabContent">
          {tags ? (
            peopleTags.map((item, key) => (
              <p
                className={item.active ? "activeHash" : ""}
                key={item._id}
                onClick={() => {
                    this.activePeople(item._id, key)}}
              >
                #{item.name}
              </p>
            ))
          ) : (
            siteTags.map((item, key) => (
              <p
                className={item.active ? "activeHash" : ""}
                key={item._id}
                onClick={() => {
                  this.activeSite(item._id, key);
                }
                }
              >
                #{item.name}
              </p>
            ))
          )}
        </div>
      </div>
    );
  }
}

const TopIntro = props => {
  return (
    <div className="top-intro-wrapper">
      <div className="top-intro">
        <img src={people} alt={people} />
        <h1>Follow_Tags <Twemoji text="👊👊" /></h1>
      </div>
    </div>
  );
};
