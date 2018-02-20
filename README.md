# Bank Chat

### Getting started

To run this, you will need some environment variables,
The easies way to setup this is to create a `.env` file.

Example `.env` file:
```
SBANKEN_APPLICATION_KEY=xxxxxxxxxxxxxxxxxxxxx
SBANKEN_APPLICATION_SECRET=xxxxxxxxxxxxxxxxxxxxx
WIT_APP_ID=xxxxxxx-xxxxxx-xxxxx-xxxxxxxx
WIT_TOKEN=xxxxxxxxxxxxxxxxxxxxxxx
REDIS_URL=redis://localhost:6379/0
MONGO_URL=mongodb://localhost:27017/bank-chat
CONFIDENCE_LEVEL=0.6
LOG_LEVEL=verbose
```

Then just run `npm install` to install dependencies, and run `npm run dev` to start the interactive shell to test and communicate with the chat bot. (there is no auto update yet, so you will need to restart the shell for every change you want to test.)


If you need mongodb and/or redis, you can easily setup this with docker.

With docker installed just run `docker-compose up -d`

When you are done coding just run `docker-compose down` in the same folder, this will power down the docker containers.

### TODO
[ ] Add sbanken api
[ ] Setup basic onboarding for api access
[ ] Store user session data in redis
[ ] Store onboarding results in mongodb (Access token?)
[ ] Finish list accounts intent
[ ] Add basic autoloading
