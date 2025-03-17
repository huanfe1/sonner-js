export default function Foot() {
    return (
        <div className="mt-20 h-20 bg-[--gray3] border-t border-[--gray4] flex items-center justify-center">
            <div className="container max-w-[642px] flex items-center">
                <img src="https://github.com/huanfe1.png?v=4&size=96" className="size-6 rounded-full mr-2" alt="" />
                <span className="mx-1">By</span>
                <a className="font-medium hover:underline" href="https://huanfei.top" target="_blank">
                    Huanfei
                </a>
            </div>
        </div>
    );
}
