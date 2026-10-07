import {NextResponse} from "next/server";import {isAdmin} from "../../../lib/session";
export const dynamic="force-dynamic";
export async function GET(request){return isAdmin(request)?NextResponse.json({authenticated:true}):NextResponse.json({authenticated:false},{status:401})}