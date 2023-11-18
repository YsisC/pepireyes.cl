export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    size?: ISize;
    slug: string;
    tags?: string[];
    title: string;
    type: IType;
   

    // TODO: agregar createdAt y updatedAt
    createdAt?: string;
    updatedAt?: string;

}

export type ISize = 'Pequeño'|'Mediano'|'Grande';
export type IType = 'parrilla'|'hamburguesa'|'pepito'|'bebida'|'appetezier'|'clubhouse'|'cachapa'|'combo'|'papas';

