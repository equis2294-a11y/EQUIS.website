import {NextRequest,NextResponse} from "next/server";
import {createHmac,timingSafeEqual} from "node:crypto";
import {db} from "@/lib/supabase";
import {sameOrigin,jsonError} from "@/lib/http";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if(!sameOrigin(req)) return jsonError("Request origin rejected.",403);
 if(process.env.PAYMENTS_MODE!=="test") return jsonError("Payment verification is disabled.",403);
 try{
  const {reference,razorpay_order_id,razorpay_payment_id,razorpay_signature}=await req.json();
  if([reference,razorpay_order_id,razorpay_payment_id,razorpay_signature].some(v=>typeof v!=="string")) return jsonError("Invalid payment response.");
  const {data,error}=await db().from("equis_orders").select("id,razorpay_order_id").eq("reference",reference).single();
  if(error||!data||data.razorpay_order_id!==razorpay_order_id) return jsonError("Order/payment mismatch.",400);
  const secret=process.env.RAZORPAY_KEY_SECRET;if(!secret)return jsonError("Payment verification is not configured.",503);
  const expected=createHmac("sha256",secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest();
  const supplied=Buffer.from(razorpay_signature,"hex");
  if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected)) return jsonError("Payment signature could not be verified.",400);
  const {error:updateError}=await db().from("equis_orders").update({razorpay_payment_id,payment_status:"signature_verified"}).eq("id",data.id);
  if(updateError)return jsonError("Payment recorded for review; contact support.",503);
  return NextResponse.json({ok:true,message:"Test payment signature verified. This is not a live payment."});
 }catch{return jsonError("Unable to verify payment.",400);}
}