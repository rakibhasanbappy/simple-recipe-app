# [Simple Recipe App using raw NodeJS and PostgreSQL]

## API Endpoints

There is only one endpoint in this API with the following methods:

- **GET /recipe?id=1 :** Retrieve a single item by its ID.
- **POST /recipe :** Create a new item.
- **PUT /recipe?id=1 :** Update an existing item by its ID.
- **DELETE /recipe?id=1 :** Delete an item by its ID.

### Request body examples

#### Create a new recipe

```json
{
  "name": "Test 1",
  "ingredients": "test no 1",
  "directions": "test no 1"
}
```

#### Update a recipe

```json
{
  "name": "Test 1",
  "ingredients": "test no 1",
  "directions": "test no 1"
}
```
