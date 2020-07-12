=== Playlister - Express Server ===

This is an Express server generated using express-generator.

To add routes, create separate js files inside 

    ./src/routes folder.

Do not add routes to index.js as it would get messy and confusing.

Namespaces refer to the context where a request is located.
E.g.
    /users/loginAsUser

    In this example, /users is the namespace.
    By following routing standards, all requests
    that is involved with "users" should be under
    this namespace, and the requests should be inside
    ./src/routes/users.js

If you wanna create new namespaces, add them to

    ./src/namespaces.js



As much as possible, do not send an HTML file from the server.
This server should serve as the backend to handle sending and receiving data

React should handle all frontend requests.

Developers:
- Maria Ruby S. Pelueta
- John Marvie E. Biglang-awa

Date developed:
- 07-2020