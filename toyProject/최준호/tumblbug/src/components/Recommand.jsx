function Recommand(props) {
  return(
    <div className="mx-32">
      <div className="">
        추천검색어
      </div>
      <div className="flex flex-col">
        {props.searchWord}
      </div>
    </div>
  )
}
export default Recommand;