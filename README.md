# system-crm-app

System-crm is an example of customer relationship management system that was created using ReactJS and ExpressJS libraries. Data stored [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

- [Website](http://systemcrm.herokuapp.com)

## Quick start

# Step 1 Clone repo
```bash
git clone git@github.com:konstantindergachev/system-crm-app.git
```
# Step 2 Install dependencies
```bash
yarn install or npm install
```
# Step 3 To hosting images I use Cloudinary 
[cloudinary](https://cloudinary.com/)
# Step 4 In this project data stored in the atlas mongodb cloud
For development mode, you need to create keys_dev.js file in the config folder:
```sh
  module.exports = {
    mongoURI: '**********',                     <- atlas mongodb cloud
    secretOrKey: '**********',                  <- secret string for token bcrypt
    imageUrl: './app/client/src/img/uploads/',
    cloud_name: '**********',                   <- cloudinary
    api_key: '**********',                      <- cloudinary
    api_secret: '***********',                  <- cloudinary
  };
```
# Step 5 Use your own social icons and favicon.ico:
```bash
app/client/public/favicon.ico
```
# Step 6 Start back-end and front-end at the same time in the development mode with hot reloading enabled
```bash
 yarn run dev or npm run dev
```
# Step 7 Deploy to Heroku: Cloud Application Platform
[heroku](https://www.heroku.com/)


## Info
### Author
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/).