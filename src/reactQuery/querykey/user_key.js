'use strict';
export let projectsKey = 1;
export let add_Product_Bookmark_Mutation_key = 1;
export let delete_bookmark_Product_key = 1;
export let user_project_findOne = 1;

export function setProjectsKey(newProjectsKey) {
  projectsKey = newProjectsKey;
}
export function setAdd_Product_Bookmark_Mutation_key() {
  add_Product_Bookmark_Mutation_key = Math.random() * 10;
}
export function setBookmark_Product_Delete_key() {
  delete_bookmark_Product_key = Math.random() * 10;
}
export function setUser_project_findOne() {
  user_project_findOne = Math.random() * 10;
}
