# Resizy
## API facilate image resizeng.

### Description

this *API* could be used form image resizing on the fly and as a placeholder for images 
in your web or mobile application or any environment that can utilise http protocol.

### How to Run

type in the console _npm run start_ for starting the production server or type
 _npm run start-dev_ for development. it will run the server on port 8000 with a simple front-end to test the api

### How to run tests
type in the console _npm run test_

### How to use the api

make a http *GET request* to the server with path
_api/image?filename=F&width=W&height=H_ replace F with the image name ,
W with image width, H with heaght.

### Example
*http://localhost:8000/api/image?filename=welcome&width=800&height=600*

### license
*MIT*
