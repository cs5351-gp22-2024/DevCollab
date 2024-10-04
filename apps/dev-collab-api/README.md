### Naming convention
For each file create under entity, routes/v1, service, controller, please follow below naming convention
```
your-feature-name.[entity|routes|service|controller].ts
```

```
user.controller.ts
user.service.ts
user.routes.ts
user.entity.ts

user-story.controller.ts
user-story.service.ts
user-story.routes.ts
user-story.entity.ts

```

### Project Structure

Under src, your code should be put in different folder according to its nature

The sequence for handling an api request should be
1. Route (route an request to controller)
2. Controller (incoming request /outgoing response validation)
3. Service (here is all your business logic)
4. Entity/Repository (in case you need to get or persist data in database)

Please avoid calling Repository directly from controller or route

### Route
Route is responsible for routing traffic to controller layer. Please add route in the index.ts file for each feature if you want to expose its endpoints

### Controller
Controller is the entry to process incoming/outgoing event, you may apply request validation here. I have create an example on how to 

### Service 
Service is all your logic, including data processing, retriving data in database (Since we don't have a db yet, i have skipped this part), persisting data in database


### Entity
your database schema for you feature
please always make sure your entity include these field, please also stick with the naming convention if possible
```
id as PK
createdDate
updatedDate
```

