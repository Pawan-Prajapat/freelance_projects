import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    sequence_value: {
        type: Number,
        required: true
    }
})

const shiprocket_tokenSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

const shiprocket_create_detailsSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true
    },
    channel_order_id: {
        type: String,
        required: true
    },

    shipment_id: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    status_code: {
        type: Number,
        required: true
    },
    onboarding_completed_now: {
        type: Number,
        required: true
    },
    awb_code: {
        type: String 
    },
    courier_company_id: {
        type: String 
    },
    courier_name: {
        type: String
    },
    new_channel: {
        type: Boolean
    },
    packaging_box_error: {
        type: String
    }
})

export const OrderCounter = mongoose.model("counter_order", counterSchema);
export const ShiprocketToken = mongoose.model("shiprocket_token", shiprocket_tokenSchema);
export const shiprocket_create_details = mongoose.model("shiprocket_create_details", shiprocket_create_detailsSchema);