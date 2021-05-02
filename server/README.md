## Structure
server.js is the main script of server.

models/model.js defines the schemas.

api/ is for all routings.

api/admin-router.js is for the routing for the CRUD of user schema.

|     Action    |           Path          | Method |                                           Remark                                          |
|:-------------:|:-----------------------:|:------:|:-----------------------------------------------------------------------------------------:|
| Create user   | '/admin/create'         | POST   | Both of the field of username and password should be included in the request body.        |
| Retrieve user | '/admin/user/:userId'   | GET    |                                                                                           |
| Update user   | '/admin/update/:userId' | POST   | At least one of the field of username or password should be included in the request body. |
| Delete user   | '/admin/delete/:userId' | POST   |                                                                                           |

api/admin-ctrl.js is the code of the CRUD of user schema.

## TODO
Location and destination routing and CRUD
