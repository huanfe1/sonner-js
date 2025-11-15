import Image from 'next/image';

export default function Foot() {
    return (
        <div className="mt-20 h-20 bg-[--gray3] border-t border-[--gray4] flex items-center justify-center">
            <div className="container max-w-[642px] flex items-center">
                <Image src="https://github.com/huanfe1.png?v=4&size=96" alt="huanfei" width={24} height={24} className="rounded-full mr-2" />
                <span className="mx-1">By</span>
                <a className="font-medium hover:underline" href="https://huanfe1.com" target="_blank">
                    huanfei
                </a>
            </div>
        </div>
    );
}
