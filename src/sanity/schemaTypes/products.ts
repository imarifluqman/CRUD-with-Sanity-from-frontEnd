export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    {
      name: "id",
      title: "Id",
      type: "number",
      description: "Product id",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The name of the product",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "The price of the product",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the product",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description: "The category to which the product belongs",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Product image",
    },
    {
      name: "rating",
      title: "Rating",
      type: "object",
      fields: [
        {
          name: "rate",
          title: "Rate",
          type: "number",
          description: "Average rating of the product",
        },
        {
          name: "count",
          title: "Count",
          type: "number",
          description: "Number of ratings received",
        },
      ],
    },
  ],
};
