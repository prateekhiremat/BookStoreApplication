import { Schema, model } from 'mongoose';

const customerDetailsSchema = new Schema(
    {
      customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      fullName: {
        type: String,
        required: true
      },
      address:{
        street: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true
          },
          state: {
            type: String,
            required: true
          },
          postalCode: {
            type: Number,
            required: true
          },
          country: {
            type: String,
            required: true
          }
      },
      contact: {
        type: Number,
        required: true
      }
    }
  );
  
  export default model('CustomerDetails', customerDetailsSchema);