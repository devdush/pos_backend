import { Schema, model, Types, InferSchemaType } from "mongoose";

export interface IPayment {
  method: "cash" | "card";
  amount: number;
  referenceId?: string;
}

const PaymentSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    referenceId: { type: String }, //
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // cashierId OR stuartId
    stuartOrderId: {
      type: Schema.Types.ObjectId,
      ref: "StuartOrder",
    },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    kotIDs: [{ type: Schema.Types.ObjectId, ref: "KitchenOrderTicket" }],
    botIDs: [{ type: Schema.Types.ObjectId, ref: "BarOrderTicket" }],

    totalAmount: { type: Number, required: true, min: 0 },

    payments: {
      type: [PaymentSchema],
      validate: [
        (payments: { amount: number }[]) => payments.length > 0,
        "At least one payment is required",
      ],
    },

    date: { type: Date, default: Date.now },
    time: { type: String, default: new Date().toLocaleTimeString() },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.virtual("receivedMoney").get(function (this: any) {
  if (!this.payments || this.payments.length === 0) return 0;
  return this.payments.reduce((sum: number, p: any) => sum + p.amount, 0);
});

OrderSchema.virtual("balance").get(function (this: any) {
  return this.totalAmount - this.receivedMoney;
});
OrderSchema.virtual("ProductsInfo", {
  ref: "Item",
  localField: "items.productId",
  foreignField: "_id",
  justOne: false,
});

type IOrder = InferSchemaType<typeof OrderSchema> & {
  receivedMoney: number;
  balance: number;
};

export const Order = model<IOrder>("Order", OrderSchema);
