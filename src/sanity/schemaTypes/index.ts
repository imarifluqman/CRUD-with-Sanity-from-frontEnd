import { type SchemaTypeDefinition } from "sanity";

import postForm from "./post-form";
import products from "./products";
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postForm, products],
};
