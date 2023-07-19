export enum IngredientTypeT {
    BUN = 'bun',
    MAIN = 'main',
    SAUCE = 'sauce'
}

export type IngredientT = {
    id?: string;
    _id: string;
    name: string;
    type: IngredientTypeT;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_large: string;
    index?: number;
};