# API for CrAO Solar App

### Development
- `npm i` - to install all dependencies
- `npm i -g foreman` - to install Node-Foreman globally
- `mongod` - it must be run in terminal
- `nf start dev` - to run supervisor for project
- or `npm start` - just to run without watcher

### Deploy
- `nf start setup-deploy` - run once to prepare deployment via git
- `nf start deploy` - run each time when you want to deploy project to Production