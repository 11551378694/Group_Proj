## Structure
/server.js is the main script of server.

/app/models/ defines the schemas.

/api/ is for requests routings.

### Routing for request of CRUD of user schema

/api/admin-router.js is for the routing for the CRUD of user schema.

| Action        | Path                 | Method | Request body field                                       |
|---------------|----------------------|--------|----------------------------------------------------------|
| Create user   | '/admin/user/create' | POST   | Required: "username", "password"                         |
| Retrieve user | '/admin/user/'       | POST   | Required: "userId"                                       |
| Update user   | '/admin/update/'     | POST   | Required: "userId"; at least one: "username", "password" |
| Delete user   | '/admin/delete/'     | POST   | Required: "userId"                                       |

/api/admin-ctrl.js is the code of the CRUD of user schema.

### Routing for request of CRUD of location schema

/api/location-router.js is for the routing for the CRUD of location schema.

|       Action      |            Path           | Method |                           Request body field                          |
|:-----------------:|:-------------------------:|:------:|:---------------------------------------------------------------------:|
| Create Location   | '/admin/location/create'  | POST   | Required: "locationId", "name", "latitude", "longitude"               |
| Retrieve Location | '/admin/location/'        | POST   | Required: "locationId"                                                |
| Update Location   | '/admin/location/update/' | POST   | Required: "locationId"; at least one: "name", "latitude", "longitude" |
| Delete Location   | '/admin/location/delete/' | POST   | Required: "locationId"                                                |
| Refresh Location  | '/admin/location/refresh/'| POST   |                                                                       |

/api/location-ctrl.js is the code of the CRUD of location schema.
