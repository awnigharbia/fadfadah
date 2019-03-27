import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import '../css/Wall.css'
import qs from 'qs'
// import { Picker } from 'emoji-mart'
import { Twemoji  } from 'react-emoji-render'
import io from 'socket.io-client'

//components
import NewPost from '../post/addPost'
import Post from '../post/post'
import Tags from './tags'
import Auth from '../../auth'
import Support from '../widgets/support'
import SocialMedial from '../widgets/social'

const socket = io.connect('http://localhost:3001', {
    query: 'token=' + Auth.getToken()
  });


class Wall extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts:[],
      emptyPosts:false,
      loadingPosts:true,
      siteTags:[],
      activeTags:[],
      user_id:'',
      last_id:'',
      morePosts:false,
      morePostsCount:0,
    }
    
  }

   getPosts = async() => {
    const res1 = await fetch('http://localhost:3001/user', {
      headers: {
            "auth":Auth.getToken(),
        },
    });
    const userInfo = await res1.json();
    if(userInfo.user.tags.length < 3 ) {
      const gTags = await fetch('http://localhost:3001/tag', {
        headers: {
              "method":'POST',
              "auth": Auth.getToken(),
          },
      });
      const tags = await gTags.json();
  
      await this.setState({
              emptyPosts:true,
              loadingPosts:false,
              posts:[],
              siteTags:tags,
        }) 
    } else {
      const user_id = userInfo.user._id;
      const res2 = await  fetch('http://localhost:3001/followed_posts', {
              headers: {
                    "auth":Auth.getToken(),
                },
            });
      const followed_posts = await res2.json();
        //get the last post offset 
        const last_post = followed_posts.length - 1;
      
        if(followed_posts.length !== 0) {
          this.setState({
            posts:followed_posts,
            emptyPosts:false,
            loadingPosts:false,
            morePosts:false,
            last_id:last_post,
            user_id:user_id,
          }, () => {
            socket.on('newPosts', (data) => {   
              const {posts} = this.state;   
              if(posts.length > 0) {   
              const length = posts[0].count;
        
              if (data.count > length && user_id !== data.id) {
                  this.setState({
                    morePosts:true,
                    morePostsCount:data.count - length
                  })
              }
            }})
          })    
        } else {
          this.setState({
              posts:followed_posts,
              emptyPosts:false,
              loadingPosts:false,
              morePosts:false,
            })
          }
  }
  }
  
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
    })
  }
  activeSite = (id, key) => {
    const { siteTags, activeTags } = this.state;


    var newState = Object.assign({}, this.state);
    newState = newState.siteTags.slice();
    if (newState[key].active === true) {
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

  checkTags = () => {
    if(this.state.activeTags.length >= 3) {
      this.refresh();
    } 
  }

  refresh = () => {
     this.getPosts();
  }
  morePosts = () => {
    const {last_id} = this.state;
  
    if(last_id !== undefined) {     
      fetch('http://localhost:3001/getmoreposts', {
        method:'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "auth": Auth.getToken(),
          },
          body: `last_id=${last_id}`
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if(json.success) {
          const more_posts = this.state.posts.concat(json.nextItems);
          const more_posts_last_id = more_posts.length - 1;
          this.setState({
            posts: more_posts,
            last_id:more_posts_last_id,
          })
        }
      })
  }
  }
  handleScroll = () => {
    var body = document.documentElement;
    var scrollviewOffsetY = body.scrollTop
    var scrollviewFrameHeight = body.clientHeight
    var scrollviewContentHeight = body.scrollHeight
    var sum = scrollviewOffsetY + scrollviewFrameHeight
  
    if (sum >= scrollviewContentHeight) {
        this.morePosts();
      }
  }
  componentDidMount() {
    this.getPosts()
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const {posts, emptyPosts, loadingPosts, siteTags, user_id, morePosts} = this.state;
    const intl = this.props.intl;
    return (
          <div className="wa">
            <div className="wa-wrapper">
            <div className="center">
              <NewPost 
                refresh={this.refresh}
                />
              <div className="posts">
                {morePosts &&   <div className="more-posts" onClick={this.refresh}>
                     {this.state.morePostsCount} New posts !
                 </div>
                } 
                {
                    posts.map((post, key) => {
                      
                      if (post.liked_users.indexOf(user_id) !== -1) {
                        return <Post 
                                  key={post._id} 
                                  id={post._id}
                                  user_id={post.user_id} 
                                  motivate={true} 
                                  text={post.description}
                                  deleteConfirm={this.deleteConfirm}
                                   />;
                      } else {
                        return  <Post 
                                   key={post._id} 
                                   id={post._id} 
                                   user_id={post.user_id}
                                   motivate={false}
                                   deleteConfirm={this.deleteConfirm}
                                   text={post.description} />;
                      }
                     
                    })

                }
                { loadingPosts &&
                      <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                      </div>
                }
                { emptyPosts &&
                <div>
                  <div id="myModal" className="modal-signup">
                    <div className="modal-content-signup">
                      <div className="modal-header-signup">
                        <h2>Follow Tags to continue <Twemoji text="🙈🙈👇" /></h2>
                        <span className="span-text">* You must select at least 3 tags</span>
                      </div>
                      
                      <div id="br" />
                      <div className="modal-body-signup">
                       
                        {siteTags.map((item, key) => (
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
                        } 
                      </div>
                      <div className="modal-footer-signup">
                        <button className="modal-footer-btn" onClick={this.checkTags}>Follow </button>
                        </div>
                    </div>
                  </div>
                  <p style={{backgroundColor:'#F44336', padding:5, borderRadius:2.5, color:'white'}}>Please Select Tag to Follow</p>
                  </div>
                }
              </div>
          </div>

          <div className="right">
            <Tags refresh={this.refresh} />
            <SocialMedial />
            <Support msg={intl.formatMessage({id: 'support.h1'})} />
          </div>
          </div>
        </div>
        )
      }
  }

export default injectIntl(Wall)