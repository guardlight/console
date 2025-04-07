## Environment Variables


### Dynamic Docker variables
All VITE_* in .env (and vite-env.d.ts) will be overwritten with environment variable GL_* when running in docker mode.
The value of the env variable in .env.production must be the same as the environment varaible you are expecting to overwrite.
Eg. in .env.production: VITE_MY_VARIABLE=GL_MY_VERIABLE

### Attributions

Photo by <a href="https://unsplash.com/@ugur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ugur Akdemir</a> on <a href="https://unsplash.com/photos/assorted-book-lot-XT-o5O458as?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      