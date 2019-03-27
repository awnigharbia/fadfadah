import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import '../css/Wall.css'
// import qs from 'qs';

//components
// import NewPost from '../post/addPost'
import Post from '../post/post'
// import Tags from '../wall/tags'
import Auth from '../../auth'
import Support from '../widgets/support'
import SocialMedial from '../widgets/social'


class Spost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts:[],
      emptyPosts:false,
      loadingPosts:true,
      err:false,
      user_id:'',
      last_id:'',
    }
  }

  getPosts = () => {
    fetch('http://localhost:3001/user', {
      headers: {
            "auth":Auth.getToken(),
        },
    }).then((res) => {
      return res.json();
    }).then((json) => {
      if(json.user.tags.length < 3) {
        this.setState({
          emptyPosts:true,
          loadingPosts:false,
          posts:[],
        })
      } else {
       const  id = this.props.match.params.id
        fetch(`http://localhost:3001/post/${id}`, {
          headers: {
                "auth":Auth.getToken(),
            },
        }).then((res) => {
          return res.json();
        }).then((json) => {
          if(json.post !== null) {
            this.setState({
              posts:[json.post],
              loadingPosts:false
            })
          } else {
            this.setState({
              err:true,
              loadingPosts:false,
            })
          }
        })
       }
      })
  }

  componentDidMount() {
     this.getPosts();
  }

  render() {
    const {posts, loadingPosts, user_id, err} = this.state;
   
    const intl = this.props.intl;
    return (
          <div className="wa">
            <div className="wa-wrapper">
            <div className="center">
              <div className="posts"> 
                {err && 
                  <h1>Post Not Found !</h1>}
                {
                    posts.map((post, key) => {
                      
                      if (post.liked_users.indexOf(user_id) !== -1) {
                        return <Post 
                                  key={post._id} 
                                  id={post._id}
                                  user_id={post.user_id} 
                                  motivate={true} 
                                  text={post.description}
                                  motivateL={post.liked_users.length} />;
                      } else {
                        return  <Post 
                                   key={post._id} 
                                   id={post._id} 
                                   user_id={post.user_id}
                                   motivate={false}
                                   motivateL={post.liked_users.length}
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
              </div>
          </div>

          <div className="right">
            <SocialMedial />
            <Support msg={intl.formatMessage({id: 'support.h1'})} />
          </div>
          </div>
        </div>
        )
      }
  }

export default injectIntl(Spost)