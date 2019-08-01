import React from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useMutation } from "react-apollo-hooks";
import "../css/Wall.css";
import gql from "graphql-tag";
import { Formik } from "formik";
import { useSetState } from "../../hooks/useSetState";
import { SharePostSchema } from "./postValidation";
import Topics from "./topics";
import BottomPost from "./bottomPost";
import { Close } from "grommet-icons";

const CREATE_STORY = gql`
  mutation CreateStory($body: String!, $hashtags: [HashtagWhereUniqueInput!]!) {
    createStory(body: $body, hashtags: $hashtags) {
      id
      body
    }
  }
`;
const initialValues = {
  post: "",
  selectedTags: []
};

export default function NewPost() {
  const [state, setState] = useSetState({
    close: true
  });

  const addStory = useMutation(CREATE_STORY);

  return (
    <div className="post-wrapper">
      <Topics />
      <Formik
        initialValues={initialValues}
        validationSchema={SharePostSchema}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          addStory({
            variables: { body: values.post, hashtags: values.selectedTags },
            update: (proxy, data) => {
              actions.setSubmitting(false);

              actions.resetForm(initialValues);
            }
          });
        }}
        render={({
          setValues,
          values,
          handleChange,
          onFocus,
          handleSubmit,
          errors,
          isSubmitting,
          resetForm
        }) => {
          return (
            <form className="addPost" onSubmit={handleSubmit}>
              <Close
                onClick={() => resetForm(initialValues)}
                id="close"
                style={{ display: values.post !== "" ? "block" : "none" }}
              />
              <div className="add-post-text">
                <TextareaAutosize
                  name="post"
                  rows={4}
                  onFocus={onFocus}
                  value={values.post}
                  onChange={handleChange}
                  placeholder="What is in your mind ? "
                />
              </div>

              <BottomPost
                errors={errors}
                setValues={setValues}
                values={values}
                color="#E53935"
                {...state}
                isSubmitting={isSubmitting}
              />
            </form>
          );
        }}
      />
    </div>
  );
}
