import { ICategory } from "../Content/pages/AdminCategories";

export const getCategoryFullName = (category: ICategory): string => {
  if (!category.parentCategory) {
    return category.name;
  }

  const parentFullName = getCategoryFullName(category.parentCategory);
  return `${category.name} (${parentFullName})`;
};
