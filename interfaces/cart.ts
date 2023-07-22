import { ISize, IType } from "./products";

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    type: IType;
    quantity: number;

}
