import * as Yup from 'yup'

const SharePostSchema = Yup.object().shape({
  post: Yup.string()
    .min(200, 'The min length 200 *')
    .max(1000, 'The max length 1000 *')
    // .matches(
    //   /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi,
    //   'URL not allowed',
    // )
    // .matches(/[^0-9]/g, 'Phone numbers not allowed')
    // .matches(
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   'Email address not allowed',
    // )
    .required("This post shouldn't be empty"),
  selectedTags: Yup.array()
    .min(3, 'The min tags 3')
    .max(25, 'The maximum tags 25')
    .required('Story should have hashtags!'),
})

export {SharePostSchema}
