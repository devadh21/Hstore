import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    items: [
        {
            productId: { type: String, required: [true, 'Product ID is required'] },
            name: { type: String, required: [true, 'Product name is required'] },
            quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
            price: { type: Number, required: [true, 'Price is required'] },
            image: { type: String },
        }
    ],
    total: {
        type: Number,
        required: [true, 'Total amount is required'],
    },
    shipping: {
        name: { type: String, required: [true, 'Shipping name is required'] },
        email: { type: String, required: [true, 'Shipping email is required'] },
        address: { type: String, required: [true, 'Shipping address is required'] },
        city: { type: String, required: [true, 'Shipping city is required'] },
        zip: { type: String, required: [true, 'Shipping zip code is required'] },
    },
    status: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model overwrite in development
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
