import React from 'react'
import Ticket from './Ticket'
import axios from 'axios'
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';

const page = async () => {

    const session: any = await getServerSession(authOptions);

    if (!session?.user?.customer_id) {
        redirect('/site/authentication/login?callbackUrl=/ticket');
    }

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DEV_INVENTORY_URL}/inventory/${session.user.customer_id}`);
        return <Ticket ticketData={data} />;
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">ไม่สามารถโหลดข้อมูล Ticket ได้ กรุณาลองใหม่อีกครั้ง</p>
            </div>
        );
    }
}

export default page