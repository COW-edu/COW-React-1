import DownFooter from "../components/MainFooter/DownFooter";
import Upfooter from "../components/MainFooter/Upfooter";

function Footers() {
  return(
    <>
      <div>
        <Upfooter/>
        <DownFooter/>
      <div className=" bg-zinc-300 w-full mt-7">
        <div className="mx-32 text-sm font-normal text-zinc-500 h-full">
        텀블벅은 플랫폼 제공자로서 프로젝트의 당사자가 아니며, 직접적인 통신판매를 진행하지 않습니다. 프로젝트의 완수 및 선물제공의 책임은 해당 프로젝트의 창작자에게 있으며, 프로젝트와 관련하여 후원자와 발생하는 법적 분쟁에 대한 책임은 해당 창작자가 부담합니다.
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Footers