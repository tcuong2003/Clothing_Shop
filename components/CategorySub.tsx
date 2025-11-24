import Link from "next/link";

export default function CategorySub() {

    return (
        <>
            <ul className="hidden items-center space-x-5 flex-1 justify-end lg:flex">
                <li className="text-xs font-semibold text-gray-700"><Link href="/products/ao">Áo</Link></li>
                <li className="text-xs font-semibold text-gray-700"><Link href="/products/ao-khoac">Áo khoác</Link></li>
                <li className="text-xs font-semibold text-gray-700"><Link href="/products/chan-vay">Chân váy</Link></li>
                <li className="text-xs font-semibold text-gray-700"><Link href="/products/do-len">Đồ len</Link></li>
            </ul>
        </>
    )
}