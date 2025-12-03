import mongoose, {Schema, Document} from "mongoose";

export interface IClient extends Document {
    name: string
    email: string
    plan: string
    product: string
    facturado: boolean
    fechaInicio: String
}

const clientSchema = new Schema<IClient>({

    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        default: '',
    },
    plan:{
        type: String,
        required: false,
        default: '',
    },
    product:{
        type: String,
        required: true,
        default: '',
    },
    facturado: {
        type: Boolean,
        default: false,
        required: true,
    },
    fechaInicio:{
        type: String,
        required: true,
    }
})


const Client = mongoose.model<IClient>('Client', clientSchema)
export default Client