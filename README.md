# Peek URL

An url shortener with analytics.

_Check it out on: <https://peek-url.vercel.app>_

## How to run?

### Locally

To run locally you require to have:

- Of course `NodeJS`.
- [Docker](https://www.docker.com/) to run the docker compose.
- [IP Stack](https://ipstack.com/) API key and set it in the `.env` as `IP_STACK_API_KEY`,
  this is used for get the geolocation information from the requests, the app can work without this but you will not get any geolocation information.
- [Firebase](https://firebase.google.com/) account.

  - Set the secrets in a `.env` _(checkout **.env.sample**)_.
  - Also you need the firebase credentials for the [firebase admin](https://firebase.google.com/docs/admin/setup). You need to provide the credentials implementing the interface `IFirebaseSecretProvider` and returning the implementation:

    ```ts
    // src/services/firebase-secret-provider.ts
    export function getSecretProvider(): IFirebaseSecretProvider {
      return new FirebaseSecretProvider();
    }
    ```

    The current implementation is pulling the credentials from a remote server and decrypting them using `AES`.

    Some options for implementing the `IFirebaseSecretProvider` are:

    - You can set the credentials `JSON` in a `.env` as `FIRE_BASE_SECRET`. Check the commented code in [firebase-secret-provider.ts](https://github.com/Neo-Ciber94/PeekURL/blob/main/src/services/firebase-secret-provider.ts)
    - Import the credentials as a `JSON`.

> You should NOT expose the credentials do not push it to git!

Also set the connection strings of the database and redis in the `.env` file:

- `DATABASE_URL="postgresql://root:password123@localhost:6000/sample"`
- `REDIS_URL="redis://default:redispassword123@localhost:6030`

After having all that setup run:

1. `docker compose up -d`
   This will create the database and the redis instance.

2. `npx prisma generate`
   To create the prisma client

3. `npx prisma migrate deploy`
   To apply the migrations to the database

4. `yarn dev`
   To start the application

5. Then you can go to [http://localhost:3000](http://localhost:3000).

## TODO

- [ ] Improve UI
  - [x] Add breadcrumbs or improved navigation
  - [ ] Add transition animations
  - [ ] Add entrance animation for items
- [ ] Filters for "My URLs"
  - [ ] By domain
  - [ ] By access count
- [ ] Filters for url access logs
  - [ ] By datetime
  - [ ] By country
- [ ] Options for short URL
  - [ ] Include domain
  - [ ] Include top-level-domain
- [ ] Localization
  - [ ] Dropdown to change language
  - [ ] Spanish 🇪🇸
- [ ] Allow anonymous to shorten url without login but without access to logs
- [ ] Allow to disable shorten URL
  > Not sure about letting to disable URL, maybe after X time, for example 1 hour or week.
- [ ] Check performance when shortening URL, the bottleneck may be the database.
- [ ] More clean user errors
- [ ] Error when accessing URL with new user
- [ ] Infinite scrolling to access logs
