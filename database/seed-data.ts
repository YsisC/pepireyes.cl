import bcrypt from 'bcryptjs';

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
type ValidSizes = 'Pequeño'|'Mediano'|'Grande'|'';
type ValidTypes = 'parrilla'|'hamburguesa'|'pepito'|'bebida'|'appetezier'|'clubhouse'| 'cachapa'| 'combo' | 'papas';

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
        {
            name: 'Ysis Longart',
            email: 'ysisclongart@gmail.com',
            password: bcrypt.hashSync(`${process.env.SECRETKEYADMIN}`),
            role: 'admin'
        },
     

    ],
    products: [
        {
            description: "Carne de primera, pechuga de pollo o a la plancha y chuleta ahumada",
            images: [
                '202314.25.14 (4).jpeg'
               
            ],
            inStock: 7,
            price: 9000,
            size: 'Mediano',
            slug: "burguer_triple",
            type: 'hamburguesa',
            tags: ['burguers'],
            title: "Hamburguesa triple",
            
        },
        {
            description: "Carne de primera, pechuga de pollo o a la plancha chuleta ahumada",
            images: [
                '202314.25.14 (4).jpeg'
               
            ],
            inStock: 7,
            price: 9900,
            size: 'Mediano',
            slug: "burguer_triple_combo",
            type: 'combo',
            tags: ['burguers'],
            title: "Hamburguesa triple combo",
            
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
            type: 'pepito',
            tags: ['pepito'],
            title: "Pepito mixto",
           
        },
        {
            description: "650gr de papas firtas, 200gr de carne mechada, tocineta, queso cheddar.",
            images: [
                'WhatsApp Image 2023-11-07 at 16.29.54.jpeg'
              
            ],
            inStock: 5,
            price: 8990,
            size: 'Mediano',
            slug: "suprema_mechada",
            type: 'papas',
            tags: ['papas'],
            title: "Suprema Mechada",
           
        },
        {
            description: "650gr de papas firtas, 200gr de carne mechada, tocineta, queso cheddar.",
            images: [
                'WhatsApp Image 2023-11-07 at 16.29.54.jpeg'
              
            ],
            inStock: 5,
            price: 11990,
            size: 'Mediano',
            slug: "combo_suprema_mechada",
            type: 'combo',
            tags: ['papas'],
            title: "Combo de papas supremas mechada",
           
        },
        {
            description: "1 kg de proteina comprendido entre lomo liso, cerdo, pollo, calamares, camarones, choritos, chorizo y salchichas y verduras salteadas.",
            images: [
                'marytierra.jpeg'
              
            ],
            inStock: 15,
            price: 30.000,
            size: 'Grande',
            slug: "mar_y_tierra_real",
            type: 'parrilla',
            tags: [],
            title: "Mar y tierra Real",
           
        },
        {
            description: "Pan de molde(4 rebanada), jamon ahumado, queso rallado, huevo,, tocineta, tomate, lechuga, pechuga de pollo, ketchup. mayonesa, mostaza racion de papas fritas",
            images: [
                '2023-07-03 at 14.25.14 (9).jpeg'
                
            ],
            inStock: 15,
            price: 8990,
            size: 'Mediano',
            slug: "clubhouse_pollo",
            type: 'clubhouse',
            tags: ['clubhouse'],
            title: "Clubhouse real de pollo",
           
        },
        {
            description: "Pan de molde(4 rebanada), jamon ahumado, queso rallado, huevo,, tocineta, tomate, lechuga, pechuga de pollo, ketchup. mayonesa, mostaza racion de papas fritas",
            images: [
                '2023-07-03 at 14.25.14 (9).jpeg'
                
            ],
            inStock: 5,
            price: 9990,
            size: 'Mediano',
            slug: "clubhouse_pollo_combo",
            type: 'combo',
            tags: ['combo'],
            title: "Combo clubhouse de pollo X 2",
           
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
            inStock: 15,
            price: 12990,
            size: 'Mediano',
            slug: "cachapa_cochino",
            type: 'cachapa',
            tags: ['cachapa'],
            title: "Cachapa con cochino",
           
        },
        {
            description: "Queso de mano con capsula de natilla, queso rallado, cheddar y choclo en grano.",
            images: [
                'volcan.jpeg'
               
            ],
            inStock: 15,
            price: 12990,
            size: 'Mediano',
            slug: "cachapa_volcan",
            type: 'cachapa',
            tags: ['cachapa'],
            title: "Cachapa volcan desgranado",
           
        },
        {
            description: "Queso de mano",
            images: [
                'cachapaqueso.jpeg'
               
            ],
            inStock: 5,
            price: 20990,
            size: 'Mediano',
            slug: "combo_cachapa_queso",
            type: 'combo',
            tags: ['cachapa'],
            title: "Combo de Cachapa con queso",
           
        },
        {
            description: "Queso de mano",
            images: [
                'cachapaqueso.jpeg'
               
            ],
            inStock: 5,
            price: 9500,
            size: 'Mediano',
            slug: "cachapa_queso",
            type: 'cachapa',
            tags: ['cachapa'],
            title: "Cachapa de queso",
           
        },
        {
            description: "Malta",
            images: [
                'maltadelata.jpg'
               
            ],
            inStock: 5,
            price: 5000,
            size: 'Mediano',
            slug: "malta",
            type: 'bebida',
            tags: ['bebida'],
            title: "Malta",
           
        },
        {
            description: "Frescolita",
            images: [
                'frecolita.jpg'
               
            ],
            inStock: 5,
            price: 5000,
            size: 'Mediano',
            slug: "frescolita",
            type: 'bebida',
            tags: ['bebida'],
            title: "Frescolita",
           
        },
   
        {
            description: "Jugos naturales",
            images: [
                '2023-07-03 at 14.25.14 (8).jpeg'
               
            ],
            inStock: 5,
            price: 2500,
            size: 'Mediano',
            slug: "jugos",
            type: 'bebida',
            tags: ['bebida'],
            title: "Jugo Natural",
           
        },
        
       
    ]
}
