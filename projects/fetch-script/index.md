---
title: Fetch-script
year: 2018
order: 1
links:
  - label: GitHub
    url: https://github.com/lipsumar/fetch-script
---

A toy language built on top of Javascript, specifically designed to fetch API resources. The primary goal is to be succinct yet powerful. The front-end app brings an experience close to python notebooks: on the left are code sections that can be executed independently, results are shown under each section, and all variables are always accessible in the right-side column.

```
$options.apis.sample.baseURL = "http://jsonplaceholder.typicode.com"

users = /sample/users
all = /sample/users/{users[*].id}
  [posts] = /sample/posts/?userId={@.id}
  [first_post_title] = @.posts[0].title
```
