import React, { useState } from "react";
import Scroll from "react-scroll";
import { Route, Switch } from "react-router-dom";
import gql from "graphql-tag";
import { useSubscription, useMutation } from "react-apollo-hooks";
import { useQuery } from "react-apollo";
import "../App.css";
import _ from "lodash";

//components
import Nav from "./navbar/nav";
import Wall from "./wall/wall";
import Profile from "./profile/profile";
import Dailymsg from "./dailymsg/dailymsg";
import Notification from "./notification/notifications";
import Spost from "./spost/spost";
import SelectHashtags from "./wall/selectHashtags/selectHashtags";

const READ_NOTIFICATIONS = gql`
  query notifications($first: Int!, $skip: Int!) {
    notifications(first: $first, skip: $skip) {
      notification {
        id
        code
        seen
      }
    }
  }
`;

const NEW_NOTIFICATION_SUB = gql`
  subscription {
    newNotification {
      id
      code
    }
  }
`;
const SET_SEEN_NOTIFICATION = gql`
  mutation setSeenNotification {
    setSeenNotifications {
      count
    }
  }
`;

const scroll = Scroll.animateScroll;

export default function Container({ changeToArabic, changeToEnglish, lang }) {
  const [isNewNotification, setIsNewNotification] = useState(false);
  useSubscription(NEW_NOTIFICATION_SUB, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (subscriptionData) setIsNewNotification(true);
    }
  });
  useQuery(READ_NOTIFICATIONS, {
    variables: { first: 20, skip: 0 },
    onCompleted: data => {
      if (_.find(data.notifications.notification, { seen: false })) {
        setIsNewNotification(true);
      }
    }
  });

  const setSeenNotification = useMutation(SET_SEEN_NOTIFICATION);

  return (
    <div className="wall-wrapper">
      <Nav
        changeToArabic={changeToArabic}
        changeToEnglish={changeToEnglish}
        lang={lang}
        alert={isNewNotification}
      />
      <div className="content">
        <Switch>
          <Route
            exact
            path="/account/selecthashtags"
            render={() => <SelectHashtags />}
          />
          <Route
            exact
            path="/account/wall"
            render={() => {
              scroll.scrollToTop();
              return <Wall />;
            }}
          />
          <Route exact path="/account/post/:id" component={Spost} />
          <Route
            exact
            path="/account/profile"
            render={() => {
              scroll.scrollToTop();
              return <Profile />;
            }}
          />
          <Route
            exact
            path="/account/dailymsg"
            render={() => {
              scroll.scrollToTop();
              return <Dailymsg />;
            }}
          />
          <Route
            exact
            path="/account/notifications"
            render={() => {
              setIsNewNotification(false);
              setSeenNotification();
              return <Notification />;
            }}
          />
        </Switch>
      </div>
    </div>
  );
}
