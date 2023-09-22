import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    size: {
        type: String,
        enum: {
            values: ['Pequeño','Mediano','Grande'],
            message: '{VALUE} no es un tamaño válido'
        }
    },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['burguer','pepito','drink','appetezier','clubhouse','cachapa', 'combo'],
            message: '{VALUE} no es un tipo válido'
        }
    }
   
},{
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);



export default Product;