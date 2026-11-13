import { NextRequest, NextResponse } from "next/server";
export function sameOrigin(req:NextRequest){
 const origin=req.headers.get("origin");
 if(!origin) return true;
 try{return new URL(origin).host===req.headers.get("host");}catch{return false;}
}
export function jsonError(message:string,status=400){return NextResponse.json({error:message},{status});}