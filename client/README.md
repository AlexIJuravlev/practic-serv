
npm i styled-components prop-types react-hook-form yup react-router redux redux-thunk react-redux
npm install json-server@0.17.4
json-server --watch src/db.json --port 3005
npx json-server@0.17.4 --watch src/db.json --port 3005
npm i @hookform/resolvers
npm install react-paginate --save
 npm i express cookie-parser mongoose jsonwebtoken bcript validator nodemon

Области хранения данных
-база данных на JSON Server
-BFF
-редакс стор

Сущности приложения:
-Пользователь: БД(список пользователей), BFF(сессия текущая), стор(отображение в браузере)
-Роль пользователя: БД(список ролей), BFF(сессия пользователея с ролью), стор(использование на клиенте)
- статья: БД(список статей), стор (отображение в браузере)
- коментарий: БД(список комментов), стор(отображение в браузере)

Таблицы БД:
-Пользователи - users: id / login / password / registed_at / role_id
-Роли - roles: id / name
-Статьи - posts: id / title / img_url / content / published_at
-Комменты - comments: id / author_id / post_id / content / publishedAt

Схема состояние на BFF:
- сессия текущего пользователя: login / password / role

Схема для редакс сторе ( на клиенте ):

- user: id / login / roleId
- posts: массив post: id / title / imgUrl/ publishedAt / commentsCount
- post: id / title / imgUrl/ content / publishedAt / comments: массив comment: id / author/ content / publishedAt
- users: [] user: id / login / registerAt / role
