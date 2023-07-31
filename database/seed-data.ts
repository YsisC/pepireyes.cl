// import bcrypt from 'bcryptjs';

interface SeedProduct {
    description: string;
    images: string[];
    price: number;
    inStock: number;
    size: ValidSizes;
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
   
}

interface SeedUser {
    name: string;
    email:string;
    password:string;
    role: string;

}
type ValidSizes = 'Pequeño'|'Mediano'|'Gracde'|'';
type ValidTypes = 'burguer'|'pepito'|'drink'|'appetezier'|'clubhouse'| 'cachapa';

interface SeedData {
    users: SeedUser[]
    products: SeedProduct[],
}

interface ProductImages {
    images: string[];
}


export const productImage: ProductImages = {

    images: [
        "2023-07-03 at 14.25.12.jpeg",
        "2023-07-03 at 14.25.14 (4).jpeg",
        "2023-07-03 at 14.25.14 (16).jpeg",
        "2023-07-03 at 14.25.14.jpeg",
        "2023-07-03 at 14.25.14 (14).jpeg"
    ]

}
export const initialData: SeedData = {
    users: [
        // {
        //     name: 'Ysis Longart',
        //     email: 'ysisclongart@gmail.com',
        //     password: bcrypt.hashSync('123456'),
        //     role: 'admin'
        // },
        // {
        //     name: 'Fernando Herrera',
        //     email: 'fernando@gmail.com',
        //     password: bcrypt.hashSync('123456'),
        //     role: 'client'
        // },

    ],
    products: [
        {
            description: "Carne de primera, pechuga de pollo o a la planchay chuleta ahumada",
            images: [
                '2023-07-03 at 14.25.14 (4).jpeg'
               
            ],
            inStock: 7,
            price: 9000,
            size: 'Mediano',
            slug: "burguer_triple",
            type: 'burguer',
            tags: ['burguers'],
            title: "Hamburguesa triple",
            
        },
        {
            description: "350gr de carne y pollo",
            images: [
                '2023-07-03 at 14.25.14 (5).jpeg'
              
            ],
            inStock: 5,
            price: 11000,
            size: 'Mediano',
            slug: "pepito_triple",
            type: 'burguer',
            tags: ['pepito'],
            title: "Pepito mixto",
           
        },
        {
            description: "Pan de molde(4 rebanada), jamon ahumado, queso rallado, huevo,, tocineta, tomate, lechuga, pechuga de pollo, ketchup. mayonesa, mostaza racion de papas fritas",
            images: [
                '2023-07-03 at 14.25.14 (9).jpeg'
                
            ],
            inStock: 5,
            price: 8990,
            size: 'Mediano',
            slug: "clubhouse_pollo",
            type: 'clubhouse',
            tags: ['clubhouse'],
            title: "Clubhouse real de pollo",
           
        },
        {
            description: "Pan de molde(4 rebanada), jamon ahumado, queso rallado, huevo,, tocineta, tomate, lechuga, croqueta de carne molida, ketchup. mayonesa, mostaza racion de papas fritas",
            images: [
                '2023-07-03 at 14.25.14 (9).jpeg'
               
            ],
            inStock: 5,
            price: 9990,
            size: 'Mediano',
            slug: "clubhouse_carne",
            type: 'clubhouse',
            tags: ['clubhouse'],
            title: "Clubhouse real de carne",
           
        },
        {
            description: "Queso de mano y cochino frito",
            images: [
                '2023-07-03 at 14.25.14 (13).jpeg'
               
            ],
            inStock: 5,
            price: 12990,
            size: 'Mediano',
            slug: "cachapa_cochino",
            type: 'cachapa',
            tags: ['cachapa'],
            title: "Cachapa con cochino",
           
        },
        {
            description: "Cachapa con queso",
            images: [
                '2023-07-03 at 14.25.12.jpeg'
               
            ],
            inStock: 5,
            price: 9500,
            size: 'Mediano',
            slug: "cachapa_queso",
            type: 'cachapa',
            tags: ['cachapa'],
            title: "Cachapa de queso",
           
        },
        
       
    ]
}
