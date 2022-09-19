# SETUP FROM TEMPLATE

## Project Setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Contentful Setup

### Set Contentful SpaceID and AccessToken in env file

```
VUE_APP_CONTENTFUL_SPACE_ID=xxxxxxxxxxxxxx
VUE_APP_CONTENTFUL_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxx
```

### Create two Content Models, Page and Text

Page
|Title|Hide from Navigation|Reference|Id|Slug|
|---|---|---|---|---|
|Short text|Boolean|References, many|Integer|Short text|
|Single line|Radio|Entry Cards|Number Editor|Slug|
|Name field for Content Model|Indicator to hide a page in the navigation|For Inserting Content from other types|Number for sorting in navigation|slug|

Text
|Title|Content|
|---|---|
|Short text|Rich text|
|Single line|Rich text|
|Name field for Content Model|Content for Website|

### Create Example Pages

|Title|About|About Max|
|---|---|---|
|No|No|No|
|Add References|Add References|Add References|
|Id 1|Id 2|Id 1|
|/|about|about/max|

Now you are good to go and have fun creating a webpage with Contentful.