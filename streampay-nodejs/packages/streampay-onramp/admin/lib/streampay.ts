import StreamPay from "streampay";

export const stripe = new StreamPay(process.env.STREAM_PAY_API_KEY!, {
  apiVersion: "2023-08-27",
  typescript: true,
});
